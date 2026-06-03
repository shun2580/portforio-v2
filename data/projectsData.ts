import type { Project } from './types';

export const projectsData: Project[] = [
  {
    title: 'マルチエージェントAI開発環境',
    overview:
      '将軍・家老・足軽・軍師の役割分担による階層型マルチエージェントシステム。イベント駆動方式のタスク管理とYAMLベースの永続化で、複数AIエージェントが自律的に協調動作する。',
    problem:
      'ローカルLLMは複数ステップの指示に追従できず、エージェントが無限ループに陥り手動リセットが必要だった。Claude Proの5時間レート制限が開発の重要な局面で中断を引き起こし、継続的な自律実行を妨げていた。',
    solution:
      '将軍・家老・足軽・軍師の4階層エージェント構成をCoDD（整合性駆動開発）と統合し、自然言語の指示だけで要件定義→設計→実装→品質チェックまでを自動実行。Claude Sonnet / Gemini 2.5 Flash / Ollama（ローカルLLM）による7エージェントのマルチモデルハイブリッド構成を実現。inotifywaitによるイベント駆動方式でポーリングを廃止し、inboxメッセージングとYAML永続化でゼロロス協調を確立。',
    result:
      '月額固定コスト内で3社AIプロバイダーにまたがる7エージェント同時稼働を実現。エージェント間通信のAPIコストはゼロ。コンテキスト枯渇やCLI障害からの自動リカバリーにより、人手介入なしで自律運用が継続。CI/CD・マルチモデル連携・可観測性を含む200以上のコミットを蓄積。',
    tags: ['Claude Code', 'Multi-Agent Systems', 'CoDD', 'Bash', 'Gemini CLI', 'Ollama', 'OpenCode'],
    githubUrl: 'https://github.com/ZenkakuHiragana/multi-agent-shogun',
  },
];
