import Link from "next/link";
import type { SVGProps } from "react";
import { Sparkles, Mail } from "lucide-react";

function LinkedinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 11.01-4.12 2.06 2.06 0 010 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function YouTubeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

const socials = [
  {
    label: "YouTube",
    href: "https://www.youtube.com/@SaharVerse-1111",
    Icon: YouTubeIcon,
    hover: "hover:bg-red-500 hover:text-white",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/sahar-nikzad-095ba9337/",
    Icon: LinkedinIcon,
    hover: "hover:bg-blue-600 hover:text-white",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/official_sahar_nikzad_",
    Icon: InstagramIcon,
    hover: "hover:bg-blue-500 hover:text-white",
  },
  {
    label: "Email",
    href: "mailto:saharnikzad187@gmail.com",
    Icon: (props: SVGProps<SVGSVGElement>) => <Mail {...props} />,
    hover: "hover:bg-purple-500 hover:text-white",
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-purple-100 bg-gradient-to-b from-white to-purple-50/40">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-12">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-500" />
            <span className="font-heading font-bold gradient-text text-lg">
              Sahar Nikzad
            </span>
          </div>

          {/* Nav links */}
          <div className="flex items-center justify-center gap-4 md:gap-6 text-sm text-gray-500 flex-wrap">
            <Link href="/journey" className="hover:text-purple-600 transition-colors">
              Journey
            </Link>
            <Link href="/vision" className="hover:text-purple-600 transition-colors">
              Vision
            </Link>
            <Link href="/alpha-seekers" className="hover:text-purple-600 transition-colors">
              Alpha Seekers
            </Link>
            <Link href="/interviews" className="hover:text-purple-600 transition-colors">
              Media
            </Link>
            <Link href="/contact" className="hover:text-purple-600 transition-colors">
              Contact
            </Link>
          </div>

          {/* Social icons */}
          <div className="flex items-center justify-end gap-2">
            {socials.map(({ label, href, Icon, hover }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                aria-label={label}
                className={`w-10 h-10 rounded-xl bg-white border border-purple-100 text-gray-600 flex items-center justify-center transition-all ${hover} hover:-translate-y-1 hover:shadow-lg`}
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-purple-100 text-center md:text-right text-xs text-gray-400">
          <p>© {new Date().getFullYear()} Sahar Nikzad. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
