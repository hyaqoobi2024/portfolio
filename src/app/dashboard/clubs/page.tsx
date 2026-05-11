"use client";

import CrudManager from "@/components/dashboard/CrudManager";

export default function ClubsPage() {
  return (
    <CrudManager
      title="Clubs"
      description="Math Club, Round Square, GMUN, and other clubs."
      endpoint="/api/clubs"
      fields={[
        { name: "name", label: "Club name", type: "text", required: true, placeholder: "Math Club" },
        { name: "role", label: "Role", type: "text", placeholder: "Member" },
        { name: "description", label: "Description", type: "textarea", help: "Mention any standout events, e.g. Let's Afghan Girls Learn Campaign." },
        { name: "order", label: "Order", type: "number" },
      ]}
      itemLabel={(c) => String(c.name)}
      itemMeta={(c) => String(c.role)}
    />
  );
}
