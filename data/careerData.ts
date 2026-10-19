import type { CareerEntry } from './types';

export const careerData: CareerEntry[] = [
  {
    company: 'ふるさと納税プラットフォームを展開する企業',
    period: '2023年5月 〜 現在',
    role: 'バックエンドエンジニア',
    description:
      'PHP / Laravel を主軸に、ふるさと納税ポータルサイトと管理 CMS の開発・保守を担当。入社直後に他社サービスとの OEM 連携機能をほぼ1人でリリースし、その後は ECS＋Laravel へのリアーキテクチャ、Next.js＋Laravel の BFF 構成での新規サイト開発、決済機能の追加や不正検知サービスの導入などを手がける。DevContainer による開発環境の標準化と、GitLab CI への Pint / PHPStan の導入を主導。',
  },
  {
    company: 'ITインフラ企業',
    period: '2020年1月 〜 2023年4月',
    role: 'インフラエンジニア（客先常駐・監視チームリーダー）',
    description:
      '客先常駐で、AWS / GCP 環境やデータセンターのサーバ・ネットワークの運用監視に従事し、8名チームのリーダーを担当。ログ・リソース監視、障害一次対応・エスカレーションのほか、既存 Slack Bot（GAS）の改修・保守や、Vue.js を用いた社内教育システム開発への参画（のち保守・機能追加）を担当。使用技術：Linux / AWS / GCP / MySQL / Datadog / Zabbix / Grafana。',
  },
  {
    company: 'ドラッグストアチェーン',
    period: '2016年4月 〜 2019年12月',
    role: '店長（薬局店舗経営・管理）',
    // TODO(shun): 「年間売上約3.2億円の店舗目標に向けた」は、目標を達成したのか不明。達成していれば「達成」と書く
    description:
      '2017年5月より店長として、約27名のスタッフが働く薬局店舗の経営・管理を担当。年間売上約3.2億円の店舗目標に向けた販売戦略の立案・実行、シフト管理・人件費調整・定期面談を実施。',
  },
];
