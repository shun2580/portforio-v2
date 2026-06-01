---
codd:
  node_id: governance:adr-tech-stack
  type: governance
  depends_on:
  - id: req:portforio-v2-requirements
    relation: derives_from
    semantic: governance
  depended_by:
  - id: design:system-overview
    relation: derives_from
    semantic: governance
  - id: infra:build-deploy
    relation: constrained_by
    semantic: governance
  conventions:
  - targets:
    - module:app
    reason: Next.js 16+ App Router with SSG is the mandated rendering strategy; server-side
      runtime (getServerSideProps, Route Handlers) is out of scope and prohibited.
  - targets:
    - infra:vercel
    reason: Deployment target is Vercel free plan; no paid-tier features (ISR beyond
      free limits, Edge Functions) may be relied upon.
  - targets:
    - module:app
    reason: TypeScript is the sole permitted language; JavaScript-only source files
      are prohibited.
  - targets:
    - module:app
    reason: No external database or API routes; all content must be statically embedded
      in TypeScript source at build time.
  modules:
  - app
---

# ADR-001: Technology Stack Selection

## 1. Overview

このドキュメントは、ポートフォリオサイト（portforio-v2）の技術スタック選定に関するアーキテクチャ決定を記録する。対象モジュールは `module:app` および `infra:vercel` であり、以下に示す選定結果はリリースブロッキング制約として扱われる。

### 対象システム

バックエンドエンジニア・西川駿のポートフォリオサイト。採用担当者・技術面接官への技術スキルと自走力のアピールを目的とするシングルページアプリケーション（SPA）。

### 選定スタック

| レイヤー | 選定技術 | バージョン / プラン |
|---|---|---|
| フレームワーク | Next.js App Router | 16 |
| 言語 | TypeScript | プロジェクト全体で統一 |
| スタイリング | Tailwind CSS | 最新安定版 |
| レンダリング | SSG（Static Site Generation） | ビルド時静的ファイル生成 |
| デプロイ | Vercel | 無料プラン |
| 画像最適化 | next/image | Next.js 組み込み |
| コンテンツ管理 | TypeScript ソース内静的記述 | 外部 DB なし |

### リリースブロッキング制約の明示

以下の制約はすべて非交渉事項であり、実装・レビュー・デプロイの各フェーズでこれらへの準拠を確認しなければならない。

1. **SSG 必須 / サーバーサイドランタイム禁止** (`module:app`): `getServerSideProps`、Route Handlers によるサーバーサイド処理は一切使用しない。すべてのページは `next build` 時に静的 HTML として生成される。
2. **Vercel 無料プランの範囲厳守** (`infra:vercel`): ISR（無料枠超過分）および Edge Functions は使用しない。ビルド成果物は純粋な静的アセットとして配信する。
3. **TypeScript 専用** (`module:app`): `.js` / `.jsx` 拡張子のソースファイルは禁止。`tsconfig.json` による厳格な型チェックを維持する。
4. **外部データソース禁止** (`module:app`): データベース接続、外部 API 呼び出しを行わない。Hero・About・Skills・Projects・SelfLearning・Career・Contact の全セクションのコンテンツは TypeScript ソースファイル内に静的に記述する。

---

## 2. Decision Log

### ADR-001-A: フレームワークとして Next.js 16+ App Router を採用

**ステータス**: 承認済み

**コンテキスト**:
ポートフォリオサイトは全コンテンツが静的であり、ランタイムでのデータ取得を必要としない。採用担当者・技術面接官が主なユーザーであり、初回表示速度・SEO・OGP 対応が評価指標に直結する。

**決定**:
Next.js 16 以上の App Router を採用し、`app/page.tsx` に全セクションを統合するシングルページ構成を取る。ディレクトリ構成は要件定義書に記載の通り:

```
/
├── app/
│   ├── page.tsx        # トップページ（全セクション含む）
│   ├── layout.tsx      # 共通レイアウト・メタデータ定義
│   └── globals.css     # グローバルスタイル
├── components/
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Skills.tsx
│   ├── Projects.tsx
│   ├── SelfLearning.tsx
│   ├── Career.tsx
│   └── Contact.tsx
└── public/
    └── og-image.png    # OGP画像
```

**帰結**:
- `app/` 配下のすべてのコンポーネントはデフォルトでサーバーコンポーネントとして扱われるが、ランタイム処理は行わない。
- ページはビルド時に静的 HTML へコンパイルされ、Vercel の静的ホスティング機能でサーブされる。
- `getServerSideProps`、`getStaticPaths` + `getStaticProps`（Pages Router のパターン）は使用しない。App Router の静的エクスポートパス（`output: 'export'` または標準 SSG）を採用する。

**却下した代替案**:
- **Astro**: 静的サイト向けに優れた選択肢だが、Next.js の知識・実績をアピールする目的から除外。
- **Create React App / Vite + React**: SEO・OGP 対応が標準では不十分なため除外。
- **Next.js Pages Router**: App Router の習熟度訴求のため App Router を優先。

---

### ADR-001-B: TypeScript をプロジェクト全体の唯一の言語として採用

**ステータス**: 承認済み

**コンテキスト**:
要件定義書の Non-Functional Requirements にて TypeScript が明示指定されている。技術面接官への訴求観点からも、型安全性を担保したコードベースを示す必要がある。

**決定**:
- すべてのソースファイルを `.ts` / `.tsx` 拡張子で記述する。
- `tsconfig.json` は `strict: true` を有効化し、暗黙的 any を禁止する。
- `.js` / `.jsx` ファイルの新規作成を CI / レビューで阻止する。

**帰結**:
- 設定ファイル（`next.config.ts`、`tailwind.config.ts`）も TypeScript で記述する。
- `@types/*` パッケージを適宜インストールし、外部ライブラリの型を保証する。

---

### ADR-001-C: Tailwind CSS をスタイリングエンジンとして採用

**ステータス**: 承認済み

**コンテキスト**:
ポートフォリオサイトはモバイル（375px〜）・タブレット・PC のレスポンシブ対応を必須とする。セマンティック HTML とアクセシビリティ対応も要件に含まれる。

**決定**:
Tailwind CSS を採用し、ユーティリティクラスベースのレスポンシブデザインを実装する。CSS Modules や styled-components は使用しない。

**帰結**:
- ブレークポイント: `sm`（640px）、`md`（768px）、`lg`（1024px）を基準とし、モバイルファーストで記述する。
- セマンティック HTML 要素（`<header>`, `<section>`, `<nav>`, `<article>`, `<footer>`）を使用し、`alt` 属性を全画像に設定する。

---

### ADR-001-D: コンテンツを TypeScript ソース内に静的記述

**ステータス**: 承認済み

**コンテキスト**:
要件定義書に「外部 DB なし。コンテンツはすべてコード内に静的記述」と明記されている。Vercel 無料プランの制約により外部データベース接続も禁止される。

**決定**:
Projects（3件）・Skills・Career（3社）・SelfLearning・Contact のすべてのコンテンツを TypeScript の定数・型付きオブジェクト配列として `components/` 内または専用の `data/` ディレクトリ配下のファイルに記述する。

コンテンツ例（Projects）:

```typescript
export const projects: Project[] = [
  {
    title: "既存ふるさと納税サイトのECS＋Laravelへのリアーキテクチャ推進",
    problem: "...",
    solution: "...",
    result: "...",
    tags: ["AWS ECS", "Laravel", "Docker"],
  },
  {
    title: "シリアルコード型ふるさと納税サイト・CMSの新規開発",
    problem: "...",
    solution: "...",
    result: "...",
    tags: ["Next.js", "Laravel", "BFF"],
  },
  {
    title: "開発環境のコンテナ化・標準化とDX向上",
    problem: "...",
    solution: "...",
    result: "...",
    tags: ["Docker", "Docker Compose"],
  },
];
```

**帰結**:
- CMS（Contentful、Sanity 等）は使用しない。
- ビルド時に外部ネットワークアクセスは不要。
- コンテンツ更新は TypeScript ファイルの編集と再デプロイで行う。

---

### ADR-001-E: SEO・OGP・パフォーマンス設計

**ステータス**: 承認済み

**コンテキスト**:
採用担当者が SNS でリンクをシェアする場面を想定し、OGP 対応が必要。次のメタデータを `app/layout.tsx` の `metadata` エクスポートで静的定義する。

**決定**:
Next.js 16 App Router の `Metadata` API を使用し、以下を `layout.tsx` に静的定義する:

- `title`: サイトタイトル
- `description`: meta description
- `openGraph.title`: og:title
- `openGraph.description`: og:description
- `openGraph.images`: `public/og-image.png` を参照

画像最適化は `next/image` を使用し、`width` / `height` を明示して累積レイアウトシフト（CLS）を防止する。

**帰結**:
- `public/og-image.png` をビルド成果物に含める。
- メタデータはすべてビルド時に静的 HTML へ埋め込まれるため、JavaScript 無効環境でもクローラーが取得可能。

---

## 3. Follow-ups

| # | 内容 | 担当 | 期限 / 条件 |
|---|---|---|---|
| F-001 | `tsconfig.json` に `strict: true` を設定し、`output: 'export'` または静的 SSG の動作を検証する | 実装担当 | 初期セットアップ時 |
| F-002 | Vercel デプロイ設定を確認し、Edge Functions・有料 ISR が有効化されていないことを本番デプロイ前にチェックする | 実装担当 | 初回デプロイ前 |
| F-003 | `public/og-image.png` を作成し、SNS シェア時の表示を確認する | 実装担当 | コンテンツ実装完了後 |
| F-004 | お問い合わせフォーム（Formspree 利用予定）は現スコープ外。将来追加する場合は SSG 制約・Vercel 無料プラン制約との適合性を本 ADR に追記してレビューを受ける | 実装担当 | スコープ追加時 |
| F-005 | CI に `.js` / `.jsx` ファイルの混入を検出するリントルール（例: `no-restricted-extensions`）を追加する | 実装担当 | CI 設定時 |
| F-006 | モバイル（375px）・タブレット・PC の各ブレークポイントでレイアウト崩れがないことをビルド後に目視確認する | 実装担当 | 各セクション実装後 |
