"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, Mail, LogIn, Sparkles } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(e.currentTarget);

    const result = await signIn("credentials", {
      email: form.get("email"),
      password: form.get("password"),
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password");
      setLoading(false);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <section className="min-h-[80vh] flex items-center justify-center py-20">
      <div className="section-container max-w-md w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-8 md:p-10"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold">Welcome Back</h1>
            <p className="text-gray-500 text-sm mt-1">
              Sign in to your dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">
                <Mail className="w-3.5 h-3.5 inline mr-1" /> Email
              </label>
              <input
                type="email"
                name="email"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none transition-all bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">
                <Lock className="w-3.5 h-3.5 inline mr-1" /> Password
              </label>
              <input
                type="password"
                name="password"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none transition-all bg-white"
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center bg-red-50 p-2 rounded-lg">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In"}{" "}
              <LogIn className="w-4 h-4" />
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
