export interface HeroContent {
  name: string;
  role: string;
  headline: string;
  intro: string;
  githubUrl: string;
}

export interface AboutContent {
  summary: string;
  jobOverview: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface Project {
  kind: 'work' | 'personal';
  title: string;
  period: string;
  overview: string;
  problem: string;
  solution: string;
  result: string;
  tags: string[];
  githubUrl: string;
  storeUrl?: string;
}

export interface CareerEntry {
  company: string;
  period: string;
  role: string;
  description: string;
}

export interface ContactContent {
  email: string;
  github: string;
  zenn: string;
}
