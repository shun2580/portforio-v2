export interface HeroContent {
  name: string;
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
  title: string;
  overview: string;
  problem: string;
  solution: string;
  result: string;
  tags: string[];
  githubUrl: string;
}

export interface CareerEntry {
  company: string;
  period: string;
  role: string;
  description: string;
}

export interface ContactContent {
  github: string;
  email: string;
}
