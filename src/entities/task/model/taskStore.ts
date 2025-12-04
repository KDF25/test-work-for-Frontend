import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import type { Task, TaskFilter, TaskStats } from '@/shared/types'
import { useLocalStorage } from '@/shared/lib'

const STORAGE_KEY = 'tasks'

export const useTaskStore = defineStore('task', () => {
    const storage = useLocalStorage<Task[]>(STORAGE_KEY, [])

    // State
    const tasks = ref<Task[]>(storage.load())
    const currentFilter = ref<TaskFilter>('all')

    // Getters
    const filteredTasks = computed(() => {
        switch (currentFilter.value) {
            case 'active':
                return tasks.value.filter(t => !t.completed)
            case 'completed':
                return tasks.value.filter(t => t.completed)
            default:
                return tasks.value
        }
    })

    const stats = computed<TaskStats>(() => {
        const total = tasks.value.length
        const active = tasks.value.filter(t => !t.completed).length
        const completed = tasks.value.filter(t => t.completed).length
        const percentage = total > 0 ? ((completed / total) * 100).toFixed(1) : '0'
        return { total, active, completed, percentage }
    })

    // Actions
    const addTask = (title: string): Task | null => {
        const trimmedTitle = title.trim()
        if (!trimmedTitle) return null

        const newTask: Task = {
            id: uuidv4(),
            title: trimmedTitle,
            completed: false,
            createdAt: new Date(),
            updatedAt: new Date(),
            completedAt: null
        }

        tasks.value.push(newTask)
        saveTasks()
        return newTask
    }

    const toggleTask = (id: string): Task | null => {
        const task = tasks.value.find(t => t.id === id)
        if (!task) return null

        task.completed = !task.completed
        task.updatedAt = new Date()
        task.completedAt = task.completed ? new Date() : null

        saveTasks()
        return task
    }

    const deleteTask = (id: string): Task | null => {
        const taskIndex = tasks.value.findIndex(t => t.id === id)
        if (taskIndex === -1) return null

        const deletedTask = tasks.value[taskIndex] || null
        tasks.value.splice(taskIndex, 1)
        saveTasks()
        return deletedTask
    }

    const setFilter = (filter: TaskFilter): void => {
        currentFilter.value = filter
    }

    const saveTasks = (): void => {
        storage.save(tasks.value)
    }

    const loadInitialTasks = (): void => {
        if (tasks.value.length === 0) {
            // Загружаем демо-данные только если нет сохранённых задач
            tasks.value = [
                {
                    id: uuidv4(),
                    title: 'Изучить Vue 3 Composition API',
                    completed: true,
                    createdAt: new Date('2024-01-15'),
                    updatedAt: new Date('2024-01-20'),
                    completedAt: new Date('2024-01-20')
                },
                {
                    id: uuidv4(),
                    title: 'Написать тестовое задание',
                    completed: false,
                    createdAt: new Date('2024-02-01'),
                    updatedAt: new Date('2024-02-01'),
                    completedAt: null
                },
                {
                    id: uuidv4(),
                    title: 'Рефакторинг legacy кода',
                    completed: false,
                    createdAt: new Date('2024-02-10'),
                    updatedAt: new Date('2024-02-10'),
                    completedAt: null
                },
                {
                    id: uuidv4(),
                    title: 'Изучить Pinia и лучшие практики',
                    completed: true,
                    createdAt: new Date('2024-01-25'),
                    updatedAt: new Date('2024-01-30'),
                    completedAt: new Date('2024-01-30')
                }
            ]
            saveTasks()
        }
    }

    return {
        // State
        tasks,
        currentFilter,
        // Getters
        filteredTasks,
        stats,
        // Actions
        addTask,
        toggleTask,
        deleteTask,
        setFilter,
        loadInitialTasks
    }
})
