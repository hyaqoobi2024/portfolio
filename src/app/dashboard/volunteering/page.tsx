"use client";

import CrudManager from "@/components/dashboard/CrudManager";

export default function VolunteeringPage() {
  return (
    <CrudManager
      title="Volunteering"
      description="Volunteer roles and the hours tracked against each."
      endpoint="/api/volunteering"
      fields={[
        { name: "organization", label: "Organization", type: "text", required: true, placeholder: "WLOT" },
        { name: "role", label: "Role", type: "text" },
        { name: "hours", label: "Hours", type: "number" },
        { name: "description", label: "Description", type: "textarea" },
        { name: "order", label: "Order", type: "number" },
      ]}
      itemLabel={(v) => String(v.organization)}
      itemMeta={(v) => `${v.role || "Volunteer"} · ${v.hours || 0} hours`}
    />
  );
}
