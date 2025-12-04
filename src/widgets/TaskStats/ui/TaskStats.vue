<template>
  <v-card class="stats-card">
    <v-card-text>
      <p class="stat-item">Всего задач: <strong>{{ stats.total }}</strong></p>
      <p class="stat-item">Активных: <strong>{{ stats.active }}</strong></p>
      <p class="stat-item">Завершенных: <strong>{{ stats.completed }}</strong></p>
      <p class="stat-item">
        Процент завершения: <strong>{{ stats.percentage }}%</strong>
      </p>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useTaskStore } from '@/entities/task'

const taskStore = useTaskStore()
const { stats } = storeToRefs(taskStore)
</script>

<style scoped>
.stats-card {
  margin-top: 24px;
}

.stat-item {
  margin-bottom: 8px;
}

.stat-item:last-child {
  margin-bottom: 0;
}
</style>
