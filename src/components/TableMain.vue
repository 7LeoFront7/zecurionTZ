<script setup>
import { inject } from 'vue'
import "vue-select/dist/vue-select.css"
import TableCell from './TableCell.vue'
const allTasks = inject('allTasks')





const { getTasksOnLocalStorage, saveAllTasksOnLocalStorage } = inject('LocalStorogeFunc')



const props = defineProps({
  tasks: Array,
  statuses: Array,
  dates: Array
})





function changeTask() {
  saveAllTasksOnLocalStorage()
}








</script>

<template>
  <div class=' overflow-x-scroll md:overflow-x-hidden'>
    <table class="table-fixed border-separate border-spacing-3 text-xl border-4 border-blue-950">
      <thead>
        <tr>
          <th class="w-56 border border-slate-600 p-3">Задачи</th>

          <th v-for="dateItem of props.dates" :key="dateItem.date" class="w-56 border border-slate-600 p-3">
            <span> {{ dateItem.date }}</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for='item of allTasks' :key="item.id">
          <td class="border border-slate-400 p-2">
            <input :id='item.id' v-model="item.task"
              class="outline-1 outline-offset-8 hover:bg-blue-100 transition outline-blue-600" type="text"
              @input="changeTask">
          </td>

          <TableCell :task='item.task' :datesFormAllTasks='item.dates' />
        </tr>
      </tbody>
    </table>
  </div>

</template>

<style scoped>
table {
  overflow: visible;
}
</style>