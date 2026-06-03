import type { Project } from './types';

export const projectsData: Project[] = [
  {
    title: 'Multi-Agent AI Development Environment',
    overview:
      'Hierarchical multi-agent system with role-based workflow orchestration and event-driven task management.',
    problem:
      'Traditional single-threaded AI applications fail to scale for complex, long-running tasks. Coordination overhead and state management become bottlenecks.',
    solution:
      'Implemented a 4-tier agent hierarchy (Shogun/Karo/Ashigaru/Gunshi) with multi-model hybrid execution — Claude Sonnet 4.6, Gemini 2.5 Flash, and Ollama (local LLM) running concurrently across 7 agents. CoDD-driven design, inbox-based messaging, and YAML task persistence eliminate polling overhead.',
    result:
      '7 concurrent agents across 3 AI providers (Anthropic / Google / local Ollama) with zero API cost for inter-agent coordination. 200+ commits across CI/CD integration, observability, and multi-model orchestration.',
    tags: ['Claude Code', 'Multi-Agent Systems', 'CoDD', 'Bash', 'Gemini CLI', 'Ollama'],
    githubUrl: 'https://github.com/ZenkakuHiragana/multi-agent-shogun',
  },
];
