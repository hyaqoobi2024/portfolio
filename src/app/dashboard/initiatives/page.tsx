"use client";

import CrudManager from "@/components/dashboard/CrudManager";

export default function InitiativesPage() {
  return (
    <CrudManager
      title="Initiatives"
      description="AlphaSeekers, Solh team, Hamdeli Association, and others."
      endpoint="/api/initiatives"
      fields={[
        { name: "name", label: "Name", type: "text", required: true, placeholder: "AlphaSeekers" },
        { name: "role", label: "Your role", type: "text", placeholder: "Co-founder" },
        { name: "description", label: "Description", type: "textarea" },
        {
          name: "image",
          label: "Image path",
          type: "text",
          placeholder: "/images/alphaseekers.jpg",
          help: "Upload the image to /public/images then put the path here, e.g. /images/alphaseekers.jpg",
        },
        { name: "link", label: "Website link", type: "url", placeholder: "https://…" },
        { name: "order", label: "Order", type: "number" },
      ]}
      itemLabel={(i) => String(i.name)}
      itemMeta={(i) => String(i.role)}
    />
  );
}
