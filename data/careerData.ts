import type { CareerEntry } from './types';

export const careerData: CareerEntry[] = [
  {
    company: 'シフトプラス株式会社',
    period: '2023年5月 〜 現在',
    role: 'バックエンドエンジニア',
    description:
      '自治体向けふるさと納税管理システムの開発・運用。既存サイトのECS＋Laravelへのリアーキテクチャを主担当として推進。Next.js（App Router）＋Laravel＋NginxのBFF構成による新規サイトをゼロから設計・構築。DevContainer導入やGitLab CIへのPint/PHPStan追加など、開発環境・CI/CD整備をリード。SVNからGitLabへの移行も推進し、MRベースのコードレビュー運用を整備。',
  },
  {
    company: '株式会社アイエスエフネット',
    period: '2020年1月 〜 2023年4月',
    role: 'インフラエンジニア（データセンター運用監視）',
    description:
      'データセンターの運用監視業務に8名チームのリーダーとして従事。サーバ・ネットワークのログ・リソース監視、障害一次対応・エスカレーションを担当。GASを用いたSlack Bot作成で業務効率化を推進。Vue.jsを用いた教育システムの開発にも携わる。使用技術：Linux / Windows / AWS / GCP / MySQL / Datadog / Zabbix / Grafana。',
  },
  {
    company: '株式会社スギ薬局',
    period: '2016年4月 〜 2019年12月',
    role: '店長（薬局店舗経営・管理）',
    description:
      'スタッフ約27名の薬局店舗にて、2017年5月より店長として店舗経営全般を担当。年間売上約3.2億円の目標達成に向けた販売戦略立案・実行、社員7名・アルバイト約17名のシフト管理・人件費調整・定期面談を実施。この経験で培ったマネジメント視点と課題解決力を現在の開発業務に活かしている。',
  },
];
