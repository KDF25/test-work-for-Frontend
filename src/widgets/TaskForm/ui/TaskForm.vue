<template>
  <v-form @submit.prevent="onSubmit" class="task-form">
    <v-text-field
      v-model="taskTitle"
      label="Новая задача"
      :rules="[value => !!value?.trim() || 'Введите текст задачи']"
      variant="outlined"
      density="comfortable"
      @keyup.enter="onSubmit"
    />
    <v-btn 
      type="submit" 
      color="primary" 
      class="mt-2"
      :disabled="!taskTitle.trim()"
    >
      Добавить
    </v-btn>
  </v-form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useTaskActions } from '@/features/task-management'

const { handleAddTask } = useTaskActions()
const taskTitle = ref('')

const onSubmit = () => {
  if (taskTitle.value.trim()) {
    handleAddTask(taskTitle.value)
    taskTitle.value = ''
  }
}
</script>

<style scoped>
.task-form {
  margin-bottom: 24px;
}
</style>
