"use client";

import CrudManager from "@/components/dashboard/CrudManager";

export default function ExperiencesPage() {
  return (
    <CrudManager
      title="Career experience"
      description="Teaching, founding, and leadership roles."
      endpoint="/api/experiences"
      fields={[
        { name: "title", label: "Role / title", type: "text", required: true, placeholder: "Math Teacher" },
        { name: "organization", label: "Organization", type: "text", required: true },
        {
          name: "type",
          label: "Type",
          type: "select",
          options: ["Work", "Founding", "Leadership", "Teaching"],
        },
        { name: "startDate", label: "Start date", type: "date", required: true },
        { name: "endDate", label: "End date", type: "date", help: "Leave empty if current." },
        { name: "current", label: "Currently in this role", type: "checkbox", placeholder: "Yes, still ongoing" },
        { name: "description", label: "Description", type: "textarea" },
        { name: "order", label: "Order", type: "number" },
      ]}
      itemLabel={(e) => `${e.title} — ${e.organization}`}
      itemMeta={(e) => String(e.type)}
      defaultValues={{ type: "Work" }}
    />
  );
}
