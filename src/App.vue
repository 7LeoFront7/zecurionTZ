<script setup>
import { provide, ref } from 'vue'
import HeaderMenu from './components/HeaderMenu.vue'
import TableMain from './components/TableMain.vue'

// const tasks = ref([])
const dates = ref([])
const statuses = ref([])
const allTasks = ref([])
const statusTasks = ref(false)

const GLOBAL_DATES = ref([])



provide('dates', dates)
provide('statuses', statuses)
provide('allTasks', allTasks)
provide('statusTasks', statusTasks)

provide('GLOBAL_DATES', GLOBAL_DATES)



</script>

<template>
  <div class="wrapper w-11/12 mx-auto">
    <HeaderMenu class="mb-8" :statuses='statuses' />
    <TableMain class="mb-8" :dates='dates' :statuses='statuses' />
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

html,
body {
  font-family: "Poppins", sans-serif;
  overflow-x: hidden;
}
</style>
