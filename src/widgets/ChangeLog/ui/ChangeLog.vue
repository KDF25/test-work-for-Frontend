<template>
  <v-card class="change-log-card">
    <v-card-title class="d-flex align-center justify-space-between">
      <span>Лента изменений</span>
      <v-btn
        v-if="entries.length > 0"
        @click="clearHistory"
        variant="text"
        size="small"
        color="error"
      >
        Очистить
      </v-btn>
    </v-card-title>
    
    <v-card-text>
      <v-list v-if="entries.length > 0" lines="two" class="change-log-list">
        <v-list-item
          v-for="entry in entries"
          :key="entry.id"
          class="change-log-item"
        >
          <template v-slot:prepend>
            <v-icon :color="getActionColor(entry.action)">
              {{ getActionIcon(entry.action) }}
            </v-icon>
          </template>
          
          <v-list-item-title>
            {{ getActionText(entry.action) }}
          </v-list-item-title>
          
          <v-list-item-subtitle>
            Задача: {{ truncateText(entry.taskTitle) }}
            <br>
            {{ formatDate(entry.timestamp) }}
          </v-list-item-subtitle>
        </v-list-item>
      </v-list>
      
      <div v-else class="text-center text-grey pa-4">
        История изменений пуста
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useChangeLogStore } from '@/entities/changeLog'
import { formatDate, truncateText } from '@/shared/lib'
import type { ChangeLogEntry } from '@/shared/types'

const changeLogStore = useChangeLogStore()
const { entries } = storeToRefs(changeLogStore)

const getActionText = (action: ChangeLogEntry['action']): string => {
  const actionMap = {
    created: 'Создана',
    completed: 'Завершена',
    uncompleted: 'Возобновлена',
    deleted: 'Удалена'
  }
  return actionMap[action]
}

const getActionIcon = (action: ChangeLogEntry['action']): string => {
  const iconMap = {
    created: 'mdi-plus-circle',
    completed: 'mdi-check-circle',
    uncompleted: 'mdi-restore',
    deleted: 'mdi-delete-circle'
  }
  return iconMap[action]
}

const getActionColor = (action: ChangeLogEntry['action']): string => {
  const colorMap = {
    created: 'success',
    completed: 'primary',
    uncompleted: 'warning',
    deleted: 'error'
  }
  return colorMap[action]
}

const clearHistory = () => {
  if (confirm('Вы уверены, что хотите очистить историю изменений?')) {
    changeLogStore.clearHistory()
  }
}
</script>

<style scoped>
.change-log-card {
  margin-top: 24px;
}

.change-log-list {
  max-height: 400px;
  overflow-y: auto;
}

.change-log-item {
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.change-log-item:last-child {
  border-bottom: none;
}
</style>
