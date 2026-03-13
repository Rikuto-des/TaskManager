import { useState, useCallback, useMemo } from 'react'
import type { Task, TaskStatus, TaskPoints } from './types/task'
import { useTasks } from './hooks/useTasks'
import { useDarkMode } from './hooks/useDarkMode'
import { ListView } from './components/ListView'
import { BoardView } from './components/BoardView'
import { TaskModal } from './components/TaskModal'
import { SearchFilter } from './components/SearchFilter'
import { StatsBar } from './components/StatsBar'

type ViewMode = 'list' | 'board'
type SortKey = 'created_desc' | 'created_asc' | 'points_desc' | 'points_asc'

function App() {
  const { tasks, addTask, updateTask, deleteTask } = useTasks()
  const { dark, toggle: toggleDark } = useDarkMode()
  const [view, setView] = useState<ViewMode>('list')
  const [modalOpen, setModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [filterQuery, setFilterQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<TaskStatus | 'all'>('all')
  const [sortKey, setSortKey] = useState<SortKey>('created_desc')

  const handleFilterChange = useCallback((query: string, status: TaskStatus | 'all') => {
    setFilterQuery(query)
    setFilterStatus(status)
  }, [])

  const filteredTasks = useMemo(() => {
    const filtered = tasks.filter(t => {
      if (filterStatus !== 'all' && t.status !== filterStatus) return false
      if (filterQuery && !t.title.toLowerCase().includes(filterQuery.toLowerCase())) return false
      return true
    })

    return [...filtered].sort((a, b) => {
      switch (sortKey) {
        case 'created_desc': return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        case 'created_asc': return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        case 'points_desc': return b.points - a.points
        case 'points_asc': return a.points - b.points
      }
    })
  }, [tasks, filterQuery, filterStatus, sortKey])

  const handleTaskClick = (task: Task) => {
    setEditingTask(task)
    setModalOpen(true)
  }

  const handleAddClick = () => {
    setEditingTask(null)
    setModalOpen(true)
  }

  const handleSave = (title: string, description: string, status: TaskStatus, points: TaskPoints) => {
    if (editingTask) {
      updateTask(editingTask.id, { title, description, status, points })
    } else {
      addTask(title, description, status, points)
    }
  }

  const handleStatusChange = (id: string, status: TaskStatus) => {
    updateTask(id, { status })
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">TaskManager</h1>
          <div className="flex items-center gap-3">
            <button
              onClick={toggleDark}
              className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              title={dark ? 'ライトモード' : 'ダークモード'}
            >
              {dark ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
            <button
              onClick={handleAddClick}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              タスク追加
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 space-y-4">
        <StatsBar tasks={tasks} />

        <div className="flex flex-wrap items-center justify-between gap-4">
          <SearchFilter onFilterChange={handleFilterChange} />
          <div className="flex items-center gap-2 shrink-0">
            <select
              value={sortKey}
              onChange={e => setSortKey(e.target.value as SortKey)}
              className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
            >
              <option value="created_desc">作成日（新しい順）</option>
              <option value="created_asc">作成日（古い順）</option>
              <option value="points_desc">ポイント（降順）</option>
              <option value="points_asc">ポイント（昇順）</option>
            </select>
            <div className="flex bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
              <button
                onClick={() => setView('list')}
                className={`px-3 py-1.5 text-sm ${view === 'list' ? 'bg-violet-600 text-white' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
              >
                リスト
              </button>
              <button
                onClick={() => setView('board')}
                className={`px-3 py-1.5 text-sm ${view === 'board' ? 'bg-violet-600 text-white' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
              >
                ボード
              </button>
            </div>
          </div>
        </div>

        {view === 'list' ? (
          <ListView tasks={filteredTasks} onTaskClick={handleTaskClick} onAddClick={handleAddClick} />
        ) : (
          <BoardView tasks={filteredTasks} onTaskClick={handleTaskClick} onStatusChange={handleStatusChange} />
        )}
      </main>

      <TaskModal
        task={editingTask}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        onDelete={deleteTask}
      />
    </div>
  )
}

export default App
