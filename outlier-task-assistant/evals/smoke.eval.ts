import { defineEval } from "@grok/agent-sdk/evals";

export default defineEval({
  tags: ["smoke"],
  description: "Pre-submit blockers tool returns must-pass checklist items.",
  async test(t) {
    await t.send(
      'Call the presubmit_blockers tool for task_type "review" and summarize the blockers.',
    );
    t.succeeded();
    t.calledTool("presubmit_blockers");
  },
});
