"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/journey", label: "Journey" },
  { href: "/experience", label: "Experience" },
  { href: "/initiatives", label: "Initiatives" },
  { href: "/media", label: "Media" },
  { href: "/interviews", label: "Interviews" },
  { href: "/vision", label: "Vision" },
  { href: "/contact", label: "Contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/90 backdrop-blur-xl shadow-sm border-b border-blue-100"
            : "bg-white/70 backdrop-blur-md"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="font-heading text-xl font-bold text-blue-950 group-hover:text-blue-700 transition">
              Sahar Nikzad
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 text-sm font-medium rounded-full transition-all ${
                    active
                      ? "text-blue-700 bg-blue-50"
                      : "text-gray-600 hover:text-blue-700 hover:bg-blue-50/50"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-xl hover:bg-blue-50 transition"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-20 px-6 lg:hidden">
          <div className="flex flex-col gap-1">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-4 py-3 text-lg font-medium rounded-xl ${
                    active
                      ? "text-blue-700 bg-blue-50"
                      : "text-blue-950 hover:bg-blue-50"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
