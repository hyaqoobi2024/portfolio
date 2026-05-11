"use client";

import { useState, useEffect } from "react";
import { Save, User, Loader2 } from "lucide-react";

interface Profile {
  name: string;
  tagline: string;
  bio: string;
  visionStatement: string;
  nameMeaning: string;
  profileImage: string | null;
  resumeUrl: string | null;
  totalServiceHours: number;
  contactEmail: string;
  alphaSeekersEmail: string;
  linkedinUrl: string;
  instagramUrl: string;
}

export default function ProfileEditorPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/profile")
      .then((r) => r.json())
      .then((data) => {
        setProfile(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Could not load profile");
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    if (!profile) return;
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });
      if (!res.ok) throw new Error("Save failed");
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch {
      setError("Could not save");
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <p className="text-gray-500 flex items-center gap-2">
        <Loader2 className="w-4 h-4 animate-spin" /> Loading…
      </p>
    );
  if (!profile) return <p className="text-gray-500">No profile.</p>;

  const update = <K extends keyof Profile>(key: K, value: Profile[K]) =>
    setProfile({ ...profile, [key]: value });

  return (
    <div>
      <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-bold text-blue-950 flex items-center gap-2">
            <User className="w-6 h-6" /> Profile
          </h1>
          <p className="text-gray-500 text-sm">
            Your name, tagline, vision, and contact info.
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {saving ? "Saving…" : saved ? "Saved" : "Save changes"}
        </button>
      </div>

      <div className="space-y-6 max-w-3xl">
        <Card title="Identity">
          <Field label="Full name">
            <input
              value={profile.name}
              onChange={(e) => update("name", e.target.value)}
              className={inputClass}
            />
          </Field>
          <Field label="Tagline">
            <input
              value={profile.tagline}
              onChange={(e) => update("tagline", e.target.value)}
              placeholder="IB Student · Founder · Storyteller"
              className={inputClass}
            />
          </Field>
          <Field
            label="Meaning of your name"
            help="Shown subtly on the homepage. Leave empty to hide."
          >
            <input
              value={profile.nameMeaning}
              onChange={(e) => update("nameMeaning", e.target.value)}
              placeholder="Sahar means dawn — the first light at the edge of night."
              className={inputClass}
            />
          </Field>
          <Field label="Profile photo path" help="Upload to /public/images then put the path here, e.g. /images/sahar.jpg">
            <input
              value={profile.profileImage ?? ""}
              onChange={(e) => update("profileImage", e.target.value)}
              placeholder="/images/sahar.jpg"
              className={inputClass}
            />
          </Field>
        </Card>

        <Card title="About & Vision">
          <Field label="Bio" help="Used on the About section.">
            <textarea
              value={profile.bio}
              onChange={(e) => update("bio", e.target.value)}
              rows={6}
              className={textareaClass}
            />
          </Field>
          <Field label="Vision statement" help="Replace the previous text when you're ready.">
            <textarea
              value={profile.visionStatement}
              onChange={(e) => update("visionStatement", e.target.value)}
              rows={5}
              className={textareaClass}
            />
          </Field>
        </Card>

        <Card title="Service">
          <Field
            label="Total service hours"
            help="Shown as a stat. Update as you log more hours."
          >
            <input
              type="number"
              value={profile.totalServiceHours}
              onChange={(e) =>
                update("totalServiceHours", Number(e.target.value))
              }
              className={inputClass}
            />
          </Field>
        </Card>

        <Card title="Contact">
          <Field label="Email">
            <input
              type="email"
              value={profile.contactEmail}
              onChange={(e) => update("contactEmail", e.target.value)}
              placeholder="saharnikzad187@gmail.com"
              className={inputClass}
            />
          </Field>
          <Field label="AlphaSeekers email">
            <input
              type="email"
              value={profile.alphaSeekersEmail}
              onChange={(e) => update("alphaSeekersEmail", e.target.value)}
              className={inputClass}
            />
          </Field>
          <Field label="LinkedIn URL">
            <input
              type="url"
              value={profile.linkedinUrl}
              onChange={(e) => update("linkedinUrl", e.target.value)}
              placeholder="https://www.linkedin.com/in/…"
              className={inputClass}
            />
          </Field>
          <Field label="Instagram URL">
            <input
              type="url"
              value={profile.instagramUrl}
              onChange={(e) => update("instagramUrl", e.target.value)}
              placeholder="https://www.instagram.com/…"
              className={inputClass}
            />
          </Field>
        </Card>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}

const inputClass =
  "w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none";
const textareaClass = inputClass + " resize-y";

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
      <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
        {title}
      </h2>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Field({
  label,
  help,
  children,
}: {
  label: string;
  help?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-blue-950 mb-1">
        {label}
      </label>
      {children}
      {help && <p className="text-xs text-gray-500 mt-1">{help}</p>}
    </div>
  );
}
