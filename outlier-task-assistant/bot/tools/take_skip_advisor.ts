import { defineTool } from "@grok/agent-sdk/tools";
import * as z from "zod/v4";

export default defineTool({
  description:
    "Advise take vs skip for an Outlier coding project/task given shown rate and fit signals.",
  effect: "read",
  execution: "server",
  inputSchema: z.object({
    shown_rate_usd_per_hr: z.number().nullable(),
    floor_usd_per_hr: z.number().default(20),
    skill_fit: z.enum(["strong", "ok", "weak"]),
    guidelines_clear: z.boolean(),
    finishes_inside_estimate: z.boolean(),
    tired_or_rushed: z.boolean().default(false),
  }),
  async execute(input) {
    const reasons: string[] = [];
    let decision: "take" | "skip" | "clarify" = "take";

    if (input.shown_rate_usd_per_hr == null) {
      decision = "clarify";
      reasons.push("Shown rate missing — do not start until the project displays a rate.");
    } else if (input.shown_rate_usd_per_hr < input.floor_usd_per_hr) {
      decision = "skip";
      reasons.push(
        `Shown rate $${input.shown_rate_usd_per_hr}/hr is under floor $${input.floor_usd_per_hr}/hr.`,
      );
    }

    if (input.skill_fit === "weak") {
      decision = "skip";
      reasons.push("Weak skill fit raises reject/withhold risk.");
    }
    if (!input.guidelines_clear) {
      decision = decision === "take" ? "clarify" : decision;
      reasons.push("Guidelines unclear — clarify in War Room before tasking.");
    }
    if (!input.finishes_inside_estimate) {
      decision = "skip";
      reasons.push("Likely overtime / non-core lower rate — skip or shrink scope.");
    }
    if (input.tired_or_rushed) {
      decision = "skip";
      reasons.push("Tired/rushed — quality risk can withhold pay.");
    }

    if (decision === "take" && reasons.length === 0) {
      reasons.push("Rate, fit, clarity, and estimate look acceptable.");
    }

    return { decision, floor_usd_per_hr: input.floor_usd_per_hr, reasons };
  },
});
