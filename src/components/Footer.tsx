import Link from "next/link";
import { prisma } from "@/lib/db";
import { Mail } from "lucide-react";
import { LinkedinIcon, InstagramIcon } from "@/components/SocialIcons";

export default async function Footer() {
  const profile = await prisma.profile
    .findUnique({ where: { id: "singleton" } })
    .catch(() => null);

  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-blue-100 bg-blue-950 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="font-heading font-bold text-xl">
              {profile?.name ?? "Sahar Nikzad"}
            </p>
            <p className="text-sm text-blue-200 mt-1">
              {profile?.tagline ?? ""}
            </p>
          </div>

          <div className="flex items-center gap-6 text-sm">
            <Link href="/journey" className="text-blue-100 hover:text-white transition">
              Journey
            </Link>
            <Link href="/experience" className="text-blue-100 hover:text-white transition">
              Experience
            </Link>
            <Link href="/media" className="text-blue-100 hover:text-white transition">
              Media
            </Link>
            <Link href="/contact" className="text-blue-100 hover:text-white transition">
              Contact
            </Link>
          </div>

          <div className="flex items-center gap-3">
            {profile?.linkedinUrl && (
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            )}
            {profile?.instagramUrl && (
              <a
                href={profile.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
            )}
            {profile?.contactEmail && (
              <a
                href={`mailto:${profile.contactEmail}`}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        <p className="text-xs text-blue-300 mt-8">© {year} {profile?.name ?? "Sahar Nikzad"}.</p>
      </div>
    </footer>
  );
}
