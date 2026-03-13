# #13 [Story] ユーザーはタスクの並び替えができる

- **State**: CLOSED
- **Labels**: user-story
- **Created**: 2026-03-13

---

## Why
**As** タスク管理者
**I want** タスクをポイント順や作成日順で並び替えたい
**So that** 見たい順序でタスクを確認できるからだ

## Acceptance Criteria

```gherkin
Scenario: ポイント順でソート
Given: タスク一覧が表示されている
When: ソートで「ポイント（降順）」を選択した時
Then: ポイントが大きい順にタスクが並ぶ
```

```gherkin
Scenario: 作成日順でソート
Given: タスク一覧が表示されている
When: ソートで「作成日（新しい順）」を選択した時
Then: 新しく作成されたタスクが上に表示される
```

## Notes
- ソートオプション: ポイント昇順/降順, 作成日新しい/古い順
- ソート状態はビュー切替後も維持
