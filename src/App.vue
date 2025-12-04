<template>
  <v-app>
    <v-app-bar color="white" density="compact">
      <object
        class="logo ml-12 mr-4"
        data="https://storage.yandexcloud.net/forlogo/logo.svg" 
      />
      <v-app-bar-title>Управление задачами</v-app-bar-title>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <v-row>
          <v-col cols="12" md="8">
            <v-container>
              <v-row>
                <v-col cols="12">
                  <h1 class="text-h4 mb-4">Мои задачи</h1>
                  
                  <TaskFilters />
                  <TaskForm />
                  <TaskList />
                  <TaskStats />
                </v-col>
              </v-row>
            </v-container>
          </v-col>

          <v-col cols="12" md="4">
            <v-container>
              <ChangeLog />
            </v-container>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useTaskStore } from '@/entities/task'
import { TaskFilters } from '@/widgets/TaskFilters'
import { TaskForm } from '@/widgets/TaskForm'
import { TaskList } from '@/widgets/TaskList'
import { TaskStats } from '@/widgets/TaskStats'
import { ChangeLog } from '@/widgets/ChangeLog'

const taskStore = useTaskStore()

onMounted(() => {
  taskStore.loadInitialTasks()
})
</script>

<style scoped>
.logo {
  width: 50px;
  height: 50px;
}
</style>