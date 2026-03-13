import { useState, useEffect } from 'react'
import type { TaskStatus } from '../types/task'
import { STATUS_LABELS } from '../types/task'

interface Props {
  onFilterChange: (query: string, status: TaskStatus | 'all') => void
}

export function SearchFilter({ onFilterChange }: Props) {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<TaskStatus | 'all'>('all')

  useEffect(() => {
    const timer = setTimeout(() => {
      onFilterChange(query, status)
    }, 200)
    return () => clearTimeout(timer)
  }, [query, status, onFilterChange])

  const handleClear = () => {
    setQuery('')
    setStatus('all')
  }

  const hasFilter = query !== '' || status !== 'all'

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="relative flex-1 min-w-[200px]">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="タスクを検索..."
          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
        />
      </div>

      <select
        value={status}
        onChange={e => setStatus(e.target.value as TaskStatus | 'all')}
        className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
      >
        <option value="all">すべてのステータス</option>
        {(Object.entries(STATUS_LABELS) as [TaskStatus, string][]).map(([key, label]) => (
          <option key={key} value={key}>{label}</option>
        ))}
      </select>

      {hasFilter && (
        <button
          onClick={handleClear}
          className="text-sm text-gray-500 hover:text-gray-700 px-2 py-1"
        >
          クリア
        </button>
      )}
    </div>
  )
}
