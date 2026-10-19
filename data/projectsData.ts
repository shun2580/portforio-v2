import type { Project } from './types';

export const projectsData: Project[] = [
  {
    kind: 'work',
    title: 'ふるさと納税ポータルサイトの ECS＋Laravel リアーキテクチャ',
    period: '2025年10月〜2026年7月',
    overview:
      'EC2＋自社フレームワーク構成のポータルサイトを ECS＋Laravel へ全面移行。7名体制（アプリケーション側3名）の一員として、移行の実装と性能改善を担当。',
    problem:
      '自社フレームワークの制約でテストコードを書けず、保守性の低下とモダンな開発プロセスへの移行の難しさが課題だった。',
    solution:
      '自社フレームワークから Laravel への移行（テストコードを含む）と、セッションの Redis 化を担当。同期実行ではタイムアウトすると見込んだ画像保存処理に Redis ジョブキューを、Bot の過剰アクセスによる DB 負荷にマスターデータのキャッシュを、それぞれ提案・実装した。性能ログにクエリ数・DB I/O 比率・実行時間の計測を追加し、レビュー待ちの滞留に対しては一次レビュー担当を申し出て二段レビュー体制に変えた。',
    result:
      '2026年6月に本番リリース。約250万件の本番相当データで20〜30秒かかっていた検索を、計測で %LIKE% の全件走査が原因と特定し、FULLTEXT インデックス（ngram パーサ）の導入で数秒台に短縮。Elasticsearch は費用とリリース遅延のリスクから見送り、追加費用なしで解決した。同じ計測から、EagerLoad の宣言漏れによる N+1 も特定・修正した。',
    tags: ['PHP', 'Laravel', 'Redis', 'MySQL', 'AWS ECS', 'Docker'],
    githubUrl: '#',
  },
  {
    kind: 'work',
    title: '他社ふるさと納税サービスとの OEM 連携機能の新規開発',
    period: '2023年5月〜2023年11月',
    overview:
      '他社サービスの返礼品・自治体情報をポータルサイトに取り込む連携機能を、入社直後から設計・実装・テスト・クライアントとの仕様調整まで、ほぼ1人で担当。',
    problem:
      '掲載数を大きく増やす必要があったが、着手の1か月後に在籍していたエンジニアが退職し、実質1人で進める状況だった。',
    solution:
      '連携先の差分 CSV を30分ごとに取り込む定期バッチを実装。1,000件単位で処理し、失敗した単位だけを1件ずつの処理に切り替えて、不備のある行のみをスキップする方式を発案した。取得失敗・処理超過・ファイル残留は通知し、残留時は次回の処理を止めて手動確認を求める形にした。返礼品の増加で一覧表示が約10秒かかるようになったため、インデックス追加では効果が出ないことを確かめたうえで、一覧表示用のテーブルを差分同期する方式を設計した。',
    result:
      '入社半年でリリースし、掲載自治体数は約5倍、掲載返礼品数は約3倍（数百万件規模）に拡大。返礼品一覧の表示時間を約10秒から3〜4秒に短縮した。',
    tags: ['PHP', 'MySQL', 'バッチ処理', 'AWS S3'],
    githubUrl: '#',
  },
  {
    kind: 'work',
    title: 'ふるさと納税サイトの新規開発（Next.js＋Laravel の BFF 構成）',
    period: '2025年4月〜2025年9月',
    overview:
      '新規のふるさと納税サイトと管理 CMS を、PM との2名体制で立ち上げ。フロントエンド実装の多くと、インフラ・開発環境を担当。',
    problem:
      '新規プロダクトで、フロントとバックエンドが密結合にならない技術スタックとインフラ構成を、ゼロから決める必要があった。',
    solution:
      'PM の提案した BFF 構成（Next.js App Router＋Laravel）のもと、返礼品一覧・詳細、会員登録・ログイン、寄附申込、マイページなどを実装。複数画面に分けた寄附申込フローでは、Zustand で到達済みのステップを管理し、手順の飛ばしを防いだ。認証は Laravel Sanctum のアクセストークンと独自のリフレッシュトークンを組み合わせ、どちらも HttpOnly Cookie に保存する形で実装。画像は EFS のコスト課題に対し、CloudFront から S3 に接続する構成をインフラ担当と検討して採用した。バッチ基盤は Bref＋Lambda を検証したうえで、実行時間の上限がない ECS スケジュールタスクを選んだ。',
    result:
      '期間内にリリース。フロントとバックエンドを分離したことで、不具合の修正時に片方だけを対応できるようになり、反映時のヒューマンエラーが減った。S3＋CloudFront の構成は、後のリアーキテクチャでの静的配信にもつながった。',
    tags: ['Next.js', 'TypeScript', 'Laravel', 'AWS ECS', 'S3 / CloudFront', 'GitLab CI'],
    githubUrl: '#',
  },
  {
    kind: 'work',
    title: '開発環境の標準化と CI による品質チェック',
    period: '2025年10月〜2026年7月',
    overview:
      'リアーキテクチャの7名並行開発で表面化した環境差異を、環境そのものを配布する方針で解消。提案から構築・定着までを担当。',
    problem:
      'ローカル環境の差異による Pint の設定不整合やポート競合が開発のボトルネックになっており、個別に直しても人が増えるたびに再発していた。',
    solution:
      'DevContainer を提案・構築し、設定をコンテナ内に統一。ポート競合防止ツール「tug」を導入し、勉強会で全メンバーに定着させた。GitLab CI に Pint と PHPStan（レベル4）のジョブを追加し、警告があればマージできない形にした。',
    result:
      '新規メンバーの環境構築時間を、約半日から2〜3時間程度（目安）に短縮。フォーマットと静的解析のチェックを、個人の注意力ではなく CI で担保する形にした。',
    tags: ['DevContainer', 'Docker', 'GitLab CI', 'PHPStan'],
    githubUrl: '#',
  },
  {
    kind: 'work',
    title: '連携機能改修の仕様設計と、BDD を起点にした AI 活用開発',
    period: '2026年9月〜（進行中）',
    overview:
      '返礼品連携機能の改修で、CMS 側の事前取り込みと定期バッチ連携の仕様定義を担当（3名体制）。チームで試行している BDD を起点に、AI に任せる範囲を整理しながら進めている。',
    problem:
      '取り込み失敗時の調査や修正をベンダーが担う形では、運用者は復旧を待つしかない。また要望がディレクター経由で伝わる中でズレが生じ、確認段階で手戻りになるケースがあった。',
    solution:
      'システムが自動で直せる障害は人に触らせず、人の判断が必要な失敗には CMS から再取り込みできる手段を用意。通知メールに対象 ID・失敗箇所・理由を載せ、運用者が対処を判断できるようにした。決定事項を GitHub Copilot で Gherkin 形式に変換し、自分でレビューして担当分の BDD を作成。AI への指摘を記録して振り返り、AI に任せられる範囲と人が判断すべき範囲を整理した。',
    result:
      '2026年10月時点で、担当分の仕様定義と BDD 作成を完了。実装は、仕様の決定とレビューを人が担い、Claude Code で進める方針。',
    tags: ['Laravel', 'BDD (Gherkin)', 'GitHub Copilot', 'Claude Code'],
    githubUrl: '#',
  },
  {
    kind: 'personal',
    title: '情報収集・通知ツール「go-harvester」',
    period: '2026年6月〜2026年10月',
    overview:
      'Go を学ぶために作った常駐型の通知ツール。GitHub 通知と RSS を定期的に取得し、通知済みの項目を除いて ntfy に送る。学習目的のため、Claude にレクチャー役を頼み、解説・穴あきの手本・添削を受けながら自分でコードを書いた。',
    problem:
      'goroutine・channel・interface・テストといった Go の基本を、実際に使うものを作りながら身につけたかった。題材として、GitHub 通知や RSS を個別に確認する手間をなくすツールを選んだ。',
    solution:
      '取得・絞り込み・通知をインターフェースで分離し、各情報源の取得を goroutine で並列に実行して channel で結果を集める構成にした。time.Ticker で定期実行し、SIGINT / SIGTERM を受けたら実行中の見回りを終えてから止まるようにした。ntfy 通知・RSS 取得・重複除外のテストは httptest などで書いた。',
    result:
      '並列取得・重複除外・通知・定期実行・設定ファイルの読み込み・終了時の後始末までを実装して完成し、tmux で常駐させる手順も README にまとめた。次は、書いたコードを読み直して設計判断（channel で集約した理由、終了時の止まり方など）を自分の言葉で説明できるようにすることと、既読記録の永続化・GitHub 取得処理のテストに取り組む。',
    tags: ['Go', 'goroutine / channel', 'ntfy'],
    githubUrl: 'https://github.com/shun2580/go-harvester',
  },
  {
    kind: 'personal',
    title: 'remoteStorage CLI「rscli」',
    period: '2026年6月',
    overview:
      'remoteStorage プロトコル（draft-dejong-remotestorage-22）を操作する Go 製 CLI ツール。CoDD（整合性駆動開発）の使い方を確かめるため、要件定義書を自分で書き（CoDD からの質問への回答や文章の整理には Claude を使用）、設計から実装までを CoDD とマルチエージェント環境で生成した。',
    problem:
      'CoDD で要件定義から実装までがどう進むかを、実際に動くものを作って確かめたかった。題材には、remoteStorage 上のファイルをターミナルから操作・同期できるツールを選んだ。',
    solution:
      '生成された CLI は、WebFinger によるサーバー自動検出と OAuth2 + PKCE 認証に対応。push / pull でローカル→リモート、リモート→ローカルの双方向に同期でき、ETag と更新日時で変更を検出してコンフリクト時はスキップする。指数バックオフのリトライ、並列転送、同時実行を防ぐロックファイルも実装。GitHub Actions で go vet・ビルド・5 プラットフォームのクロスコンパイル確認を自動化し、タグを push すると各 OS 向けバイナリとチェックサムを GitHub Releases に公開する。',
    result:
      'v0.1.0 として Linux / macOS / Windows 向けバイナリを公開。CoDD が要件の不足を指摘し、生成と並行して要件を詰めていく流れを確認できた。生成されたコードの読解は、Go 学習の次の段階で行う。',
    tags: ['Go', 'CoDD', 'OAuth2 / PKCE', 'GitHub Actions', 'Docker'],
    githubUrl: 'https://github.com/shun2580/rstools',
  },
  {
    kind: 'personal',
    title: 'Chrome 拡張「Inline Paste for Claude」',
    period: '2026年8月',
    overview:
      'claude.ai で長文を貼り付けると添付ファイルに自動変換される挙動を回避し、編集できるテキストのまま入力欄に挿入する Chrome 拡張。仕様と要件を自分でまとめ、Claude による AI 支援を受けて開発し、Chrome Web Store で公開。',
    problem:
      'claude.ai では長文のペーストが自動で添付ファイルに変換され、テキストのまま入力欄に残して編集する選択肢がなかった。',
    solution:
      'window の capture フェーズで paste イベントを先取りし、サイト側の変換処理より前に介入。行ごとに段落ノードを組み立て、ページ上の TipTap エディタの insertContent で挿入する。挿入方式は execCommand などと実測で比較して決定。拡張機能の権限は要求せず外部通信も行わない。UI 変更でエディタを検出できない場合は何もせず、サイト本来の動作に戻るフェイルセーフ設計。',
    result:
      'Chrome Web Store で公開。実測で 10 万字を約 0.1 秒・文字の欠落なしで挿入できる（execCommand 方式では約 17.7 秒かかり、3,928 字が欠落した）。',
    tags: ['JavaScript', 'Chrome Extension', 'Manifest V3', 'TipTap'],
    githubUrl: 'https://github.com/shun2580/inline-paste-for-claude',
    storeUrl:
      'https://chromewebstore.google.com/detail/paste-guard-for-claude/pfdppngcicgihbapegahkcoajmdepiad',
  },
  {
    kind: 'personal',
    title: 'マルチエージェント AI 開発環境',
    period: '2026年5月〜',
    overview:
      'OSS の multi-agent-shogun（将軍・家老・軍師・足軽の階層型マルチエージェント）をフォークし、自分の開発環境向けにカスタマイズして日常的に運用。現在は 10 体すべてを Claude Code で稼働させている。',
    problem:
      'ローカル LLM を混ぜた旧構成では、エージェントが指示を正しく解釈できずに同じ処理をループし、手動でリセットする必要があった。また Claude Pro の 5 時間レート制限で作業が途中で止まっていた。',
    solution:
      'Claude Max プランに移行して全エージェントを Claude Code に統一（将軍 Opus／家老・軍師・足軽 5 体 Sonnet／軽作業用の足軽 2 体 Haiku）し、タスクの重さで振り分けるルールを明文化。通信のポーリングを inotifywait によるイベント駆動に変更し、起動前チェックや、作業中のエージェントを誤ってリセットしない監視処理を bats テスト付きで追加。CoDD 連携スキルで、自然言語の指示から要件定義→設計→実装→品質チェックまで流せるようにした。',
    result:
      '月額固定のサブスクリプション内で 10 体を並行稼働。ローカル LLM 起因のループと手動リセットは構成変更によりなくなった。',
    tags: ['Claude Code', 'Multi-Agent', 'CoDD', 'Bash', 'tmux'],
    githubUrl: 'https://github.com/shun2580/multi-agent-shogun',
  },
];
