# #2 [Story] ユーザーは新しいタスクを作成できる

- **State**: CLOSED
- **Labels**: user-story
- **Created**: 2026-03-13

---

## Why
**As** タスク管理者
**I want** 新しいタスクを作成したい
**So that** やるべき作業を管理できるからだ

## Acceptance Criteria

```gherkin
Scenario: タスク作成フォームの表示
Given: ダッシュボードが表示されている
When: 「タスク追加」ボタンをクリックした時
Then: タスク作成モーダルが表示される
And: タイトル、説明、ステータス、ポイントの入力欄がある
```

```gherkin
Scenario: タスクの保存
Given: タスク作成モーダルが表示されている
And: タイトルに「API設計」と入力した
And: ポイントに「2」を選択した
When: 「保存」ボタンをクリックした時
Then: タスクが一覧に追加される
And: モーダルが閉じる
```

```gherkin
Scenario: バリデーション
Given: タスク作成モーダルが表示されている
And: タイトルが空のまま
When: 「保存」ボタンをクリックした時
Then: 「タイトルは必須です」というエラーが表示される
And: タスクは保存されない
```

## Notes
- ステータス: Todo / In Progress / Done
- ポイント: 1, 2, 3 の選択式
