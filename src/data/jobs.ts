export type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  remoteType: "Remote" | "Hybrid" | "Optional Remote";
  employmentType: string;
  tags: string[];
  summary: string;
  lastSeen: string;
  source: string;
  applyUrl: string;
  clearance?: string;
  salary?: string;
  publishedAt?: string;
};

export const sampleJobs: Job[] = [
  {
    id: "ops-1",
    title: "Cloud Operations Engineer (TS/SCI)",
    company: "Sparkwave IT Service",
    location: "Remote · US only",
    remoteType: "Optional Remote",
    employmentType: "Full-time",
    tags: ["veteran-friendly", "clearance", "k8s", "observability"],
    summary:
      "Support secure workloads for federal clients, harden clusters, and coach teams on reliable change delivery.",
    lastSeen: "2h ago",
    source: "Manual curation",
    applyUrl: "https://sparkwaveitservice.com/careers/ops",
    clearance: "TS/SCI eligible",
    salary: "$145K–$170K",
  },
  {
    id: "data-1",
    title: "Senior Data Engineer (Remote-first)",
    company: "Remote Defense Analytics",
    location: "Remote · North America",
    remoteType: "Remote",
    employmentType: "Full-time",
    tags: ["spark", "python", "airflow", "veteran-friendly"],
    summary:
      "Build ingestion for public APIs and employer feeds, automate quality checks, and own schema evolution.",
    lastSeen: "1d ago",
    source: "Remotive feed",
    applyUrl: "https://example.com/jobs/data-engineer",
    clearance: "Public Trust",
  },
  {
    id: "sec-1",
    title: "Hybrid Security Analyst",
    company: "CivicCyber",
    location: "Hybrid · DC / Arlington",
    remoteType: "Hybrid",
    employmentType: "Contract-to-hire",
    tags: ["siem", "splunk", "blue-team", "hybrid"],
    summary:
      "Triage alerts, run purple-team playbooks, and help document POA&M updates for ATO packages.",
    lastSeen: "3d ago",
    source: "Greenhouse board",
    applyUrl: "https://example.com/jobs/security-analyst",
    clearance: "Secret",
    salary: "$70–$85/hr",
  },
  {
    id: "people-ops-1",
    title: "People Ops Coordinator",
    company: "MissionLane",
    location: "Remote · Flexible timezone",
    remoteType: "Remote",
    employmentType: "Part-time",
    tags: ["people-ops", "benefits", "optional-remote", "veteran-friendly"],
    summary:
      "Own onboarding/offboarding, support military leave benefits, and maintain vendor compliance records.",
    lastSeen: "5d ago",
    source: "Manual submission",
    applyUrl: "https://example.com/jobs/people-ops",
  },
];

export const veteranResources = [
  {
    title: "Translate service to skills",
    copy: "Use the CareerOneStop MOS translator to map MOS/AFSC/Rating to keywords recruiters search for.",
    action: "CareerOneStop MOS Translator",
    url: "https://www.careeronestop.org/Toolkit/Jobs/mos-translator.aspx",
  },
  {
    title: "SkillBridge & internships",
    copy: "Find DoD SkillBridge partners and internship options before separation; confirm eligibility with your command.",
    action: "DoD SkillBridge",
    url: "https://skillbridge.osd.mil/",
  },
  {
    title: "Remote + hybrid search tips",
    copy: "Learn remote-work expectations, time-zone etiquette, and interview prep tailored for military families.",
    action: "Military OneSource remote guide",
    url: "https://www.militaryonesource.mil/resources/remote-work-101/",
  },
  {
    title: "Interview prep for veterans",
    copy: "Behavioral examples, STAR stories, and mock interview resources built for service members.",
    action: "Hiring Our Heroes workshops",
    url: "https://www.hiringourheroes.org/career-services/workshops/",
  },
  {
    title: "GI Bill & training",
    copy: "Compare programs, costs, and housing allowances with the VA GI Bill Comparison Tool.",
    action: "GI Bill Comparison Tool",
    url: "https://www.va.gov/gi-bill-comparison-tool",
  },
  {
    title: "One-on-one career mentorship",
    copy: "Free year-long mentorship for service members, veterans, and spouses via ACP.",
    action: "American Corporate Partners",
    url: "https://www.acp-usa.org/mentoring-program/program-overview",
  },
];
