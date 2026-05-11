"use client";

import CrudManager from "@/components/dashboard/CrudManager";

export default function GreetingsPage() {
  return (
    <CrudManager
      title="Greetings"
      description="Multilingual greetings that rotate on the homepage."
      endpoint="/api/greetings"
      fields={[
        { name: "text", label: "Greeting", type: "text", required: true, placeholder: "Salam" },
        { name: "language", label: "Language", type: "text", required: true, placeholder: "Dari" },
        { name: "order", label: "Order", type: "number", help: "Lower numbers appear first." },
      ]}
      itemLabel={(g) => String(g.text)}
      itemMeta={(g) => String(g.language)}
    />
  );
}
