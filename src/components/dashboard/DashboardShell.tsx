"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  FileText,
  Video,
  User,
  ExternalLink,
  LogOut,
  Menu,
  X,
  MessageCircle,
  Sparkles,
  Briefcase,
  Rocket,
  GraduationCap,
  Users,
  HandHeart,
  Film,
  Compass,
} from "lucide-react";
import { useState } from "react";

const sections = [
  {
    label: "Overview",
    items: [{ href: "/dashboard", icon: LayoutDashboard, label: "Overview" }],
  },
  {
    label: "Home",
    items: [
      { href: "/dashboard/profile", icon: User, label: "Profile & Vision" },
      { href: "/dashboard/greetings", icon: MessageCircle, label: "Greetings" },
      { href: "/dashboard/skills", icon: Sparkles, label: "Skills" },
    ],
  },
  {
    label: "Story",
    items: [
      { href: "/dashboard/journey", icon: Compass, label: "Journey" },
      { href: "/dashboard/experiences", icon: Briefcase, label: "Career" },
      { href: "/dashboard/initiatives", icon: Rocket, label: "Initiatives" },
      { href: "/dashboard/education", icon: GraduationCap, label: "Education" },
      { href: "/dashboard/clubs", icon: Users, label: "Clubs" },
      { href: "/dashboard/volunteering", icon: HandHeart, label: "Volunteering" },
    ],
  },
  {
    label: "Media",
    items: [
      { href: "/dashboard/media", icon: Film, label: "Videos & Photos" },
      { href: "/dashboard/interviews", icon: Video, label: "Interviews" },
      { href: "/dashboard/posts", icon: FileText, label: "Posts" },
    ],
  },
];

interface DashboardShellProps {
  user: { name?: string | null; email?: string | null };
  children: React.ReactNode;
}

export default function DashboardShell({ user, children }: DashboardShellProps) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 lg:relative lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <span className="font-heading font-bold text-lg text-blue-950">
                Dashboard
              </span>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 hover:bg-gray-100 rounded"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <nav className="p-4 space-y-5 overflow-y-auto" style={{ maxHeight: "calc(100vh - 180px)" }}>
          {sections.map((section) => (
            <div key={section.label}>
              <p className="px-3 mb-1.5 text-xs uppercase tracking-wide text-gray-400 font-semibold">
                {section.label}
              </p>
              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        active
                          ? "bg-blue-50 text-blue-700"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}

          <div className="border-t border-gray-100 pt-3 space-y-0.5">
            <a
              href="/"
              target="_blank"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50"
            >
              <ExternalLink className="w-4 h-4" />
              View site
            </a>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 w-full"
            >
              <LogOut className="w-4 h-4" />
              Sign out
            </button>
          </div>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100 bg-white">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
              {user.name?.[0] || "S"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user.name}</p>
              <p className="text-xs text-gray-400 truncate">{user.email}</p>
            </div>
          </div>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex-1 min-w-0">
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-100 px-6 h-14 flex items-center lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 hover:bg-gray-100 rounded-lg"
            aria-label="Open sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>
        </header>
        <div className="p-6 lg:p-10">{children}</div>
      </div>
    </div>
  );
}
