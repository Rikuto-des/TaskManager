# #7 [Story] ユーザーはタスクの優先度を設定できる

- **State**: OPEN
- **Labels**: user-story
- **Created**: 2026-03-13

---

## Why
**As** タスク管理者
**I want** タスクに優先度（高・中・低）を設定したい
**So that** 重要なタスクから取り組めるからだ

## Acceptance Criteria

```gherkin
Scenario: 優先度の設定
Given: タスク作成モーダルが表示されている
When: 優先度を「高」に設定して保存した時
Then: タスクカードに赤い優先度バッジが表示される
```

```gherkin
Scenario: 優先度でソート
Given: 複数の優先度のタスクがある
When: 一覧を表示した時
Then: 高→中→低の順でソートできる
```

## Notes
- 優先度: High / Medium / Low
- カードに色付きバッジで表示
