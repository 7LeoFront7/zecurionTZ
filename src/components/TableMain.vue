<script setup>
import { inject, onMounted, ref } from 'vue'

const allTasks = inject('allTasks')

const { getTasksOnLocalStorage, saveAllTasksOnLocalStorage } = inject('LocalStorogeFunc')

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

  saveAllTasksOnLocalStorage()
}

onMounted(() => {
  getDatesTasks()
  getTextTasks()
})

</script>

<template>
  <table class="table-auto border-separate border-spacing-3 text-xl border-4 border-blue-950">
    <thead>
      <tr>
        <th class="w-56 border border-slate-600 p-3">Задачи</th>

        <th v-for="DateItem of allTasks" class="w-56 border border-slate-600 p-3">
          <div v-for="dateItem of DateItem.dates">
            <span> {{ dateItem.date }}</span>
          </div>


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

            <span v-if="dateItem.status === null">Нет статусов</span>
            <span v-if="dateItem.status !== null">
              <button
                class=' w-full bg-slate-200 p-3 text-center transition px-5 flex justify-center hover:bg-slate-300'>+</button>
            </span>



          </div>
        </td>

      </tr>
    </tbody>
  </table>
</template>