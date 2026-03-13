import { useState, useEffect, useCallback } from 'react'
import type { Task, TaskStatus, TaskPoints } from '../types/task'

const STORAGE_KEY = 'taskmanager-tasks'

function loadTasks(): Task[] {
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored ? JSON.parse(stored) : []
}

function saveTasks(tasks: Task[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(loadTasks)

  useEffect(() => {
    saveTasks(tasks)
  }, [tasks])

  const addTask = useCallback((title: string, description: string, status: TaskStatus, points: TaskPoints) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      description,
      status,
      points,
      createdAt: new Date().toISOString(),
    }
    setTasks(prev => [newTask, ...prev])
  }, [])

  const updateTask = useCallback((id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t))
  }, [])

  const deleteTask = useCallback((id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id))
  }, [])

  return { tasks, addTask, updateTask, deleteTask }
}
