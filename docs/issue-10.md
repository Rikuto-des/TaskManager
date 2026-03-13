# #10 [Story] ユーザーはタスクをCSVでエクスポートできる

- **State**: OPEN
- **Labels**: user-story
- **Created**: 2026-03-13

---

## Why
**As** タスク管理者
**I want** タスク一覧をCSVでダウンロードしたい
**So that** スプレッドシートで分析や共有ができるからだ

## Acceptance Criteria

```gherkin
Scenario: CSVエクスポート
Given: タスクが登録されている
When: エクスポートボタンをクリックした時
Then: タイトル,説明,ステータス,ポイント,作成日のCSVがダウンロードされる
```

## Notes
- BOM付きUTF-8でExcel互換
- ファイル名: tasks_YYYY-MM-DD.csv
