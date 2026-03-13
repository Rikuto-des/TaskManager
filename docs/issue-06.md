# #6 [Story] ユーザーはダークモードで作業できる

- **State**: CLOSED
- **Labels**: user-story
- **Created**: 2026-03-13

---

## Why
**As** タスク管理者
**I want** ダークモードに切り替えたい
**So that** 夜間や暗い環境でも目に優しく作業できるからだ

## Acceptance Criteria

```gherkin
Scenario: ダークモードの切り替え
Given: ライトモードでアプリを使用している
When: ヘッダーのテーマ切替ボタンをクリックした時
Then: 全体がダークカラーに切り替わる
And: 設定がlocalStorageに保存される
```

```gherkin
Scenario: OS設定に追従
Given: 初回アクセス時
When: OSがダークモード設定の場合
Then: 自動的にダークモードで表示される
```

## Notes
- Tailwind dark mode を使用
- ユーザーの手動切替 > OS設定
