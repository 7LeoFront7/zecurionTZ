<script setup>
import axios from 'axios'


const props = defineProps({
  tasks: Array
})


async function changeTask(e) {
  const text = e.target.value
  const id = e.target.id
  await axios.patch(`https://cf2bd04fe3eff35b.mokky.dev/tasks/${id}`, {
    task: text
  })
}


</script>

<template>
  <table class="table-auto border-separate border-spacing-3 text-xl border-4 border-blue-950">
    <thead>
      <tr>
        <th class="w-56 border border-slate-600 p-3">Задачи</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for='item of props.tasks' :key="item.id">
        <td class="border border-slate-400 p-2">
          <input :id='item.id' v-model="item.task"
            class="outline-1 mb-4 border-4 outline-offset-8 hover:bg-blue-100 transition outline-blue-600" type="text"
            @input="changeTask">
        </td>
      </tr>
    </tbody>
  </table>
</template>