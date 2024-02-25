<script setup>
import axios from 'axios'
import FormItemHeader from './FormItemHeader.vue'

const props = defineProps({
  tasks: Array,
  statuses: Array,
  dates: Array
})


async function deleteTask(e) { // удаление задачи
  const id = e.target.id

  let isDeleteId = -1
  try {

    props.tasks.map((task, index) => {
      if (task.id == id) {

        isDeleteId = index

      }
    })

    if (isDeleteId >= 0) {
      props.tasks.splice(isDeleteId, 1)
    }

    await axios.delete(`https://cf2bd04fe3eff35b.mokky.dev/tasks/${id}`)


  } catch (err) {
    console.log(err)
  }
}

</script>

<template>
  <header class="flex gap-6 mt-6">
    <div>
      <FormItemHeader placeholder="Введите задачу ..." />
      <ul class="max-w-md">
        <li v-for="item of props.tasks" class="flex justify-between items-center border gap-6 p-2 my-2 mt-0">
          <span class=" text-slate-400">id: {{ item.id }}</span>
          <p>{{ item.task }}</p>
          <button :id="item.id" class="bg-rose-600 p-2 text-white rounded-md px-4 transition hover:bg-rose-800"
            @click="deleteTask">Удалить</button>
        </li>
      </ul>
    </div>
    <div>
      <FormItemHeader placeholder="Введите дату ..." />
      <ul class="max-w-md">
        <li v-for="item of props.dates" class="flex justify-between items-center border gap-6 p-2 my-2 mt-0">
          <span class=" text-slate-400">id: {{ item.idDate }}</span>
          <p>{{ item.date }}</p>
          <button class="bg-rose-600 p-2 text-white rounded-md px-4 transition hover:bg-rose-800">Удалить</button>
        </li>
      </ul>
    </div>
    <div>
      <FormItemHeader placeholder="Введите статус ..." />
      <ul class="max-w-md">
        <li v-for="item of props.statuses" class="flex justify-between items-center border gap-6 p-2 my-2 mt-0">
          <span class=" text-slate-400">id: {{ item.idStatus }}</span>
          <p>{{ item.status }}</p>
          <button class="bg-rose-600 p-2 text-white rounded-md px-4 transition hover:bg-rose-800">Удалить</button>
        </li>
      </ul>
    </div>
  </header>
</template>

