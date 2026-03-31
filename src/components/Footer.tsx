import Link from "next/link";
import { Heart, Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-purple-100 bg-gradient-to-b from-white to-purple-50/30">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-500" />
            <span className="font-heading font-bold gradient-text">Sahar Nikzad</span>
          </div>

          <div className="flex items-center gap-6 text-sm text-gray-500">
            <Link href="/journey" className="hover:text-purple-600 transition-colors">
              My Journey
            </Link>
            <Link href="/vision" className="hover:text-purple-600 transition-colors">
              My Vision
            </Link>
            <Link href="/stories" className="hover:text-purple-600 transition-colors">
              Stories
            </Link>
            <Link href="/contact" className="hover:text-purple-600 transition-colors">
              Contact
            </Link>
          </div>

          <p className="text-sm text-gray-400 flex items-center gap-1">
            Built with <Heart className="w-3 h-3 text-pink-400 fill-pink-400" /> and big dreams
          </p>
        </div>
      </div>
    </footer>
  );
}
