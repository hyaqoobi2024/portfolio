"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Edit, Calendar, X, Save } from "lucide-react";

interface Interview {
  id: string;
  title: string;
  outlet: string;
  date: string;
  videoUrl: string | null;
  articleUrl: string | null;
  description: string;
  upcoming: boolean;
}

export default function InterviewsManagerPage() {
  const router = useRouter();
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Interview | null>(null);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [outlet, setOutlet] = useState("");
  const [date, setDate] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [articleUrl, setArticleUrl] = useState("");
  const [description, setDescription] = useState("");
  const [upcoming, setUpcoming] = useState(false);

  useEffect(() => {
    fetch("/api/interviews")
      .then((r) => r.json())
      .then((data) => {
        setInterviews(data);
        setLoading(false);
      });
  }, []);

  const resetForm = () => {
    setTitle("");
    setOutlet("");
    setDate("");
    setVideoUrl("");
    setArticleUrl("");
    setDescription("");
    setUpcoming(false);
    setEditing(null);
    setShowForm(false);
  };

  const openEdit = (i: Interview) => {
    setTitle(i.title);
    setOutlet(i.outlet);
    setDate(new Date(i.date).toISOString().split("T")[0]);
    setVideoUrl(i.videoUrl || "");
    setArticleUrl(i.articleUrl || "");
    setDescription(i.description);
    setUpcoming(i.upcoming);
    setEditing(i);
    setShowForm(true);
  };

  const handleSave = async () => {
    const body = { title, outlet, date, videoUrl, articleUrl, description, upcoming };
    if (editing) {
      await fetch(`/api/interviews/${editing.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } else {
      await fetch("/api/interviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    }
    resetForm();
    const data = await fetch("/api/interviews").then((r) => r.json());
    setInterviews(data);
    router.refresh();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this interview?")) return;
    await fetch(`/api/interviews/${id}`, { method: "DELETE" });
    setInterviews(interviews.filter((i) => i.id !== id));
    router.refresh();
  };

  if (loading) return <p className="text-gray-400">Loading...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Interviews & Media</h1>
          <p className="text-gray-500 text-sm">Manage your media appearances</p>
        </div>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="btn-primary text-sm py-2.5 px-5"
        >
          <Plus className="w-4 h-4" /> Add Interview
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold">{editing ? "Edit" : "New"} Interview</h3>
            <button onClick={resetForm} className="text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Interview Title" className="px-3 py-2 rounded-lg border border-gray-200 outline-none focus:border-purple-400 text-sm" />
            <input value={outlet} onChange={(e) => setOutlet(e.target.value)} placeholder="Outlet (e.g. CBC)" className="px-3 py-2 rounded-lg border border-gray-200 outline-none focus:border-purple-400 text-sm" />
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="px-3 py-2 rounded-lg border border-gray-200 outline-none focus:border-purple-400 text-sm" />
            <input value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} placeholder="Video URL (optional)" className="px-3 py-2 rounded-lg border border-gray-200 outline-none focus:border-purple-400 text-sm" />
            <input value={articleUrl} onChange={(e) => setArticleUrl(e.target.value)} placeholder="Article URL (optional)" className="px-3 py-2 rounded-lg border border-gray-200 outline-none focus:border-purple-400 text-sm" />
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={upcoming} onChange={(e) => setUpcoming(e.target.checked)} className="rounded" />
              Mark as Upcoming
            </label>
          </div>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description..." rows={3} className="w-full mt-4 px-3 py-2 rounded-lg border border-gray-200 outline-none focus:border-purple-400 text-sm resize-none" />
          <div className="mt-4 flex justify-end">
            <button onClick={handleSave} disabled={!title || !outlet || !date} className="btn-primary text-sm py-2 px-5 disabled:opacity-50">
              <Save className="w-4 h-4" /> {editing ? "Update" : "Save"}
            </button>
          </div>
        </div>
      )}

      {interviews.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <p className="text-gray-400">No interviews yet. Add your first one! 🎙️</p>
        </div>
      ) : (
        <div className="space-y-4">
          {interviews.map((interview) => (
            <div key={interview.id} className="bg-white rounded-xl border border-gray-200 p-5 flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold">{interview.title}</h3>
                  {interview.upcoming && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-amber-50 text-amber-600">Upcoming</span>
                  )}
                </div>
                <p className="text-sm text-gray-500">{interview.outlet}</p>
                <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> {new Date(interview.date).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => openEdit(interview)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400">
                  <Edit className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(interview.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
