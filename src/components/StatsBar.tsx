import type { Task } from '../types/task'
import { STATUS_LABELS, STATUS_COLORS } from '../types/task'
import type { TaskStatus } from '../types/task'

interface Props {
  tasks: Task[]
}

const BAR_COLORS: Record<TaskStatus, string> = {
  icebox: 'bg-gray-400',
  pre_ipm: 'bg-yellow-400',
  ipm: 'bg-orange-400',
  current_backlog: 'bg-blue-500',
  done: 'bg-green-500',
}

export function StatsBar({ tasks }: Props) {
  const totalPoints = tasks.reduce((sum, t) => sum + t.points, 0)
  if (totalPoints === 0) return null

  const statuses: TaskStatus[] = ['icebox', 'pre_ipm', 'ipm', 'current_backlog', 'done']

  const stats = statuses.map(status => {
    const statusTasks = tasks.filter(t => t.status === status)
    const points = statusTasks.reduce((sum, t) => sum + t.points, 0)
    return { status, count: statusTasks.length, points }
  }).filter(s => s.count > 0)

  const donePoints = tasks.filter(t => t.status === 'done').reduce((sum, t) => sum + t.points, 0)
  const velocity = Math.round((donePoints / totalPoints) * 100)

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Velocity: {donePoints}/{totalPoints} pts ({velocity}%)
        </span>
      </div>
      <div className="flex h-3 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
        {stats.map(({ status, points }) => (
          <div
            key={status}
            className={`${BAR_COLORS[status]} transition-all`}
            style={{ width: `${(points / totalPoints) * 100}%` }}
            title={`${STATUS_LABELS[status]}: ${points}pt`}
          />
        ))}
      </div>
      <div className="flex flex-wrap gap-3 mt-2">
        {stats.map(({ status, count, points }) => (
          <span key={status} className="text-xs text-gray-500 dark:text-gray-400">
            <span className={`inline-block w-2 h-2 rounded-full ${BAR_COLORS[status]} mr-1`} />
            {STATUS_LABELS[status]}: {count}件 / {points}pt
          </span>
        ))}
      </div>
    </div>
  )
}
