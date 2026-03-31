import { prisma } from "@/lib/db";
import { formatDate } from "@/lib/utils";
import { Video, ExternalLink, Calendar } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function InterviewsPage() {
  const interviews = await prisma.interview.findMany({
    orderBy: { date: "desc" },
  });

  return (
    <section className="py-20">
      <div className="section-container">
        <div className="text-center mb-16">
          <p className="handwriting text-2xl mb-3">in the spotlight</p>
          <h1 className="text-5xl md:text-6xl font-black gradient-text mb-4">
            Interviews & Media
          </h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Conversations, features, and media appearances that share my story with the world.
          </p>
        </div>

        {interviews.length === 0 ? (
          <div className="glass-card p-12 text-center max-w-lg mx-auto bg-pink-50/50 border-pink-100">
            <Video className="w-12 h-12 text-pink-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Coming Soon</h3>
            <p className="text-gray-500">
              Exciting interviews and media features are on the way! Stay tuned. 🎙️
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {interviews.map((interview) => (
              <article
                key={interview.id}
                className="glass-card p-6 hover:border-pink-300 transition-all"
              >
                {interview.videoUrl && (
                  <div className="aspect-video rounded-lg overflow-hidden mb-4 bg-gray-100">
                    <iframe
                      src={interview.videoUrl}
                      className="w-full h-full"
                      allowFullScreen
                      title={interview.title}
                    />
                  </div>
                )}
                <div className="flex items-center gap-2 mb-3">
                  <span className="sticker-badge text-xs">
                    🎙️ {interview.outlet}
                  </span>
                  {interview.upcoming && (
                    <span className="sticker-badge text-xs bg-amber-50 text-amber-600 border-amber-200">
                      Upcoming ✨
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-bold mb-2">{interview.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{interview.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {formatDate(interview.date)}
                  </span>
                  {interview.articleUrl && (
                    <a
                      href={interview.articleUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-purple-600 hover:text-purple-700 flex items-center gap-1"
                    >
                      Read Article <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
