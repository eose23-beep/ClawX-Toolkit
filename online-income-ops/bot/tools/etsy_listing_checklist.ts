import { defineTool } from "@grok/agent-sdk/tools";
import * as z from "zod/v4";

const SHARED = [
  {
    id: 1,
    text: "Confirm Etsy Payments / bank still Ready (no red banner)",
    owner: "user" as const,
    must_click: true,
  },
  {
    id: 2,
    text: "Confirm shop policies exist (processing, returns for digital, shipping for POD)",
    owner: "user" as const,
    must_click: true,
  },
  {
    id: 3,
    text: "Draft title, 13 tags, description, FAQ (agent may draft; you paste)",
    owner: "agent" as const,
    must_click: false,
  },
  {
    id: 4,
    text: "Original / properly licensed design only — no trademarks, scraped viral IP, or fake reviews",
    owner: "user" as const,
    must_click: false,
  },
];

const DIGITAL = [
  {
    id: 5,
    text: "Create/export PDF/PNG ≤20MB (you own file creation)",
    owner: "user" as const,
    must_click: true,
  },
  {
    id: 6,
    text: "Add listing → Digital files → Instant download → upload files + clear preview mockups",
    owner: "user" as const,
    must_click: true,
  },
];

const POD = [
  {
    id: 5,
    text: "Connect Printful/Printify/Gelato and disclose production partner on Etsy",
    owner: "user" as const,
    must_click: true,
  },
  {
    id: 6,
    text: "Approve blank + design; set margin ≥ ~$8 after print+ship+fees",
    owner: "user" as const,
    must_click: true,
  },
];

const PUBLISH = [
  {
    id: 7,
    text: "Price covers fees (US public: $0.20 listing · 6.5% transaction · 3%+$0.25 processing)",
    owner: "user" as const,
    must_click: false,
  },
  {
    id: 8,
    text: "Hit Publish / Update — agent must not auto-post",
    owner: "user" as const,
    must_click: true,
  },
  {
    id: 9,
    text: "Copy listing URL; optional: draft TT/IG script (you film + post)",
    owner: "user" as const,
    must_click: true,
  },
  {
    id: 10,
    text: "Log earnings/ops row with stream=etsy (listing fee or sale)",
    owner: "agent" as const,
    must_click: false,
  },
];

export default defineTool({
  description:
    "Return the Etsy listing draft→publish checklist. Agent drafts; user must publish (no auto-post).",
  effect: "read",
  execution: "server",
  inputSchema: z.object({
    product_kind: z.enum(["digital", "pod", "both"]).default("digital"),
  }),
  async execute({ product_kind }) {
    const mid =
      product_kind === "digital"
        ? DIGITAL
        : product_kind === "pod"
          ? POD
          : [
              ...DIGITAL.map((s) => ({ ...s, text: `[digital] ${s.text}` })),
              ...POD.map((s, i) => ({
                ...s,
                id: 5 + DIGITAL.length + i,
                text: `[pod] ${s.text}`,
              })),
            ];
    const steps = [...SHARED, ...mid, ...PUBLISH].map((s, i) => ({
      ...s,
      id: i + 1,
    }));
    return {
      product_kind,
      listings_url: "https://www.etsy.com/your/shops/me/tools/listings",
      steps,
      forbidden: [
        "No auto-publish / auto-post to Etsy, TikTok, or Instagram",
        "No trademark hijacks, purchased reviews, or traffic farms",
        "No VPN / multi-account abuse",
      ],
      rule: "Draft is ready only when must_click steps for file/POD + Publish are done by the user.",
    };
  },
});
