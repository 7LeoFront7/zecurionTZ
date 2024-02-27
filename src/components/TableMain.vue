<script setup>
import axios from 'axios'
import { inject, onMounted, ref } from 'vue'

const allTasks = inject('allTasks')

const datesTasks = ref([])
const textTasks = ref([])

function getDatesTasks() {

  allTasks.value.map((item) => {
    datesTasks.value.push(item)
  })
}

function getTextTasks() {
  allTasks.value.map((item) => {
    textTasks.value.push(item)
  })
}




const props = defineProps({
  tasks: Array,
  dates: Array,
  statuses: Array
})


async function changeTask(e) {
  const text = e.target.value
  const id = e.target.id
  await axios.patch(`https://cf2bd04fe3eff35b.mokky.dev/allTasks/${id}`, {
    task: text
  })
}

onMounted(() => {
  getDatesTasks()
  getTextTasks()
})

console.log(allTasks.value)

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
      <tr v-for='item of allTasks' :key="item.id">
        <td class="border border-slate-400 p-2">
          <input :id='item.id' v-model="item.task"
            class="outline-1 outline-offset-8 hover:bg-blue-100 transition outline-blue-600" type="text"
            @input="changeTask">
        </td>

        <td v-for="dateItem of item.dates">

          <div>

            <span v-if="dateItem.status == null">Нет статусов</span>
            <span v-if="dateItem.status !== null">
              <button
                class=' w-full bg-slate-200 p-3 text-center transition px-5 flex justify-center hover:bg-slate-300'>{{
                  dateItem.status }}</button>
            </span>



          </div>
        </td>

      </tr>
    </tbody>
  </table>
</template>