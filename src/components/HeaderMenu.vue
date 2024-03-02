<script setup>

import { v4 as uuidv4 } from 'uuid'
import { inject, ref } from 'vue'


const allTasks = inject('allTasks')

const statusTasks = inject('statusTasks')
const statuses = inject('statuses')


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
    dates: props.dates
  }

  allTasks.value.push(newTask)
  // localStorage.setItem('allTasks', JSON.stringify(allTasks.value))



  formInputTask.value = ''

}

function postStatus(e) { // Добавлание статус
  e.preventDefault()

  statusTasks.value = true
  // localStorage.setItem('statusTasks', JSON.stringify(statusTasks.value))


  const newStatus = {
    status: formInputStatus.value,
    idStatus: uuidv4().slice(0, 6)
  }

  statuses.value.push(newStatus)

  props.dates.map((val) => {
    val.status = props.statuses
  })

  allTasks.value.map((val) => {
    val.dates.map((dates) => {
      dates.status = props.statuses
    })
  })


  // localStorage.setItem('dates', JSON.stringify(props.dates))
  // localStorage.setItem('statuses', JSON.stringify(props.statuses))
  // localStorage.setItem('allTasks', JSON.stringify(allTasks.value))

  formInputStatus.value = ''

}

function postDate(e) { // Добавление даты
  e.preventDefault() // Отключаем перезагрузку страницы


  const newDate = { // Новая дата
    date: formInputDate.value,
    status: null,
    idDate: uuidv4().slice(0, 6),
    idStatus: uuidv4().slice(0, 6),
    statusDateTask: null,
    isStatus: false
  }


  props.dates.push(newDate)

  allTasks.value.map((val) => {
    val.dates = props.dates
  })

  props.dates.map((val) => {
    val.status = props.statuses
  })


  // localStorage.setItem('allTasks', JSON.stringify(allTasks.value))
  // localStorage.setItem('dates', JSON.stringify(props.dates))







  formInputDate.value = ''
}

function deleteTask(e) { // удаление задачи
  const id = e.target.id

  let isDeleteId = -1

  allTasks.value.map((task, index) => {
    if (task.idTask == id) {
      isDeleteId = index

    }
  })

  if (isDeleteId >= 0) {
    allTasks.value.splice(isDeleteId, 1)
    // localStorage.setItem('allTasks', JSON.stringify(allTasks.value))
  }


  // localStorage.setItem('allTasks', JSON.stringify(allTasks.value))


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



  // localStorage.setItem('dates', JSON.stringify(props.dates))
  // localStorage.setItem('allTasks', JSON.stringify(allTasks.value))


}

function deleteStatus(e) { // удаление статуса
  const id = e.target.id
  let isDeleteStatus = ''
  let isDeleteId = -1



  props.statuses.map((status, index) => {

    if (status.idStatus == id) {
      isDeleteStatus = status
      isDeleteId = index
    }
  })

  if (isDeleteId >= 0) {
    props.statuses.splice(isDeleteId, 1)
  }



  allTasks.value.map((val) => {
    val.dates.map((dates) => {

      dates.status.map((stat, index) => {
        if (stat.status === isDeleteStatus.status) {

          dates.status.splice(index, 1)
        }
      })
    })
  })

  props.dates.map((val) => {


    val.status.map((stat, index) => {
      if (stat.status === isDeleteStatus.status) {

        val.status.splice(index, 1)
      }
    })

  })

  if (statuses.value.length == 0) {
    statusTasks.value = false
    // localStorage.setItem('statusTasks', JSON.stringify(statusTasks.value))
  }

  // localStorage.setItem('statuses', JSON.stringify(props.statuses))
  // localStorage.setItem('dates', JSON.stringify(props.dates))
  // localStorage.setItem('allTasks', JSON.stringify(allTasks.value))


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
          <span class=" text-slate-400">id: {{ item.idStatus }}</span>
          <p>{{ item.status }}</p>
          <button :id="item.idStatus" @click="deleteStatus"
            class="bg-rose-600 p-2 text-white rounded-md px-4 transition hover:bg-rose-800">Удалить</button>
        </li>
      </ul>

    </div>
    <div>
      <ul v-for="item of allTasks" class="max-w-md">
        <li v-for="itemTask, index of item.dates" class="flex justify-between items-center border gap-6 p-4 my-2 mt-0">
          <div class="flex justify-between gap-5">
            <span class=" text-slate-400">id: {{ itemTask.idStatus }}</span>
            <p>{{ item.task }}</p>
            <b>{{ itemTask.date }}</b>
            <b>{{ itemTask.statusDateTask }}</b>
          </div>
          <button :id="'fd'" @click="deleteStatus"
            class="bg-rose-600 p-2 text-white rounded-md px-4 transition hover:bg-rose-800">Удалить</button>
        </li>
      </ul>
    </div>
  </header>
</template>

