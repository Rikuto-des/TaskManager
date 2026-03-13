# #9 [Story] ユーザーはタスク数とポイントの統計を確認できる

- **State**: CLOSED
- **Labels**: user-story
- **Created**: 2026-03-13

---

## Why
**As** タスク管理者
**I want** ステータス別のタスク数とポイント合計を確認したい
**So that** イテレーションの進捗をベロシティとして把握できるからだ

## Acceptance Criteria

```gherkin
Scenario: 統計バーの表示
Given: 複数のタスクが登録されている
When: ダッシュボードを表示した時
Then: ステータスごとのタスク数とポイント合計が表示される
And: プログレスバーで進捗率が視覚化される
```

```gherkin
Scenario: ポイント集計
Given: CurrentBackLog に 3pt と 2pt のタスクがある
When: 統計を確認した時
Then: CurrentBackLog: 2件 / 5pt と表示される
```

## Notes
- ヘッダー下にコンパクトな統計バーを配置
- ベロシティ = Doneのポイント合計
