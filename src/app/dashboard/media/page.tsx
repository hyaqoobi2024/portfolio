"use client";

import CrudManager from "@/components/dashboard/CrudManager";

export default function MediaPage() {
  return (
    <CrudManager
      title="Media"
      description="Videos (animation, assembly speech) and photo highlights (theatre, animation poster)."
      endpoint="/api/media"
      fields={[
        { name: "title", label: "Title", type: "text", required: true },
        {
          name: "type",
          label: "Type",
          type: "select",
          options: ["Video", "Photo", "Poster"],
        },
        { name: "youtubeUrl", label: "YouTube URL", type: "url", help: "Required for videos. Paste the full link." },
        { name: "image", label: "Image path", type: "text", help: "For photos/posters, or a thumbnail. Upload to /public/images first." },
        { name: "description", label: "Description", type: "textarea" },
        { name: "order", label: "Order", type: "number" },
      ]}
      itemLabel={(m) => String(m.title)}
      itemMeta={(m) => String(m.type)}
      defaultValues={{ type: "Video" }}
    />
  );
}
