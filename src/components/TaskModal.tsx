import { useState, useEffect } from 'react'
import type { Task, TaskStatus, TaskPoints } from '../types/task'
import { STATUS_LABELS } from '../types/task'

interface Props {
  task?: Task | null
  isOpen: boolean
  onClose: () => void
  onSave: (title: string, description: string, status: TaskStatus, points: TaskPoints) => void
  onDelete?: (id: string) => void
}

export function TaskModal({ task, isOpen, onClose, onSave, onDelete }: Props) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState<TaskStatus>('icebox')
  const [points, setPoints] = useState<TaskPoints>(1)
  const [error, setError] = useState('')
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  useEffect(() => {
    if (task) {
      setTitle(task.title)
      setDescription(task.description)
      setStatus(task.status)
      setPoints(task.points)
    } else {
      setTitle('')
      setDescription('')
      setStatus('icebox')
      setPoints(1)
    }
    setError('')
    setShowDeleteConfirm(false)
  }, [task, isOpen])

  if (!isOpen) return null

  const handleSave = () => {
    if (!title.trim()) {
      setError('タイトルは必須です')
      return
    }
    onSave(title.trim(), description.trim(), status, points)
    onClose()
  }

  const handleDelete = () => {
    if (showDeleteConfirm && task) {
      onDelete?.(task.id)
      onClose()
    } else {
      setShowDeleteConfirm(true)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md mx-4 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          {task ? 'タスクを編集' : 'タスクを追加'}
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">タイトル</label>
            <input
              type="text"
              value={title}
              onChange={e => { setTitle(e.target.value); setError('') }}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              placeholder="タスク名を入力"
              autoFocus
            />
            {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">説明</label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent resize-none"
              rows={3}
              placeholder="説明を入力（任意）"
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">ステータス</label>
              <select
                value={status}
                onChange={e => setStatus(e.target.value as TaskStatus)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              >
                {(Object.entries(STATUS_LABELS) as [TaskStatus, string][]).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">ポイント</label>
              <div className="flex gap-2">
                {([1, 2, 3] as TaskPoints[]).map(p => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPoints(p)}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                      points === p
                        ? 'bg-violet-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div>
            {task && onDelete && (
              <button
                onClick={handleDelete}
                className={`text-sm font-medium px-3 py-1.5 rounded-lg transition-colors ${
                  showDeleteConfirm
                    ? 'bg-red-600 text-white'
                    : 'text-red-600 hover:bg-red-50'
                }`}
              >
                {showDeleteConfirm ? '本当に削除する' : '削除'}
              </button>
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              キャンセル
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 text-sm font-medium text-white bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors"
            >
              保存
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
