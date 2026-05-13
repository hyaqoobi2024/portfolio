"use client";

import CrudManager from "@/components/dashboard/CrudManager";

export default function SkillsPage() {
  return (
    <CrudManager
      title="Skills"
      description="Creative, leadership, and sports skills."
      endpoint="/api/skills"
      fields={[
        { name: "name", label: "Skill", type: "text", required: true, placeholder: "Animation" },
        {
          name: "category",
          label: "Category",
          type: "select",
          required: true,
          options: ["Creative", "Leadership", "Sports", "Other"],
        },
        { name: "description", label: "Short description", type: "textarea" },
        { name: "order", label: "Order", type: "number" },
      ]}
      itemLabel={(s) => String(s.name)}
      itemMeta={(s) => String(s.category)}
      defaultValues={{ category: "Creative" }}
    />
  );
}
