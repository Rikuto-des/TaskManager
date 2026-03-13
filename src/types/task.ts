export type TaskStatus = 'icebox' | 'pre_ipm' | 'ipm' | 'current_backlog' | 'done'
export type TaskPoints = 1 | 2 | 3

export interface Task {
  id: string
  title: string
  description: string
  status: TaskStatus
  points: TaskPoints
  createdAt: string
}

export const STATUS_LABELS: Record<TaskStatus, string> = {
  icebox: 'IceBox',
  pre_ipm: 'PreIPM',
  ipm: 'IPM',
  current_backlog: 'CurrentBackLog',
  done: 'Done',
}

export const STATUS_COLORS: Record<TaskStatus, string> = {
  icebox: 'bg-gray-100 text-gray-700',
  pre_ipm: 'bg-yellow-100 text-yellow-700',
  ipm: 'bg-orange-100 text-orange-700',
  current_backlog: 'bg-blue-100 text-blue-700',
  done: 'bg-green-100 text-green-700',
}
