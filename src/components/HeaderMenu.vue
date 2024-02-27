<script setup>

import { v4 as uuidv4 } from 'uuid'
import { inject, ref } from 'vue'

const { saveDatesOnLocalStorage, saveAllTasksOnLocalStorage } = inject('LocalStorogeFunc')

const allTasks = inject('allTasks')

const props = defineProps({
  tasks: Array,
  statuses: Array,
  dates: Array
})

const formInputTask = ref()
const formInputDate = ref('')
const formInputStatus = ref('')

function postTask(e) { // Добавлание задачи
  e.preventDefault()


  const newTask = {
    task: formInputTask.value,
    idTask: uuidv4().slice(0, 6),
    dates: props.dates,
    status: null
  }

  allTasks.value.push(newTask)
  saveAllTasksOnLocalStorage()



  formInputTask.value = ''

}

async function postStatus(e) { // Добавлание статус
  e.preventDefault()
  try {

    await axios.post('https://cf2bd04fe3eff35b.mokky.dev/statuses', {
      status: formInputStatus.value,
    })


    const { data } = await axios.get('https://cf2bd04fe3eff35b.mokky.dev/statuses')
    const idStatus = data.pop()

    const newStatus = {
      status: formInputStatus.value,
      id: idStatus.id
    }

    statuses.value.push(newStatus)

  } catch (err) {
    console.log(err)
  } finally {
    formInputStatus.value = ''
  }
}

async function deleteTask(e) { // удаление задачи
  const id = e.target.id

  let isDeleteId = -1
  try {

    allTasks.value.map((task, index) => {
      if (task.idTask == id) {
        isDeleteId = index

      }
    })

    if (isDeleteId >= 0) {
      allTasks.value.splice(isDeleteId, 1)
      saveAllTasksOnLocalStorage()
    }




  } catch (err) {
    console.log(err)
  }
}

function deleteDate(e) { // удаление даты
  const id = e.target.id
  let isDeleteDate = ''
  let isDeleteId = -1


  props.dates.map((date, index) => {

    if (date.idDate == id) {
      isDeleteDate = date
      isDeleteId = index
    }
  })

  if (isDeleteId >= 0) {
    props.dates.splice(isDeleteId, 1)
  }



  allTasks.value.map((val) => {
    val.dates.map((itemObj, index) => {
      if (itemObj.date === isDeleteDate.date) {
        val.dates.splice(index, 1)
      }
    })
  })
  localStorage.setItem('dates', JSON.stringify(props.dates))
  saveAllTasksOnLocalStorage()


}


function postDate(e) { // Добавление даты
  e.preventDefault() // Отключаем перезагрузку страницы

  const newDate = {
    date: formInputDate.value,
    status: null,
    idDate: uuidv4().slice(0, 6)
  }
  props.dates.push(newDate)

  localStorage.setItem('dates', JSON.stringify(props.dates))
  formInputDate.value = ''
}


</script>

<template>
  <header class="flex gap-6 mt-6">
    <div>
      <form action="#" class=' w-96 border border-black flex justify-between'>
        <input v-model='formInputTask' class="p-2 flex-1 outline-none" type="text" placeholder="task">
        <button @click="postTask" class=" bg-blue-950 text-white px-5 transition hover:bg-blue-800">Добавить</button>

      </form>
      <ul class="max-w-md">
        <li v-for="item of allTasks" class="flex justify-between items-center border gap-6 p-4 my-2 mt-0">
          <span class=" text-slate-400">id: {{ item.idTask }}</span>
          <p>{{ item.task }}</p>
          <button :id="item.idTask" class="bg-rose-600 p-2 text-white rounded-md px-4 transition hover:bg-rose-800"
            @click="deleteTask">Удалить</button>
        </li>
      </ul>
    </div>
    <div>
      <form action="#" class=' w-96 border border-black flex justify-between'>
        <input v-model='formInputDate' class="p-2 flex-1 outline-none" type="text" placeholder="date">
        <button @click="postDate" class=" bg-blue-950 text-white px-5 transition hover:bg-blue-800">Добавить</button>

      </form>
      <ul class="max-w-md">

        <li v-for="item in props.dates" class="flex justify-between items-center border gap-6 p-4 my-2 mt-0">
          <span class=" text-slate-400">id: {{ item.idDate }}</span>
          <p>{{ item.date }}</p>
          <button :id="item.idDate" @click="deleteDate"
            class="bg-rose-600 p-2 text-white rounded-md px-4 transition hover:bg-rose-800">Удалить</button>

        </li>



      </ul>
    </div>
    <div>
      <form action="#" class=' w-96 border border-black flex justify-between'>
        <input v-model='formInputStatus' class="p-2 flex-1 outline-none" type="text" placeholder="status">
        <button @click="postStatus" class=" bg-blue-950 text-white px-5 transition hover:bg-blue-800">Добавить</button>

      </form>
      <ul class="max-w-md">
        <li v-for="item of props.statuses" class="flex justify-between items-center border gap-6 p-4 my-2 mt-0">
          <span class=" text-slate-400">id: {{ item.id }}</span>
          <p>{{ item.status }}</p>
          <button :id="item.id" @click="deleteStatus"
            class="bg-rose-600 p-2 text-white rounded-md px-4 transition hover:bg-rose-800">Удалить</button>
        </li>
      </ul>
    </div>
  </header>
</template>

