<script setup>
import { v4 as uuidv4 } from 'uuid'
import { ref } from 'vue'
import FormItemHeader from './FormItemHeader.vue'
const props = defineProps({
  forms: Array
})

const allTasks = ref([])


function addFullTask() {

  props.forms.map((items) => {
    if (items.nameForm === 'tasks') {
      items.data.map((item) => {
        console.log(item)
        const newTask = {
          id: uuidv4().slice(0, 6),
          status: 'Выполнено',
          task: item.task
        }
        allTasks.value.push(newTask)
      })
    }
  })

  console.log(allTasks.value)
}

addFullTask()


</script>

<template>
  <header class="flex gap-6 mt-6">
    <div v-for='form of props.forms ' :key="form.id">
      <FormItemHeader :placeholder="form.placeholer" :nameForm='form.nameForm' :forms='forms' :addFullTask='addFullTask'
        :allTasks='allTasks' />
    </div>
    <ul class="max-w-md">
      <li v-for="item of allTasks" class="flex justify-between items-center border gap-6 p-2 my-2 mt-0">
        <span class=" text-slate-400">id: {{ item.id }}</span>
        <p>{{ item.task }} {{ item.status }} {{ item.date }}</p>
        <button class="bg-rose-600 p-2 text-white rounded-md px-4 transition hover:bg-rose-800">Удалить</button>
      </li>

    </ul>
  </header>
</template>

