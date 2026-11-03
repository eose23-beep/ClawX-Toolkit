import { defineTool } from "@grok/agent-sdk/tools";
import * as z from "zod/v4";

const BLOCKERS = [
  "Requirements re-read; deliverable matches the prompt",
  "All required files / fields / formats present",
  "Solution runs or verifies as specified",
  "No secrets, credentials, or private data in the submission",
  "No policy circumvention, plagiarism, or fabricated results",
  "Open questions resolved or explicitly called out (no silent critical guesses)",
] as const;

export default defineTool({
  description:
    "Return the Outlier pre-submit blocker checklist the user must pass before submit.",
  effect: "read",
  execution: "server",
  inputSchema: z.object({
    task_type: z
      .enum(["implement", "review", "fix", "evaluate", "explain", "other"])
      .optional(),
  }),
  async execute({ task_type }) {
    return {
      task_type: task_type ?? "other",
      blockers: BLOCKERS.map((text, i) => ({ id: i + 1, text, must_pass: true })),
      rule: "If any blocker fails, do not submit. Escalate or fix first.",
    };
  },
});
