import type { Project } from './types';

export const projectsData: Project[] = [
  {
    title: 'Multi-Agent AI Development Environment',
    overview:
      'Hierarchical multi-agent system with role-based workflow orchestration and event-driven task management.',
    problem:
      'Traditional single-threaded AI applications fail to scale for complex, long-running tasks. Coordination overhead and state management become bottlenecks.',
    solution:
      'Implemented a 4-tier agent hierarchy (Shogun/Karo/Ashigaru/Gunshi) with CoDD-driven design, inbox-based messaging, and YAML task persistence. Event-driven pipeline eliminates polling overhead.',
    result:
      'Supports unlimited concurrent agents with zero API consumption for coordination. 200+ commits across CI/CD integration and observability improvements.',
    tags: ['Claude Code', 'Multi-Agent Systems', 'CoDD', 'Bash'],
    githubUrl: 'https://github.com/ZenkakuHiragana/multi-agent-shogun',
  },
];
