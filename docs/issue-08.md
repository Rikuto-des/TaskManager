# #8 [Story] ユーザーはタスクの期限を管理できる

- **State**: OPEN
- **Labels**: user-story
- **Created**: 2026-03-13

---

## Why
**As** タスク管理者
**I want** タスクに期限を設定したい
**So that** 締切を見逃さずに管理できるからだ

## Acceptance Criteria

```gherkin
Scenario: 期限の設定
Given: タスク作成/編集モーダルが表示されている
When: 期限日を設定して保存した時
Then: タスクカードに期限が表示される
```

```gherkin
Scenario: 期限切れの警告
Given: 期限が過ぎたタスクがある
When: 一覧を表示した時
Then: 期限切れタスクのカードが赤枠で強調される
```

## Notes
- date pickerはネイティブinput[type=date]でOK
- 期限切れ・今日・明日を色分け
