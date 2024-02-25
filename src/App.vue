<script setup>
import axios from 'axios'
import { onMounted, provide, ref } from 'vue'
import HeaderMenu from './components/HeaderMenu.vue'
import TableMain from './components/TableMain.vue'

const tasks = ref([])
const dates = ref([])
const statuses = ref([])


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



onMounted(() => {
  getTasks()
  getDates()
  getStatuses()
})

provide('tasks', tasks)



</script>

<template>
  <div class="wrapper w-11/12 mx-auto">
    <HeaderMenu class="mb-8" :tasks='tasks' :dates='dates' :statuses='statuses' />
    <TableMain :tasks='tasks' />
  </div>
</template>

