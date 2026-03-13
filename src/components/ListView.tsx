import type { Task } from '../types/task'
import { TaskCard } from './TaskCard'

interface Props {
  tasks: Task[]
  onTaskClick: (task: Task) => void
  onAddClick: () => void
}

export function ListView({ tasks, onTaskClick, onAddClick }: Props) {
  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-400">
        <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        <p className="text-lg font-medium mb-2">タスクがありません</p>
        <p className="text-sm mb-4">最初のタスクを作成しましょう</p>
        <button
          onClick={onAddClick}
          className="px-4 py-2 text-sm font-medium text-white bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors"
        >
          タスクを追加
        </button>
      </div>
    )
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {tasks.map(task => (
        <TaskCard key={task.id} task={task} onClick={onTaskClick} />
      ))}
    </div>
  )
}
