import type { Task, TaskStatus } from '../types/task'
import { STATUS_LABELS } from '../types/task'
import { TaskCard } from './TaskCard'
import { useState } from 'react'

const COLUMNS: TaskStatus[] = ['todo', 'in_progress', 'done']

const COLUMN_STYLES: Record<TaskStatus, string> = {
  todo: 'border-t-gray-400',
  in_progress: 'border-t-blue-500',
  done: 'border-t-green-500',
}

interface Props {
  tasks: Task[]
  onTaskClick: (task: Task) => void
  onStatusChange: (id: string, status: TaskStatus) => void
}

export function BoardView({ tasks, onTaskClick, onStatusChange }: Props) {
  const [dragOverColumn, setDragOverColumn] = useState<TaskStatus | null>(null)

  const handleDragStart = (e: React.DragEvent, task: Task) => {
    e.dataTransfer.setData('text/plain', task.id)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e: React.DragEvent, status: TaskStatus) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    setDragOverColumn(status)
  }

  const handleDragLeave = () => {
    setDragOverColumn(null)
  }

  const handleDrop = (e: React.DragEvent, status: TaskStatus) => {
    e.preventDefault()
    const taskId = e.dataTransfer.getData('text/plain')
    onStatusChange(taskId, status)
    setDragOverColumn(null)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {COLUMNS.map(status => {
        const columnTasks = tasks.filter(t => t.status === status)
        return (
          <div
            key={status}
            className={`bg-gray-50 rounded-lg border-t-4 ${COLUMN_STYLES[status]} transition-colors ${
              dragOverColumn === status ? 'bg-violet-50' : ''
            }`}
            onDragOver={e => handleDragOver(e, status)}
            onDragLeave={handleDragLeave}
            onDrop={e => handleDrop(e, status)}
          >
            <div className="p-3 flex items-center justify-between">
              <h3 className="font-semibold text-sm text-gray-700">{STATUS_LABELS[status]}</h3>
              <span className="text-xs text-gray-400 bg-white px-2 py-0.5 rounded-full">
                {columnTasks.length}
              </span>
            </div>
            <div className="p-2 space-y-2 min-h-[120px]">
              {columnTasks.map(task => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onClick={onTaskClick}
                  draggable
                  onDragStart={handleDragStart}
                />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
