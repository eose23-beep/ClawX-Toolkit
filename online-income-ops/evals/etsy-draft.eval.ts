import { defineEval } from "@grok/agent-sdk/evals";

export default defineEval({
  tags: ["smoke", "etsy"],
  description: "Etsy listing draft formatter is used when user asks for a listing draft.",
  async test(t) {
    await t.send(
      [
        "Draft an Etsy digital listing for niche CA student planner printables,",
        "product Weekly Focus Planner PDF, price 9.99, audience college students,",
        "outcome plan the week in 10 minutes. Call format_etsy_listing_draft.",
        "Do not publish it.",
      ].join(" "),
    );
    t.succeeded();
    t.calledTool("format_etsy_listing_draft");
  },
});
