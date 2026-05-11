import { prisma } from "@/lib/db";
import Link from "next/link";
import {
  FileText,
  Video,
  User,
  Sparkles,
  Briefcase,
  Rocket,
  GraduationCap,
  Users,
  HandHeart,
  Film,
  Compass,
  MessageCircle,
} from "lucide-react";

export default async function DashboardPage() {
  const [
    posts,
    interviews,
    skills,
    experiences,
    initiatives,
    education,
    clubs,
    volunteering,
    media,
    journey,
    greetings,
    profile,
  ] = await Promise.all([
    prisma.post.count(),
    prisma.interview.count(),
    prisma.skill.count(),
    prisma.experience.count(),
    prisma.initiative.count(),
    prisma.education.count(),
    prisma.club.count(),
    prisma.volunteering.count(),
    prisma.media.count(),
    prisma.journeyMilestone.count(),
    prisma.greeting.count(),
    prisma.profile.findUnique({ where: { id: "singleton" } }),
  ]);

  const cards = [
    { href: "/dashboard/profile", icon: User, label: "Profile & Vision", count: null, description: "Name, tagline, bio, vision, contact." },
    { href: "/dashboard/greetings", icon: MessageCircle, label: "Greetings", count: greetings, description: "Multilingual hellos on the homepage." },
    { href: "/dashboard/skills", icon: Sparkles, label: "Skills", count: skills, description: "Creative, leadership, sports." },
    { href: "/dashboard/journey", icon: Compass, label: "Journey", count: journey, description: "Story milestones — Canada, WLOT, more." },
    { href: "/dashboard/experiences", icon: Briefcase, label: "Career", count: experiences, description: "Teaching and founding roles." },
    { href: "/dashboard/initiatives", icon: Rocket, label: "Initiatives", count: initiatives, description: "AlphaSeekers, Solh, Hamdeli." },
    { href: "/dashboard/education", icon: GraduationCap, label: "Education", count: education, description: "Schools and programs." },
    { href: "/dashboard/clubs", icon: Users, label: "Clubs", count: clubs, description: "Math Club, Round Square, GMUN." },
    { href: "/dashboard/volunteering", icon: HandHeart, label: "Volunteering", count: volunteering, description: "Roles and hours." },
    { href: "/dashboard/media", icon: Film, label: "Videos & Photos", count: media, description: "Animation, speeches, theatre." },
    { href: "/dashboard/interviews", icon: Video, label: "Interviews", count: interviews, description: "CBC, Check News, etc." },
    { href: "/dashboard/posts", icon: FileText, label: "Posts", count: posts, description: "Blog posts and stories." },
  ];

  const firstName = profile?.name?.split(" ")[0] ?? "Sahar";

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue-950">Hey {firstName}</h1>
        <p className="text-gray-500 mt-1">
          Edit anything on your site from here. Every section is editable.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="bg-white rounded-xl border border-gray-200 p-5 hover:border-blue-300 hover:shadow-sm transition group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <card.icon className="w-5 h-5" />
              </div>
              {card.count !== null && (
                <span className="text-sm font-semibold text-gray-500">
                  {card.count}
                </span>
              )}
            </div>
            <p className="font-semibold text-blue-950 group-hover:text-blue-700">
              {card.label}
            </p>
            <p className="text-sm text-gray-500 mt-1">{card.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
