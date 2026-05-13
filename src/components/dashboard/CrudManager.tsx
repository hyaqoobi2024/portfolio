"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X, Save, Loader2 } from "lucide-react";

export type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "date"
  | "checkbox"
  | "select"
  | "url"
  | "image";

export interface FieldDef {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  options?: string[];
  help?: string;
}

interface CrudManagerProps {
  title: string;
  description?: string;
  endpoint: string;
  fields: FieldDef[];
  itemLabel: (item: Record<string, unknown>) => string;
  itemMeta?: (item: Record<string, unknown>) => string;
  defaultValues?: Record<string, unknown>;
}

function emptyForFields(fields: FieldDef[]): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const f of fields) {
    if (f.type === "checkbox") out[f.name] = false;
    else if (f.type === "number") out[f.name] = 0;
    else out[f.name] = "";
  }
  return out;
}

function toInputValue(v: unknown, type: FieldType): string {
  if (v === null || v === undefined) return "";
  if (type === "date") {
    try {
      const d = new Date(v as string);
      if (isNaN(d.getTime())) return "";
      return d.toISOString().slice(0, 10);
    } catch {
      return "";
    }
  }
  return String(v);
}

export default function CrudManager({
  title,
  description,
  endpoint,
  fields,
  itemLabel,
  itemMeta,
  defaultValues,
}: CrudManagerProps) {
  const [items, setItems] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Record<string, unknown> | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<Record<string, unknown>>({});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch(endpoint);
      if (!res.ok) throw new Error("Failed to load");
      const data = await res.json();
      setItems(data);
    } catch (err) {
      console.error(err);
      setError("Could not load items");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [endpoint]);

  const openCreate = () => {
    setForm({ ...emptyForFields(fields), ...(defaultValues ?? {}) });
    setEditing(null);
    setCreating(true);
    setError(null);
  };

  const openEdit = (item: Record<string, unknown>) => {
    setForm({ ...item });
    setEditing(item);
    setCreating(true);
    setError(null);
  };

  const closeForm = () => {
    setCreating(false);
    setEditing(null);
    setForm({});
    setError(null);
  };

  const save = async () => {
    setSaving(true);
    setError(null);
    try {
      const url = editing ? `${endpoint}/${editing.id}` : endpoint;
      const method = editing ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Save failed");
      }
      await load();
      closeForm();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Save failed";
      setError(msg);
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this item? This cannot be undone.")) return;
    try {
      const res = await fetch(`${endpoint}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      await load();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  return (
    <div>
      <div className="flex items-start justify-between mb-6 gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-bold text-blue-950">{title}</h1>
          {description && (
            <p className="text-gray-500 mt-1">{description}</p>
          )}
        </div>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
        >
          <Plus className="w-4 h-4" /> Add new
        </button>
      </div>

      {loading ? (
        <div className="flex items-center gap-2 text-gray-500">
          <Loader2 className="w-4 h-4 animate-spin" /> Loading…
        </div>
      ) : items.length === 0 ? (
        <div className="bg-white border border-dashed border-gray-300 rounded-xl p-10 text-center text-gray-500">
          Nothing here yet. Click <span className="font-medium">Add new</span> to create your first entry.
        </div>
      ) : (
        <ul className="space-y-2">
          {items.map((item) => (
            <li
              key={String(item.id)}
              className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between gap-4"
            >
              <div className="min-w-0">
                <p className="font-medium text-blue-950 truncate">
                  {itemLabel(item)}
                </p>
                {itemMeta && (
                  <p className="text-sm text-gray-500 truncate">
                    {itemMeta(item)}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => openEdit(item)}
                  className="p-2 hover:bg-gray-100 rounded-lg text-gray-600"
                  aria-label="Edit"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => remove(String(item.id))}
                  className="p-2 hover:bg-red-50 rounded-lg text-red-500"
                  aria-label="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {creating && (
        <div
          className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4"
          onClick={closeForm}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white">
              <h2 className="text-xl font-bold text-blue-950">
                {editing ? "Edit" : "Add"} {title.replace(/s$/, "")}
              </h2>
              <button
                onClick={closeForm}
                className="p-1.5 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {fields.map((f) => (
                <FieldRow
                  key={f.name}
                  field={f}
                  value={form[f.name]}
                  onChange={(v) => setForm({ ...form, [f.name]: v })}
                />
              ))}
              {error && (
                <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                  {error}
                </p>
              )}
            </div>

            <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-end gap-2 sticky bottom-0 bg-white">
              <button
                onClick={closeForm}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={save}
                disabled={saving}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
              >
                {saving ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                {editing ? "Save" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

interface FieldRowProps {
  field: FieldDef;
  value: unknown;
  onChange: (v: unknown) => void;
}

function FieldRow({ field, value, onChange }: FieldRowProps) {
  const id = `f-${field.name}`;
  const common =
    "w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none";

  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-blue-950 mb-1"
      >
        {field.label}
        {field.required && <span className="text-red-500"> *</span>}
      </label>
      {field.type === "textarea" ? (
        <textarea
          id={id}
          rows={4}
          value={toInputValue(value, "text")}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          className={common}
        />
      ) : field.type === "checkbox" ? (
        <label className="inline-flex items-center gap-2 text-sm text-gray-700">
          <input
            id={id}
            type="checkbox"
            checked={Boolean(value)}
            onChange={(e) => onChange(e.target.checked)}
            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          {field.placeholder || "Yes"}
        </label>
      ) : field.type === "select" ? (
        <select
          id={id}
          value={toInputValue(value, "text")}
          onChange={(e) => onChange(e.target.value)}
          className={common}
        >
          {!field.required && <option value="">— select —</option>}
          {(field.options ?? []).map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : field.type === "number" ? (
        <input
          id={id}
          type="number"
          value={toInputValue(value, "number")}
          onChange={(e) => onChange(Number(e.target.value))}
          placeholder={field.placeholder}
          className={common}
        />
      ) : field.type === "date" ? (
        <input
          id={id}
          type="date"
          value={toInputValue(value, "date")}
          onChange={(e) => onChange(e.target.value || null)}
          className={common}
        />
      ) : (
        <input
          id={id}
          type={field.type === "url" ? "url" : "text"}
          value={toInputValue(value, "text")}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          className={common}
        />
      )}
      {field.help && (
        <p className="text-xs text-gray-500 mt-1">{field.help}</p>
      )}
    </div>
  );
}
