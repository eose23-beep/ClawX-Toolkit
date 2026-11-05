import { defineTool } from "@grok/agent-sdk/tools";
import * as z from "zod/v4";

type Platform = "alignerr" | "mercor" | "both";

type Step = {
  id: number;
  text: string;
  owner: "user" | "agent";
  must_click: boolean;
};

const FORBIDDEN = [
  "Do not let the agent take AI interviews, evals, or assessments",
  "Do not store passwords, resume files with SSN, or ID images in tools",
  "Do not use VPN / VoIP SMS / fake work history",
  "Do not apply with cousin RBS or anyone else's credentials",
] as const;

function alignerrSteps(): Step[] {
  return [
    {
      id: 1,
      text: "Open https://app.alignerr.com/signin → agree ToS → Continue with Google or LinkedIn",
      owner: "user",
      must_click: true,
    },
    {
      id: 2,
      text: "Upload resume; set location = California, USA; select only real skills",
      owner: "user",
      must_click: true,
    },
    {
      id: 3,
      text: "Agent may draft resume bullets / job-fit notes for 2–3 matching roles",
      owner: "agent",
      must_click: false,
    },
    {
      id: 4,
      text: "You apply to 2–3 open jobs that match (https://www.alignerr.com/jobs)",
      owner: "user",
      must_click: true,
    },
    {
      id: 5,
      text: "Complete phone + Persona when prompted (US DL / passport / state ID)",
      owner: "user",
      must_click: true,
    },
    {
      id: 6,
      text: "Log apply row via format_earnings_row (stream=alignerr, status=applied)",
      owner: "agent",
      must_click: false,
    },
  ];
}

function mercorSteps(): Step[] {
  return [
    {
      id: 1,
      text: "Open https://work.mercor.com/login → Sign up (email code or Google)",
      owner: "user",
      must_click: true,
    },
    {
      id: 2,
      text: "Legal name, LinkedIn/resume, US work authorization, phone SMS (no VoIP)",
      owner: "user",
      must_click: true,
    },
    {
      id: 3,
      text: "Explore https://work.mercor.com/explore — shortlist Generalist / coding-adjacent roles",
      owner: "user",
      must_click: true,
    },
    {
      id: 4,
      text: "Agent may polish resume text and role shortlist; you click Apply",
      owner: "agent",
      must_click: false,
    },
    {
      id: 5,
      text: "Complete AI interview in Chrome with camera/mic — you alone answer",
      owner: "user",
      must_click: true,
    },
    {
      id: 6,
      text: "Log apply/interview row (stream=mercor); payout later via Stripe/Wise weekly",
      owner: "agent",
      must_click: false,
    },
  ];
}

function forPlatform(platform: Platform): Step[] {
  switch (platform) {
    case "alignerr":
      return alignerrSteps();
    case "mercor":
      return mercorSteps();
    case "both": {
      const a = alignerrSteps().map((s) => ({
        ...s,
        text: `[alignerr] ${s.text}`,
      }));
      const m = mercorSteps().map((s, i) => ({
        ...s,
        id: a.length + i + 1,
        text: `[mercor] ${s.text}`,
      }));
      return [...a, ...m];
    }
    default: {
      const _exhaustive: never = platform;
      return _exhaustive;
    }
  }
}

export default defineTool({
  description:
    "Return Alignerr and/or Mercor apply checklist. Drafts only — user applies, verifies ID, and takes interviews.",
  effect: "read",
  execution: "server",
  inputSchema: z.object({
    platform: z.enum(["alignerr", "mercor", "both"]).default("both"),
  }),
  async execute({ platform }) {
    return {
      platform,
      steps: forPlatform(platform),
      forbidden: FORBIDDEN,
      rule: "Agent drafts fit notes; user owns apply clicks, Persona/ID, and interview answers.",
    };
  },
});
