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
  {
    title: 'Rearchitecture: Legacy Returnables Platform to AWS ECS',
    overview:
      'Modernized legacy monolithic application, reducing deployment time by 80% and improving fault isolation.',
    problem:
      'Existing on-premises infrastructure lacked horizontal scalability. Deployment cycles took 2+ hours. Single-component failures cascaded across the platform.',
    solution:
      'Migrated to containerized architecture on AWS ECS with RDS backend. Implemented blue-green deployments and container health checks.',
    result:
      'Reduced deployment time to 12 minutes. Enabled per-component scaling. Improved system reliability from 95% to 99.2% uptime.',
    tags: ['AWS ECS', 'Laravel', 'Docker'],
    githubUrl: '#',
  },
  {
    title: 'Serial-Code Ticketing System & CMS',
    overview:
      'Built new B2C product combining frontend for end-users with admin CMS for operations.',
    problem:
      'Previous ticketing system could not support serial-code validation. Operations team required manual reconciliation, causing revenue leakage.',
    solution:
      'Designed full-stack system: Next.js frontend with Tailwind CSS, Laravel backend with BFF pattern, PostgreSQL validation engine. Integrated automated reconciliation workflows.',
    result:
      'Automated 95% of revenue reconciliation. Reduced processing time from 4 hours to 15 minutes. Supported 1000+ daily transactions in UAT.',
    tags: ['Next.js', 'Laravel', 'BFF Architecture'],
    githubUrl: '#',
  },
];
