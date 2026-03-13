export type TaskStatus = 'todo' | 'in_progress' | 'done'
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
  todo: 'Todo',
  in_progress: 'In Progress',
  done: 'Done',
}

export const STATUS_COLORS: Record<TaskStatus, string> = {
  todo: 'bg-gray-100 text-gray-700',
  in_progress: 'bg-blue-100 text-blue-700',
  done: 'bg-green-100 text-green-700',
}
