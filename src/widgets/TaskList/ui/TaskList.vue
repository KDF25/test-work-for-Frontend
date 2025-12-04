<template>
  <v-list lines="two" class="task-list elevation-1 rounded">
    <v-list-item 
      v-for="task in filteredTasks" 
      :key="task.id"
      class="task-item"
    >
      <template v-slot:prepend>
        <v-checkbox
          :model-value="task.completed"
          @update:model-value="handleToggleTask(task.id)"
          density="comfortable"
        />
      </template>
      
      <v-list-item-title 
        :class="{ 'text-decoration-line-through text-grey': task.completed }"
        class="font-weight-medium"
      >
        {{ task.title }}
      </v-list-item-title>
      <v-list-item-subtitle>
        Создано: {{ formatDate(task.createdAt) }}
        | Обновлено: {{ formatDate(task.updatedAt) }}
        <span v-if="task.completed">
          | Завершено: {{ formatDate(task.completedAt) }}
        </span>
      </v-list-item-subtitle>
      
      <template v-slot:append>
        <div v-if="pendingDeletions.has(task.id)" class="deletion-pending">
          <v-chip color="error" size="small" class="mr-2">
            Удаление через {{ deletionTimers[task.id]?.timeLeft || 10 }}
          </v-chip>
          <v-btn 
            @click="cancelDeletion(task.id)"
            variant="text"
            color="warning"
            size="small"
          >
            Отмена
          </v-btn>
        </div>
        <v-btn 
          v-else
          icon 
          @click="startDeletion(task.id)"
          variant="text"
          color="error"
          size="small"
        >
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-list-item>
  </v-list>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useTaskStore } from '@/entities/task'
import { useTaskActions } from '@/features/task-management'
import { formatDate } from '@/shared/lib'

const taskStore = useTaskStore()
const { filteredTasks } = storeToRefs(taskStore)

const { 
  pendingDeletions, 
  deletionTimers, 
  handleToggleTask, 
  startDeletion, 
  cancelDeletion 
} = useTaskActions()
</script>

<style scoped>
.task-list {
  margin-bottom: 16px;
}

.task-item {
  padding: 12px 16px;
}

.deletion-pending {
  display: flex;
  align-items: center;
}

.text-decoration-line-through {
  text-decoration: line-through;
}
</style>
