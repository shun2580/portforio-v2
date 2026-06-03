import type { Project } from './types';

export const projectsData: Project[] = [
  {
    title: 'ふるさと納税サイトの ECS＋Laravel リアーキテクチャ',
    overview:
      'EC2＋独自フレームワーク構成の既存システムを ECS＋Laravel へ全面移行。メインエンジニアとして発案から推進まで一貫して担当。',
    problem:
      '長年稼働していた EC2＋自社フレームワーク構成の保守性が低下し、機能追加やモダンな開発プロセスへの移行が困難になっていた。',
    solution:
      'ECS＋Laravel 構成への移行を主担当として発案・設計。拡張性を考慮した設計方針を策定し、MR ベースのコードレビューフローも整備。技術的意思決定を一貫して担当。',
    result:
      'システムの信頼性と運用効率を大幅向上。モダンなコンテナ環境への移行基盤を確立し、以降の機能開発スピードを改善。',
    tags: ['PHP', 'Laravel', 'AWS ECS', 'Docker'],
    githubUrl: '#',
  },
  {
    title: 'シリアルコード型ふるさと納税サイト・CMS 新規開発',
    overview:
      'Next.js（App Router）＋Laravel＋Nginx の BFF 構成でサイトと CMS をゼロから設計・構築。2 名体制で技術リードを担当。',
    problem:
      'フロントとバックエンドが密結合にならないモダンな技術スタックの選定と、インフラ構成をゼロベースで策定する必要があった。',
    solution:
      'BFF アーキテクチャを自ら設計し、ECS 構成のインフラ策定・Dockerfile 作成・GitLab CI によるデプロイ自動化まで一貫して構築。フロントからインフラまで技術リードとして牽引。',
    result:
      '期間内にリリースを安定して完遂。インフラからフロントエンドまで見通しの良い、変化に強い開発基盤を確立。',
    tags: ['Next.js', 'Laravel', 'AWS ECS', 'GitLab CI', 'Docker'],
    githubUrl: '#',
  },
  {
    title: '開発環境のコンテナ化・標準化と DX 向上',
    overview:
      'DevContainer 導入・GitLab CI 整備・ポート管理ツール展開により、チーム全体の開発環境を統一。属人性を排除した仕組みを構築。',
    problem:
      'ローカル環境差異による Pint フォーマット不整合やポート競合問題が開発のボトルネックとなっていた。',
    solution:
      'DevContainer で設定を完全統一し、ポート競合防止ツール「tug」を導入。GitLab CI に Pint・PHPStan を追加し、品質チェックを自動化。',
    result:
      '属人性を排除し、新規メンバー参画時の環境構築工数を大幅削減。コード品質が CI 段階で恒久的に担保される仕組みを確立。',
    tags: ['DevContainer', 'GitLab CI', 'PHP', 'Docker'],
    githubUrl: '#',
  },
  {
    title: 'マルチエージェント AI 開発環境',
    overview:
      '将軍・家老・足軽・軍師の役割分担による階層型マルチエージェントシステム。イベント駆動方式のタスク管理と YAML ベースの永続化で、複数 AI エージェントが自律的に協調動作する。',
    problem:
      'ローカル LLM は複数ステップの指示に追従できず、エージェントが無限ループに陥り手動リセットが必要だった。Claude Pro の 5 時間レート制限が開発の重要な局面で中断を引き起こし、継続的な自律実行を妨げていた。',
    solution:
      '4 階層エージェント構成を CoDD と統合し、自然言語の指示だけで要件定義→設計→実装→品質チェックまでを自動実行。Claude Sonnet / Gemini 2.5 Flash / Ollama のマルチモデルハイブリッド構成で 7 エージェントを同時稼働。inotifywait によるイベント駆動方式でポーリングを廃止。',
    result:
      '月額固定コスト内で 3 社 AI プロバイダーにまたがる 7 エージェント同時稼働を実現。エージェント間通信の API コストはゼロ。コンテキスト枯渇や CLI 障害からの自動リカバリーで人手介入なしに自律運用が継続。',
    tags: ['Claude Code', 'Multi-Agent', 'CoDD', 'Bash', 'Gemini CLI', 'Ollama'],
    githubUrl: 'https://github.com/ZenkakuHiragana/multi-agent-shogun',
  },
];
