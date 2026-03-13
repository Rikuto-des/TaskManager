# #3 [Story] ユーザーはカンバンボードでタスクを管理できる

- **State**: CLOSED
- **Labels**: user-story
- **Created**: 2026-03-13

---

## Why
**As** タスク管理者
**I want** カンバンボード形式でタスクを視覚的に管理したい
**So that** ステータスごとの進捗を一目で把握できるからだ

## Acceptance Criteria

```gherkin
Scenario: カンバンボードの表示
Given: タスクが複数登録されている
When: ボードビューに切り替えた時
Then: Todo / In Progress / Done の3カラムが表示される
And: 各タスクが対応するカラムに配置される
```

```gherkin
Scenario: ドラッグ&ドロップでステータス変更
Given: カンバンボードが表示されている
And: 「API設計」がTodoカラムにある
When: 「API設計」をIn Progressカラムにドラッグした時
Then: タスクのステータスがIn Progressに更新される
And: カードがIn Progressカラムに移動する
```

## Notes
- ドラッグ&ドロップにはHTML5 DnD APIまたは軽量ライブラリを使用
- ビュー切替はリストビューとボードビューの2種類
