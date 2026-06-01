---
codd:
  node_id: "req:portforio-v2-requirements"
  type: requirement
  status: approved
  confidence: 0.95
---

# ポートフォリオサイト Requirements

## Overview

バックエンドエンジニア・西川駿のポートフォリオサイト。転職・求職活動でのアピールを主目的とし、採用担当者・技術面接官に対して技術スキルと自走力を伝えるシングルページアプリケーション。

## Core Features

- **Hero セクション**: 氏名・一言自己紹介・GitHub リンク・スムーズスクロールナビゲーション
- **About セクション**: 経歴サマリー（異業種→IT転職の流れ）＋現在の業務概要（toC向けWebサービス3システムを担当。BFF構成のNext.js+Laravel、Laravel、自社フレームワークの3種。日常的な新規機能開発・保守業務に加えリアーキテクチャや新規サイト開発も担当）
- **Skills セクション**: カテゴリ別スキル表示（言語/フレームワーク・インフラ/クラウド・開発ツール）
- **Projects セクション**: 個人開発・自己学習の成果物をカード形式で表示。GitHubリンク付き。現時点では1件（multi-agent-shogun）、今後随時追加
  1. マルチエージェントAI開発環境（multi-agent-shogun）: Claude Code + 階層型マルチエージェント構成 + CoDD。Ollama/Gemini CLIをコスト最適化で組み込み。イベント駆動方式でAPI消費をゼロ化
- **Career セクション**: タイムライン形式の職歴（3社）
- **Contact セクション**: GitHub プロフィールリンク・メールアドレス表示

## Non-Functional Requirements

- Language: TypeScript
- Framework: Next.js 16 (App Router)
- Styling: Tailwind CSS
- Rendering: SSG（Static Site Generation）— ビルド時に静的ファイルを生成
- Deploy: Vercel 無料プラン
- Performance: next/image による画像最適化
- Responsive: モバイル（375px〜）・タブレット・PC 対応
- Accessibility: セマンティック HTML・alt テキスト設定
- SEO: title・meta description・OGP（og:title / og:description / og:image）設定
- Data: 外部DBなし。コンテンツはすべてコード内に静的記述

## Directory Structure

```
/
├── app/
│   ├── page.tsx           # トップページ（全セクション含む）
│   ├── layout.tsx         # 共通レイアウト
│   └── globals.css        # グローバルスタイル
├── components/
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Skills.tsx
│   ├── Projects.tsx
│   ├── SelfLearning.tsx
│   ├── Career.tsx
│   └── Contact.tsx
└── public/
    └── og-image.png       # OGP画像
```

## Out of Scope

- ブログ機能（Zenn記事との連携）
- ダークモード切り替え
- 日英切り替え
- APIルート・サーバーサイド処理（最小限）
- お問い合わせフォーム（将来的に Formspree 利用予定だが今回対象外）
- 外部データベース
