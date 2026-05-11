"use client";

import CrudManager from "@/components/dashboard/CrudManager";

export default function JourneyPage() {
  return (
    <CrudManager
      title="Journey"
      description="Milestones — Afghanistan, Journey to Canada, WLOT scholarship, and beyond."
      endpoint="/api/journey"
      fields={[
        { name: "title", label: "Milestone", type: "text", required: true },
        { name: "date", label: "Date", type: "date" },
        { name: "description", label: "Story", type: "textarea" },
        { name: "image", label: "Image path", type: "text", help: "Optional. Upload to /public/images first." },
        { name: "order", label: "Order", type: "number" },
      ]}
      itemLabel={(m) => String(m.title)}
    />
  );
}
