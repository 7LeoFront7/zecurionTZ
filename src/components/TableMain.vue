<script setup>
import { inject } from 'vue'
import "vue-select/dist/vue-select.css"
import SelectTest from './SelectTest.vue'
const allTasks = inject('allTasks')
const statusTasks = inject('statusTasks')
const statuses = inject('statuses')





const { getTasksOnLocalStorage, saveAllTasksOnLocalStorage } = inject('LocalStorogeFunc')



const props = defineProps({
  tasks: Array,
  statuses: Array,
  dates: Array
})





function changeTask() {
  saveAllTasksOnLocalStorage()
}




function addNewStatusOnTask(task, dateTask) {


  allTasks.value.map((fullTask) => {
    fullTask.dates.map((dates, index) => {

      if (task === fullTask.idTask) {

        if (dates === dateTask.date)

          fullTask.dates[index].statusDateTask = statuses.value[0].status
        dates.isStatus = true

        console.log(dates)
      }
    })
  }
  )

  // console.log(allTasks.value)


  // localStorage.setItem('allTasks', JSON.stringify(allTasks.value))
}



</script>

<template>
  <table class="table-auto border-separate border-spacing-3 text-xl border-4 border-blue-950">
    <thead>
      <tr>
        <th class="w-56 border border-slate-600 p-3">Задачи</th>

        <th v-for="dateItem of props.dates" :key="dateItem.date" class="w-56 border border-slate-600 p-3">
          <span> {{ dateItem.date }}</span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for='item, index of allTasks' :key="item.id">
        <td class="border border-slate-400 p-2">
          <input :id='item.id' v-model="item.task"
            class="outline-1 outline-offset-8 hover:bg-blue-100 transition outline-blue-600" type="text"
            @input="changeTask">
        </td>
        <td class=" relative" v-for="dateItem of item.dates" :key="item.id">
          <span v-if="statusTasks == false">Нет статусов</span>

          <button v-if="statusTasks != false && dateItem.isStatus == false"
            @click="addNewStatusOnTask(item.idTask, dateItem.date)"
            class="w-full bg-slate-200 p-2 hover:bg-slate-300 transition">
            +
          </button>

          <SelectTest v-if="dateItem.isStatus == true" :date='dateItem.date' :task='item.task'
            :statuses='dateItem.status' />
        </td>

      </tr>
    </tbody>
  </table>
</template>

     