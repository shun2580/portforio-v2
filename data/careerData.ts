import type { CareerEntry } from './types';

export const careerData: CareerEntry[] = [
  {
    company: '自治体向けSaaS企業（社名非公開）',
    period: '2023年5月 〜 現在',
    role: 'バックエンドエンジニア',
    description:
      'PHP / Laravel / Next.js（App Router）を主軸としたWebサービスの新規開発・保守・インフラ構築を担当。ECS＋Laravelへのリアーキテクチャをメインエンジニアとして主導し、Next.js＋Laravel＋NginxのBFF構成による新規サービスをゼロから設計・構築。DevContainer導入やGitLab CIへのPint/PHPStan追加による開発環境・CI/CD整備もリード。SVNからGitLabへの移行・MRベースのコードレビュー運用も推進。',
  },
  {
    company: '株式会社アイエスエフネット',
    period: '2020年1月 〜 2023年4月',
    role: 'インフラエンジニア（SES・客先常駐）',
    description:
      'SES企業として客先に常駐し、WEBシステム・スマートフォンアプリの運用監視業務を8名チームのリーダーとして担当。ログ・リソース監視、障害一次対応・エスカレーションを実施。GASを用いたSlack Bot作成で業務効率化を推進し、Vue.jsを用いた教育システムの開発にも携わる。使用技術：Linux / Windows / AWS / GCP / MySQL / Datadog / Zabbix / Grafana。',
  },
  {
    company: '株式会社スギ薬局',
    period: '2016年4月 〜 2019年12月',
    role: '店長（薬局店舗経営・管理）',
    description:
      'スタッフ約27名の薬局店舗にて、2017年5月より店長として店舗経営全般を担当。年間売上約3.2億円の目標達成に向けた販売戦略立案・実行、社員7名・アルバイト約17名のシフト管理・人件費調整・定期面談を実施。この経験で培ったマネジメント視点と課題解決力を現在の開発業務に活かしている。',
  },
];
