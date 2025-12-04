<template>
  <div class="filter-section">
    <v-btn 
      @click="setFilter('all')"
      :class="{ 'bg-primary': currentFilter === 'all' }"
      variant="tonal"
      class="filter-btn"
    >
      Все ({{ stats.total }})
    </v-btn>
    <v-btn 
      @click="setFilter('active')"
      :class="{ 'bg-primary': currentFilter === 'active' }"
      variant="tonal"
      class="filter-btn"
    >
      Активные ({{ stats.active }})
    </v-btn>
    <v-btn 
      @click="setFilter('completed')"
      :class="{ 'bg-primary': currentFilter === 'completed' }"
      variant="tonal"
      class="filter-btn"
    >
      Завершенные ({{ stats.completed }})
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useTaskStore } from '@/entities/task'
import type { TaskFilter } from '@/shared/types'

const taskStore = useTaskStore()
const { currentFilter, stats } = storeToRefs(taskStore)

const setFilter = (filter: TaskFilter) => {
  taskStore.setFilter(filter)
}
</script>

<style scoped>
.filter-section {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 16px;
}

.filter-btn {
  margin-right: 8px;
}

@media (max-width: 960px) {
  .filter-section {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .filter-btn {
    width: 100%;
    margin-bottom: 8px;
    margin-right: 0;
  }
}
</style>
