# #4 [Story] ユーザーはタスクを編集・削除できる

- **State**: CLOSED
- **Labels**: user-story
- **Created**: 2026-03-13

---

## Why
**As** タスク管理者
**I want** 既存のタスクを編集・削除したい
**So that** タスクの内容を最新に保てるからだ

## Acceptance Criteria

```gherkin
Scenario: タスクの編集
Given: タスク一覧に「API設計」がある
When: タスクカードをクリックした時
Then: タスク編集モーダルが表示される
And: 現在の値がフォームに入力されている
```

```gherkin
Scenario: タスクの更新保存
Given: タスク編集モーダルが表示されている
And: タイトルを「API設計v2」に変更した
When: 「保存」ボタンをクリックした時
Then: タスクの内容が更新される
And: 一覧に反映される
```

```gherkin
Scenario: タスクの削除
Given: タスク編集モーダルが表示されている
When: 「削除」ボタンをクリックした時
Then: 確認ダイアログが表示される
And: 「はい」を選択するとタスクが削除される
```

## Notes
- 削除は確認ダイアログ付き
