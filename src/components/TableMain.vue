<script setup>
import axios from 'axios'
import { inject } from 'vue'

const fullTasks = inject('fullTasks')
console.log(fullTasks.value)

const props = defineProps({
  tasks: Array,
  dates: Array,
  statuses: Array
})


async function changeTask(e) {
  const text = e.target.value
  const id = e.target.id
  await axios.patch(`https://cf2bd04fe3eff35b.mokky.dev/tasks/${id + 1}`, {
    task: text
  })
}


</script>

<template>
  <table class="table-auto border-separate border-spacing-3 text-xl border-4 border-blue-950">
    <thead>
      <tr>
        <th class="w-56 border border-slate-600 p-3">Задачи</th>

        <th v-if='props.dates.length > 0' v-for="dateTask of props.dates" class="w-56 border border-slate-600 p-3">

          <span> {{ dateTask.date }}</span>

        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for='item of props.tasks' :key="item.id">
        <td class="border border-slate-400 p-2">
          <input :id='item.id' v-model="item.task"
            class="outline-1 outline-offset-8 hover:bg-blue-100 transition outline-blue-600" type="text"
            @input="changeTask">
        </td>
        <td v-for="task of props.tasks">
          <button class=' w-full bg-slate-200 p-3 text-center transition px-5 flex justify-center hover:bg-slate-300'
            v-if="task.status == null">
            +</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>