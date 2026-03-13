# GithubBacklog - GitHub Projects によるバックログ管理

TrackerBoot から GitHub Projects + Issues へバックログ管理を移行するためのリポジトリです。

## 背景

これまでバックログ管理に TrackerBoot を使用していましたが、以下の理由から GitHub Projects への移行を検討しています。

- **MCP 連携の精度**: TrackerBoot の MCP はデータを丸めたり要約してしまうが、GitHub MCP はフルデータを返すため正確
- **ツール統合**: コードとバックログを GitHub に一元管理できる
- **権限管理**: 開発者はコード + Issues、デザイナー・マネージャーは Issues / Projects のみ（Triage ロール）

## ワークフロー

TrackerBoot のワークフローを GitHub Projects のカスタムステータスで再現しています。

```
IceBox → PreIPM → IPM → CurrentBackLog → Done
```

| ステータス | 説明 |
|---|---|
| **IceBox** | アイデア段階。優先度未定のストーリー |
| **PreIPM** | IPM 前の準備。ストーリーの詳細化・見積もり |
| **IPM** | Iteration Planning Meeting。チームで合意形成 |
| **CurrentBackLog** | 現在のイテレーションで実装するストーリー |
| **Done** | 完了 |

## Issue テンプレート（User Story）

Issue は User Story 形式のテンプレートで作成します。

- **Persona** - 対象ユーザー
- **Why** - As / I want / So that 形式の動機
- **Acceptance Criteria** - Gherkin 形式（Given / When / Then）の受け入れ基準
- **Notes** - 補足事項

## ストーリーポイント

GitHub Projects の `Story Points`（NUMBER フィールド）で管理します。

| ポイント | 目安 |
|---|---|
| 1 | 小規模。1日以内で完了 |
| 2 | 中規模。2〜3日程度 |
| 3 | 大規模。それ以上かかる見込み |

Insights の「Sum of Story Points」でベロシティを可視化できます。

## プロジェクト構成

```
.github/
  ISSUE_TEMPLATE/
    user_story.yml    # User Story テンプレート
    config.yml        # Issue テンプレート設定
docs/
  issue-*.md          # 作成済み Issue のドキュメント
src/                  # TaskManager アプリ（React + Vite + Tailwind）
```

## 権限設計

| ロール | コード | Issues / Projects |
|---|---|---|
| 開発者 | Write | 編集可 |
| デザイナー・マネージャー | Read（Triage） | 編集可 |

Triage ロールを付与することで、コードへの push 権限なしに Issues と Projects の操作が可能です。

## リンク

- [GitHub Project](https://github.com/users/Rikuto-des/projects/3)
