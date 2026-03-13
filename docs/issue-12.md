# #12 [Story] ユーザーはキーボードショートカットで操作できる

- **State**: OPEN
- **Labels**: user-story
- **Created**: 2026-03-13

---

## Why
**As** タスク管理者
**I want** キーボードショートカットでタスクを操作したい
**So that** マウス操作なしで素早く作業できるからだ

## Acceptance Criteria

```gherkin
Scenario: ショートカットでタスク作成
Given: ダッシュボードが表示されている
When: 「N」キーを押した時
Then: タスク作成モーダルが開く
```

```gherkin
Scenario: ショートカットでビュー切替
Given: リストビューが表示されている
When: 「B」キーを押した時
Then: ボードビューに切り替わる
```

## Notes
- N: 新規作成, B: ボードビュー, L: リストビュー, /: 検索フォーカス
- モーダル内ではショートカット無効
