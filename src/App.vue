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
