<script setup>
import { onMounted, provide, ref } from 'vue'
import HeaderMenu from './components/HeaderMenu.vue'
import TableMain from './components/TableMain.vue'

const tasks = ref([])
const dates = ref([])
const statuses = ref([])
const allTasks = ref([])


function saveStatusesOnLocalStorage() {
  localStorage.setItem('statuses', JSON.stringify(statuses.value))
}

function getStatusesOnLocalStorage() {
  const data = JSON.parse(localStorage.getItem('statuses'))

  if (data == []) {
    statuses.value = []
  } else {
    statuses.value = data
  }
}


function saveAllTasksOnLocalStorage() {
  localStorage.setItem('allTasks', JSON.stringify(allTasks.value))
}

function getTasksOnLocalStorage() {
  const data = JSON.parse(localStorage.getItem('allTasks'))

  if (data == []) {
    allTasks.value = []
  } else {
    allTasks.value = data
  }
}

function saveDatesOnLocalStorage() {
  localStorage.setItem('dates', JSON.stringify(dates.value))
}

// saveAllTasksOnLocalStorage()
// saveDatesOnLocalStorage()


function getDatesOnLocalStorage() {
  const data = JSON.parse(localStorage.getItem('dates'))

  if (data == []) {
    return dates.value = []
  } else {
    return dates.value = data
  }
}

onMounted(() => {
  getTasksOnLocalStorage()
  getDatesOnLocalStorage()
  getStatusesOnLocalStorage()
})

provide('tasks', tasks)
provide('dates', dates)
provide('statuses', statuses)
provide('allTasks', allTasks)


provide('LocalStorogeFunc', {
  getTasksOnLocalStorage,
  saveAllTasksOnLocalStorage,
  saveDatesOnLocalStorage,
  getDatesOnLocalStorage,
  saveStatusesOnLocalStorage,
  getStatusesOnLocalStorage
})



</script>

<template>
  <div class="wrapper w-11/12 mx-auto">
    <HeaderMenu class="mb-8" :tasks='tasks' :dates='dates' :statuses='statuses' />
    <TableMain :dates='dates' :statuses='statuses' />
  </div>
</template>

