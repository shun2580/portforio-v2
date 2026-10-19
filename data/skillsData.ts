import type { SkillCategory } from './types';

export const skillsData: SkillCategory[] = [
  {
    category: 'Languages & Frameworks',
    skills: ['PHP', 'Laravel', 'Go', 'TypeScript / JavaScript', 'Next.js', 'Vue.js'],
  },
  {
    category: 'Infrastructure & Cloud',
    skills: [
      'AWS (ECS / S3 / CloudFront)',
      'Docker / DevContainer',
      'Redis',
      'MySQL',
      'Linux',
      'GitLab CI',
      'GitHub Actions',
    ],
  },
  {
    category: 'Dev Tools & AI',
    skills: [
      'Git / GitLab',
      'Claude Code',
      'GitHub Copilot',
      'BDD (Gherkin)',
      'PHPStan / Pint',
      'tmux',
      'Datadog / Zabbix / Grafana',
    ],
  },
];
