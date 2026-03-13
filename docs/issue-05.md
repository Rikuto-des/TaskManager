# #5 [Story] ユーザーはタスクをフィルタリング・検索できる

- **State**: CLOSED
- **Labels**: user-story
- **Created**: 2026-03-13

---

## Why
**As** タスク管理者
**I want** タスクをステータスやキーワードで絞り込みたい
**So that** 必要なタスクを素早く見つけられるからだ

## Acceptance Criteria

```gherkin
Scenario: ステータスでフィルタリング
Given: 複数のステータスのタスクがある
When: フィルターで「In Progress」を選択した時
Then: In Progressのタスクのみ表示される
```

```gherkin
Scenario: キーワード検索
Given: タスク一覧が表示されている
When: 検索バーに「API」と入力した時
Then: タイトルに「API」を含むタスクのみ表示される
```

```gherkin
Scenario: フィルタークリア
Given: フィルターが適用されている
When: 「クリア」ボタンをクリックした時
Then: 全てのタスクが表示される
```

## Notes
- リアルタイム検索（デバウンス付き）
- フィルターとキーワード検索は併用可能
