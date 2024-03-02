<script setup>
import { onMounted, provide, ref } from 'vue'
import HeaderMenu from './components/HeaderMenu.vue'
import TableMain from './components/TableMain.vue'

// const tasks = ref([])
const dates = ref([])
const statuses = ref([])
const allTasks = ref([])
const statusTasks = ref(false)




function saveStatusesTasksOnLocalStorage() {
  localStorage.setItem('statusTasks', JSON.stringify(statusTasks.value))
}

function getStatusesTasksOnLocalStorage() {
  const data = JSON.parse(localStorage.getItem('statusTasks'))

  statusTasks.value = data
}

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
// saveStatusesOnLocalStorage()
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

function isStatuses() {
  if (statuses.value.length == 0) {
    statusTasks.value = false
    localStorage.setItem('statusTasks', JSON.stringify(statusTasks.value))
  } else {
    statusTasks.value = true
    localStorage.setItem('statusTasks', JSON.stringify(statusTasks.value))
  }
}

onMounted(() => {
  getTasksOnLocalStorage()
  getDatesOnLocalStorage()
  getStatusesOnLocalStorage()
  getStatusesTasksOnLocalStorage()
  isStatuses()
})

provide('dates', dates)
provide('statuses', statuses)
provide('allTasks', allTasks)
provide('statusTasks', statusTasks)

provide('LocalStorogeFunc', {
  getTasksOnLocalStorage,
  saveAllTasksOnLocalStorage,
  saveDatesOnLocalStorage,
  getDatesOnLocalStorage,
  saveStatusesOnLocalStorage,
  getStatusesOnLocalStorage,
  saveStatusesTasksOnLocalStorage,
  getStatusesTasksOnLocalStorage
})



</script>

<template>
  <div class="wrapper w-11/12 mx-auto">
    <HeaderMenu class="mb-8" :dates='dates' :statuses='statuses' />
    <TableMain :dates='dates' :statuses='statuses' />
  </div>
</template>

