import { useState, useCallback, useMemo } from 'react'
import type { Task, TaskStatus, TaskPoints } from './types/task'
import { useTasks } from './hooks/useTasks'
import { ListView } from './components/ListView'
import { BoardView } from './components/BoardView'
import { TaskModal } from './components/TaskModal'
import { SearchFilter } from './components/SearchFilter'

type ViewMode = 'list' | 'board'

function App() {
  const { tasks, addTask, updateTask, deleteTask } = useTasks()
  const [view, setView] = useState<ViewMode>('list')
  const [modalOpen, setModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [filterQuery, setFilterQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<TaskStatus | 'all'>('all')

  const handleFilterChange = useCallback((query: string, status: TaskStatus | 'all') => {
    setFilterQuery(query)
    setFilterStatus(status)
  }, [])

  const filteredTasks = useMemo(() => {
    return tasks.filter(t => {
      if (filterStatus !== 'all' && t.status !== filterStatus) return false
      if (filterQuery && !t.title.toLowerCase().includes(filterQuery.toLowerCase())) return false
      return true
    })
  }, [tasks, filterQuery, filterStatus])

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

  const totalPoints = tasks.reduce((sum, t) => sum + t.points, 0)
  const donePoints = tasks.filter(t => t.status === 'done').reduce((sum, t) => sum + t.points, 0)

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">TaskManager</h1>
            <p className="text-xs text-gray-500 mt-0.5">
              {donePoints}/{totalPoints} pts completed
            </p>
          </div>
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
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 space-y-4">
        <div className="flex items-center justify-between gap-4">
          <SearchFilter onFilterChange={handleFilterChange} />
          <div className="flex bg-white border border-gray-300 rounded-lg overflow-hidden shrink-0">
            <button
              onClick={() => setView('list')}
              className={`px-3 py-1.5 text-sm ${view === 'list' ? 'bg-violet-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              リスト
            </button>
            <button
              onClick={() => setView('board')}
              className={`px-3 py-1.5 text-sm ${view === 'board' ? 'bg-violet-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              ボード
            </button>
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
