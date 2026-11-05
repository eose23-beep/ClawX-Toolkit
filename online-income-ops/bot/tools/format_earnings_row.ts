import { defineTool } from "@grok/agent-sdk/tools";
import * as z from "zod/v4";

const STREAMS = [
  "dataannotation",
  "etsy",
  "alignerr",
  "mercor",
  "tiktok",
  "instagram",
  "printful",
  "crowdgen",
  "clickworker",
  "amazon_associates",
  "other",
] as const;

export default defineTool({
  description:
    "Format one multi-stream earnings-tracker CSV row (header-compatible) for the user to paste. Never stores credentials.",
  effect: "read",
  execution: "server",
  inputSchema: z.object({
    date: z.string().min(1),
    stream: z.enum(STREAMS),
    task_id: z.string().min(1),
    task_type: z.string().min(1),
    title_short: z.string().min(1),
    status: z.string().min(1),
    minutes: z.number().finite().nonnegative(),
    rate_or_offer: z.string().optional(),
    amount_earned: z.string().optional(),
    payout_status: z.string().default("pending"),
    notes: z.string().optional(),
  }),
  async execute(input) {
    const duration_hours = Math.round((input.minutes / 60) * 1000) / 1000;
    const rate = input.rate_or_offer ?? "";
    const amount = input.amount_earned ?? "";
    let effective_hourly = "";
    const amountNum = Number(amount);
    if (amount !== "" && Number.isFinite(amountNum) && duration_hours > 0) {
      effective_hourly = String(Math.round((amountNum / duration_hours) * 100) / 100);
    }
    const cells = [
      input.date,
      input.stream,
      input.task_id,
      input.task_type,
      input.title_short,
      input.status,
      String(input.minutes),
      String(duration_hours),
      rate,
      amount,
      effective_hourly,
      input.payout_status,
      input.notes ?? "",
    ];
    const csv_row = cells.map((c) => `"${String(c).replaceAll('"', '""')}"`).join(",");
    return {
      csv_header:
        "date,stream,task_id,task_type,title_short,status,minutes,duration_hours,rate_or_offer,amount_earned,effective_hourly,payout_status,notes",
      csv_row,
      reminder:
        "Paste into your local tracker. Do not put passwords, PayPal emails secrets, or ID numbers in notes.",
    };
  },
});
