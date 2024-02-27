<script setup>
import axios from 'axios'
import { onMounted, provide, ref } from 'vue'
import HeaderMenu from './components/HeaderMenu.vue'
import TableMain from './components/TableMain.vue'

const tasks = ref([])
const dates = ref([])
const statuses = ref([])
const allTasks = ref([])


async function getTasks() { // Получаем все задачи
  try {
    const { data } = await axios.get('https://cf2bd04fe3eff35b.mokky.dev/tasks')
    if (data) {
      tasks.value = data
    }
  } catch (err) {
    console.log(err)
  }
}

async function getDates() { // Получаем все даты
  try {
    const { data } = await axios.get('https://cf2bd04fe3eff35b.mokky.dev/dates')
    if (data) {
      dates.value = data
    }
  } catch (err) {
    console.log(err)
  }
}

async function getStatuses() { // Получаем все статусы
  try {
    const { data } = await axios.get('https://cf2bd04fe3eff35b.mokky.dev/statuses')
    if (data) {
      statuses.value = data
    }
  } catch (err) {
    console.log(err)
  }
}

async function getAllTasks() { // Получаем все 
  try {
    const { data } = await axios.get('https://cf2bd04fe3eff35b.mokky.dev/allTasks')
    if (data) {
      allTasks.value = data
    }
  } catch (err) {
    console.log(err)
  }
}



onMounted(() => {
  getTasks()
  getDates()
  getStatuses()
  getAllTasks()
})

// fullTask.value = [{
//   id: 221,
//   task: 'Task1',
//   date: '21.02.2024',
//   status: 'Work'
// }]

provide('tasks', tasks)
provide('dates', dates)
provide('statuses', statuses)
provide('allTasks', allTasks)



</script>

<template>
  <div class="wrapper w-11/12 mx-auto">
    <HeaderMenu class="mb-8" :tasks='tasks' :dates='dates' :statuses='statuses' />
    <TableMain :tasks='tasks' :dates='dates' :statuses='statuses' />
  </div>
</template>

