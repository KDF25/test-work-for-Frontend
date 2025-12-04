import { defineStore } from 'pinia'
import { ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import type { ChangeLogEntry, Task } from '@/shared/types'
import { useLocalStorage } from '@/shared/lib'

const STORAGE_KEY = 'changeLog'

export const useChangeLogStore = defineStore('changeLog', () => {
    const storage = useLocalStorage<ChangeLogEntry[]>(STORAGE_KEY, [])

    // State
    const entries = ref<ChangeLogEntry[]>(storage.load())

    // Actions
    const addEntry = (action: ChangeLogEntry['action'], task: Task): void => {
        const entry: ChangeLogEntry = {
            id: uuidv4(),
            action,
            taskTitle: task.title,
            timestamp: new Date()
        }

        entries.value.unshift(entry) // Добавляем в начало для отображения последних изменений сверху
        saveEntries()
    }

    const logTaskCreated = (task: Task): void => {
        addEntry('created', task)
    }

    const logTaskCompleted = (task: Task): void => {
        addEntry('completed', task)
    }

    const logTaskUncompleted = (task: Task): void => {
        addEntry('uncompleted', task)
    }

    const logTaskDeleted = (task: Task): void => {
        addEntry('deleted', task)
    }

    const saveEntries = (): void => {
        storage.save(entries.value)
    }

    const clearHistory = (): void => {
        entries.value = []
        saveEntries()
    }

    return {
        // State
        entries,
        // Actions
        logTaskCreated,
        logTaskCompleted,
        logTaskUncompleted,
        logTaskDeleted,
        clearHistory
    }
})
