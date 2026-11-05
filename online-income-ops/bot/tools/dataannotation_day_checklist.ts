import { defineTool } from "@grok/agent-sdk/tools";
import * as z from "zod/v4";

type Phase = "signup" | "assessment" | "id_paypal" | "projects" | "full_day";

type Step = {
  id: number;
  text: string;
  owner: "user" | "agent";
  must_click: boolean;
};

const FORBIDDEN = [
  "Do not use a VPN or spoof location",
  "Do not have the agent take the assessment or solve live tasks",
  "Do not store passwords, PayPal credentials, or ID images in chat/tools",
  "Do not pursue Outlier geo-bypass or cousin RBS / serving jobs",
] as const;

function stepsFor(phase: Phase): Step[] {
  const signup: Step[] = [
    {
      id: 1,
      text: "Open https://app.dataannotation.tech/worker_signup in your normal browser (no VPN)",
      owner: "user",
      must_click: true,
    },
    {
      id: 2,
      text: "Pass Cloudflare if shown; fill legal name, email, password, +1 phone",
      owner: "user",
      must_click: true,
    },
    {
      id: 3,
      text: "Submit signup as independent contractor",
      owner: "user",
      must_click: true,
    },
  ];
  const assessment: Step[] = [
    {
      id: 1,
      text: "Choose Coding track if you can read/write code; else Starter/Generalist",
      owner: "user",
      must_click: true,
    },
    {
      id: 2,
      text: "Quiet room, full focus — one attempt only; read every instruction",
      owner: "user",
      must_click: false,
    },
    {
      id: 3,
      text: "Answer carefully yourself; review before submit (agent may only quiz concepts / remind checklist)",
      owner: "user",
      must_click: true,
    },
    {
      id: 4,
      text: "Log an onboarding earnings row with status=submitted, rate=uncertain",
      owner: "agent",
      must_click: false,
    },
  ];
  const idPaypal: Step[] = [
    {
      id: 1,
      text: "After approval email: sign in → complete Persona ID (US DL / passport / state ID)",
      owner: "user",
      must_click: true,
    },
    {
      id: 2,
      text: "Confirm/create PayPal that can receive USD; email must match payout settings",
      owner: "user",
      must_click: true,
    },
  ];
  const projects: Step[] = [
    {
      id: 1,
      text: "Open projects; confirm shown rate ≥ floor (default $20/hr effective)",
      owner: "user",
      must_click: true,
    },
    {
      id: 2,
      text: "Start with a smaller project; restate requirements before working",
      owner: "user",
      must_click: false,
    },
    {
      id: 3,
      text: "You alone complete paid work; agent may coach process, not produce assessment/task answers",
      owner: "user",
      must_click: true,
    },
    {
      id: 4,
      text: "Log task_id, minutes, shown rate, status via format_earnings_row (stream=dataannotation)",
      owner: "agent",
      must_click: false,
    },
    {
      id: 5,
      text: "Request PayPal payout when ready — you click; agent never holds credentials",
      owner: "user",
      must_click: true,
    },
  ];

  switch (phase) {
    case "signup":
      return signup;
    case "assessment":
      return assessment;
    case "id_paypal":
      return idPaypal;
    case "projects":
      return projects;
    case "full_day":
      return [
        ...signup.map((s, i) => ({ ...s, id: i + 1 })),
        ...assessment.map((s, i) => ({
          ...s,
          id: signup.length + i + 1,
          text: `[assessment] ${s.text}`,
        })),
        ...idPaypal.map((s, i) => ({
          ...s,
          id: signup.length + assessment.length + i + 1,
          text: `[id/paypal] ${s.text}`,
        })),
        ...projects.map((s, i) => ({
          ...s,
          id: signup.length + assessment.length + idPaypal.length + i + 1,
          text: `[projects] ${s.text}`,
        })),
      ];
    default: {
      const _exhaustive: never = phase;
      return _exhaustive;
    }
  }
}

export default defineTool({
  description:
    "Return the DataAnnotation day workflow checklist for a given phase (legal-only; no assessment solving).",
  effect: "read",
  execution: "server",
  inputSchema: z.object({
    phase: z
      .enum(["signup", "assessment", "id_paypal", "projects", "full_day"])
      .default("full_day"),
  }),
  async execute({ phase }) {
    return {
      phase,
      signup_url: "https://app.dataannotation.tech/worker_signup",
      steps: stepsFor(phase),
      forbidden: FORBIDDEN,
      rule: "If any must_click step is incomplete, stop and finish that step before advancing.",
    };
  },
});
