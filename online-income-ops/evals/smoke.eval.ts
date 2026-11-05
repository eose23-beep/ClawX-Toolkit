import { defineEval } from "@grok/agent-sdk/evals";

export default defineEval({
  tags: ["smoke"],
  description: "DataAnnotation day checklist tool returns phase steps.",
  async test(t) {
    await t.send(
      'Call the dataannotation_day_checklist tool for phase "assessment" and summarize the must-click steps. Do not solve any assessment questions.',
    );
    t.succeeded();
    t.calledTool("dataannotation_day_checklist");
  },
});
