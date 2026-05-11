"use client";

import CrudManager from "@/components/dashboard/CrudManager";

export default function EducationPage() {
  return (
    <CrudManager
      title="Education"
      description="Schools and programs. (Do not include grades — they change.)"
      endpoint="/api/education"
      fields={[
        { name: "institution", label: "Institution", type: "text", required: true, placeholder: "GNS" },
        { name: "program", label: "Program", type: "text", placeholder: "IB" },
        { name: "startDate", label: "Start date", type: "date" },
        { name: "endDate", label: "End date", type: "date" },
        { name: "current", label: "Currently studying", type: "checkbox", placeholder: "Yes, still ongoing" },
        { name: "description", label: "Description", type: "textarea" },
        { name: "order", label: "Order", type: "number" },
      ]}
      itemLabel={(e) => String(e.institution)}
      itemMeta={(e) => String(e.program)}
    />
  );
}
