import { ref } from 'vue'
import { useTaskStore } from '@/entities/task'
import { useChangeLogStore } from '@/entities/changeLog'

interface DeletionTimer {
    timerId: number
    timeLeft: number
}

export function useTaskActions() {
    const taskStore = useTaskStore()
    const changeLogStore = useChangeLogStore()

    const pendingDeletions = ref<Set<string>>(new Set())
    const deletionTimers = ref<Record<string, DeletionTimer>>({})

    const handleAddTask = (title: string): void => {
        const task = taskStore.addTask(title)
        if (task) {
            changeLogStore.logTaskCreated(task)
        }
    }

    const handleToggleTask = (id: string): void => {
        const taskBefore = taskStore.tasks.find(t => t.id === id)
        if (!taskBefore) return

        const wasCompleted = taskBefore.completed
        const task = taskStore.toggleTask(id)

        if (task) {
            if (task.completed && !wasCompleted) {
                changeLogStore.logTaskCompleted(task)
            } else if (!task.completed && wasCompleted) {
                changeLogStore.logTaskUncompleted(task)
            }
        }
    }

    const startDeletion = (id: string): void => {
        pendingDeletions.value.add(id)

        const timerId = window.setInterval(() => {
            if (deletionTimers.value[id]) {
                deletionTimers.value[id].timeLeft--

                if (deletionTimers.value[id].timeLeft <= 0) {
                    const task = taskStore.tasks.find(t => t.id === id)
                    if (task) {
                        changeLogStore.logTaskDeleted(task)
                        taskStore.deleteTask(id)
                    }

                    pendingDeletions.value.delete(id)

                    const timer = deletionTimers.value[id]
                    if (timer) {
                        clearInterval(timer.timerId)
                        delete deletionTimers.value[id]
                    }
                }
            }
        }, 1000)

        deletionTimers.value[id] = {
            timerId,
            timeLeft: 10
        }
    }

    const cancelDeletion = (id: string): void => {
        pendingDeletions.value.delete(id)

        const timer = deletionTimers.value[id]
        if (timer) {
            clearInterval(timer.timerId)
            delete deletionTimers.value[id]
        }
    }

    return {
        pendingDeletions,
        deletionTimers,
        handleAddTask,
        handleToggleTask,
        startDeletion,
        cancelDeletion
    }
}
