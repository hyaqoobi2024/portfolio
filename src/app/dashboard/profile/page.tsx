"use client";

import { useState, useEffect } from "react";
import { Save, User } from "lucide-react";

interface Profile {
  name: string;
  tagline: string;
  bio: string;
  visionStatement: string;
  profileImage: string | null;
  resumeUrl: string | null;
}

export default function ProfileEditorPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/profile")
      .then((r) => r.json())
      .then((data) => {
        setProfile(data);
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    if (!profile) return;
    setSaving(true);
    await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (loading || !profile) return <p className="text-gray-400">Loading...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <User className="w-6 h-6" /> Profile Settings
          </h1>
          <p className="text-gray-500 text-sm">Update your public profile info</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="btn-primary text-sm py-2.5 px-5 disabled:opacity-50"
        >
          <Save className="w-4 h-4" /> {saving ? "Saving..." : saved ? "Saved! ✨" : "Save Changes"}
        </button>
      </div>

      <div className="space-y-6 max-w-2xl">
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Name</label>
            <input
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Tagline</label>
            <input
              value={profile.tagline}
              onChange={(e) => setProfile({ ...profile, tagline: e.target.value })}
              placeholder="IB Student · WLOT Scholar · Founder..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Bio</label>
            <textarea
              value={profile.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              placeholder="Tell your story..."
              rows={6}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none resize-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Vision Statement</label>
            <textarea
              value={profile.visionStatement}
              onChange={(e) => setProfile({ ...profile, visionStatement: e.target.value })}
              placeholder="What's your vision for the future?"
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none resize-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Profile Image URL</label>
            <input
              value={profile.profileImage || ""}
              onChange={(e) => setProfile({ ...profile, profileImage: e.target.value })}
              placeholder="https://..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Resume URL</label>
            <input
              value={profile.resumeUrl || ""}
              onChange={(e) => setProfile({ ...profile, resumeUrl: e.target.value })}
              placeholder="https://..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
