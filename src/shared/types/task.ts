export interface Task {
    id: string
    title: string
    completed: boolean
    createdAt: Date
    updatedAt: Date
    completedAt: Date | null
}

export type TaskFilter = 'all' | 'active' | 'completed'

export interface ChangeLogEntry {
    id: string
    action: 'created' | 'completed' | 'uncompleted' | 'deleted'
    taskTitle: string
    timestamp: Date
}

export interface TaskStats {
    total: number
    active: number
    completed: number
    percentage: string
}
