import { defineTool } from "@grok/agent-sdk/tools";
import * as z from "zod/v4";

function clipTags(tags: string[]): string[] {
  const out: string[] = [];
  for (const raw of tags) {
    const t = raw.trim().replace(/\s+/g, " ");
    if (!t || t.length > 20) continue;
    if (out.some((x) => x.toLowerCase() === t.toLowerCase())) continue;
    out.push(t);
    if (out.length >= 13) break;
  }
  return out;
}

export default defineTool({
  description:
    "Format an Etsy listing draft (title, tags, description, FAQ) for the user to paste. Does not publish.",
  effect: "read",
  execution: "server",
  inputSchema: z.object({
    niche: z.string().min(1),
    product_name: z.string().min(1),
    product_kind: z.enum(["digital", "pod"]).default("digital"),
    price_usd: z.number().positive(),
    outcome: z.string().min(1),
    audience: z.string().min(1),
    tags: z.array(z.string()).min(1),
    whats_included: z.array(z.string()).min(1),
    faq: z
      .array(z.object({ q: z.string().min(1), a: z.string().min(1) }))
      .default([]),
    materials_or_fulfillment: z.string().optional(),
  }),
  async execute(input) {
    const tags = clipTags(input.tags);
    const title = `${input.product_name} | ${input.niche}`.slice(0, 140);
    const kindLine =
      input.product_kind === "digital"
        ? "Instant digital download — no shipping wait."
        : "Print-on-demand via production partner — made when you order.";
    const included = input.whats_included.map((x) => `• ${x}`).join("\n");
    const faqBlock =
      input.faq.length === 0
        ? ""
        : `\n\nFAQ\n${input.faq.map((f) => `Q: ${f.q}\nA: ${f.a}`).join("\n\n")}`;
    const fulfillment =
      input.materials_or_fulfillment ??
      (input.product_kind === "digital"
        ? "Files delivered via Etsy Downloads after purchase."
        : "Fulfilled by disclosed Etsy production partner (e.g. Printful).");

    const description = [
      `${input.outcome} — made for ${input.audience}.`,
      "",
      kindLine,
      "",
      "What's included:",
      included,
      "",
      `Who it's for: ${input.audience}`,
      `Price: $${input.price_usd.toFixed(2)} (confirm fees cover your margin before publish)`,
      "",
      fulfillment,
      "",
      "Original design / properly licensed assets only. Not affiliated with any trademarked brands.",
      faqBlock,
    ]
      .join("\n")
      .trim();

    return {
      title,
      tags,
      tags_count: tags.length,
      tags_note:
        tags.length < 13
          ? `Only ${tags.length}/13 tags — add more ≤20-char buyer search phrases before publish.`
          : "13 tags ready — review for trademark risk before paste.",
      description,
      price_usd: input.price_usd,
      product_kind: input.product_kind,
      publish_reminder:
        "Paste into Etsy → upload files/POD → you hit Publish. This tool never posts.",
    };
  },
});
