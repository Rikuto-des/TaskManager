import type { Task } from '../types/task'
import { STATUS_LABELS, STATUS_COLORS } from '../types/task'

interface Props {
  task: Task
  onClick: (task: Task) => void
  draggable?: boolean
  onDragStart?: (e: React.DragEvent, task: Task) => void
}

export function TaskCard({ task, onClick, draggable, onDragStart }: Props) {
  return (
    <div
      className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => onClick(task)}
      draggable={draggable}
      onDragStart={e => onDragStart?.(e, task)}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-medium text-gray-900 dark:text-gray-100 text-sm">{task.title}</h3>
        <span className="shrink-0 inline-flex items-center justify-center w-6 h-6 rounded-full bg-violet-100 text-violet-700 text-xs font-bold">
          {task.points}
        </span>
      </div>
      {task.description && (
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 line-clamp-2">{task.description}</p>
      )}
      <div className="mt-3">
        <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded ${STATUS_COLORS[task.status]}`}>
          {STATUS_LABELS[task.status]}
        </span>
      </div>
    </div>
  )
}
