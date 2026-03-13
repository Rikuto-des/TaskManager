# #1 [Story] ユーザーはタスク一覧を確認できる

- **State**: CLOSED
- **Labels**: user-story
- **Created**: 2026-03-13

---

## Why
**As** タスク管理者
**I want** 登録されたタスクの一覧を確認したい
**So that** 現在の作業状況を把握できるからだ

## Acceptance Criteria

```gherkin
Scenario: タスク一覧の表示
Given: アプリを開いた時
When: ダッシュボードページが表示される
Then: 登録済みのタスクがカード形式で一覧表示される
And: 各タスクにはタイトル、ステータス、ポイントが表示される
```

```gherkin
Scenario: タスクが0件の場合
Given: タスクが1つも登録されていない
When: ダッシュボードを表示した時
Then: 「タスクがありません」というメッセージが表示される
And: タスク作成ボタンが表示される
```

## Notes
- ローカルステートで管理（localStorage使用）
- レスポンシブ対応
