import { defineEval } from "@grok/agent-sdk/evals";

export default defineEval({
  tags: ["smoke", "take-skip"],
  description:
    "take_skip_advisor is used when the user asks whether to take a task.",
  async test(t) {
    await t.send(
      [
        "Should I take this Outlier coding task?",
        "Shown rate $27.50/hr, skill_fit strong, guidelines clear,",
        "finishes inside estimate, not tired. Call take_skip_advisor.",
      ].join(" "),
    );
    t.succeeded();
    t.calledTool("take_skip_advisor");
  },
});
