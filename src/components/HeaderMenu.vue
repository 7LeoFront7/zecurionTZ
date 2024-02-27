<script setup>
import axios from 'axios'
import { inject } from 'vue'
import FormItemHeader from './FormItemHeader.vue'

const allTasks = inject('allTasks')

const props = defineProps({
  tasks: Array,
  statuses: Array,
  dates: Array
})


async function deleteTask(e) { // удаление задачи
  const id = e.target.id

  let isDeleteId = -1
  try {

    allTasks.value.map((task, index) => {
      if (task.id == id) {

        isDeleteId = index

      }
    })

    if (isDeleteId >= 0) {
      allTasks.value.splice(isDeleteId, 1)
    }

    await axios.delete(`https://cf2bd04fe3eff35b.mokky.dev/allTasks/${id}`)


  } catch (err) {
    console.log(err)
  }
}

async function deleteDate(e) { // удаление даты
  const id = e.target.id

  let isDeleteId = -1
  try {

    props.dates.map((date, index) => {
      if (date.id == id) {

        isDeleteId = index

      }
    })

    if (isDeleteId >= 0) {
      props.dates.splice(isDeleteId, 1)
    }
    await axios.delete(`https://cf2bd04fe3eff35b.mokky.dev/dates/${id}`)


  } catch (err) {
    console.log(err)
  }
}

async function deleteStatus(e) { // удаление даты
  const id = e.target.id

  let isDeleteId = -1
  try {

    props.statuses.map((status, index) => {
      if (status.id == id) {

        isDeleteId = index

      }
    })

    if (isDeleteId >= 0) {
      props.statuses.splice(isDeleteId, 1)
    }
    await axios.delete(`https://cf2bd04fe3eff35b.mokky.dev/statuses/${id}`)


  } catch (err) {
    console.log(err)
  }
}

</script>

<template>
  <header class="flex gap-6 mt-6">
    <div>
      <FormItemHeader idForm='tasksForm' placeholder="Введите задачу ..." />
      <ul class="max-w-md">
        <li v-for="item of allTasks" class="flex justify-between items-center border gap-6 p-2 my-2 mt-0">
          <span class=" text-slate-400">id: {{ item.id }}</span>
          <p>{{ item.task }}</p>
          <button :id="item.id" class="bg-rose-600 p-2 text-white rounded-md px-4 transition hover:bg-rose-800"
            @click="deleteTask">Удалить</button>
        </li>
      </ul>
    </div>
    <div>
      <FormItemHeader idForm='datesForm' placeholder="Введите дату ..." />
      <ul class="max-w-md">
        <li v-for="itemDate of props.dates" class="flex justify-between items-center border gap-6 p-2 my-2 mt-0">
          <span class=" text-slate-400">id: {{ itemDate.id }}</span>
          <p>{{ itemDate.date }}</p>
          <button :id="itemDate.id" @click="deleteDate"
            class="bg-rose-600 p-2 text-white rounded-md px-4 transition hover:bg-rose-800">Удалить</button>
        </li>


      </ul>
    </div>
    <div>
      <FormItemHeader idForm='statusForm' placeholder="Введите статус ..." />
      <ul class="max-w-md">
        <li v-for="item of props.statuses" class="flex justify-between items-center border gap-6 p-2 my-2 mt-0">
          <span class=" text-slate-400">id: {{ item.id }}</span>
          <p>{{ item.status }}</p>
          <button :id="item.id" @click="deleteStatus"
            class="bg-rose-600 p-2 text-white rounded-md px-4 transition hover:bg-rose-800">Удалить</button>
        </li>
      </ul>
    </div>
    <!-- <ul class="max-w-md">
      <li v-for="item in allTasks[0]">
        {{ item }}
      </li>
      <li v-for="item of allTasks" class="flex justify-between items-center border gap-6 p-2 my-2 mt-0">
        <span class=" text-slate-400">id: {{ item.id }}</span>
        <p>{{ item.task }} | 21.12.2024 | da</p>
        <button :id="item.id" @click="deleteStatus"
          class="bg-rose-600 p-2 text-white rounded-md px-4 transition hover:bg-rose-800">Удалить</button>
      </li>
    </ul> -->
  </header>
</template>

