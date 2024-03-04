<script setup>

import Swal from 'sweetalert2'
import { v4 as uuidv4 } from 'uuid'
import { inject, provide, ref } from 'vue'

const GLOBAL_DATES = inject('GLOBAL_DATES')
const allTasks = inject('allTasks')

const statusTasks = inject('statusTasks')
const statuses = inject('statuses')
const dates = inject('dates')




const props = defineProps({
  tasks: Array,
  statuses: Array
})

const formInputTask = ref()
const formInputDate = ref('')
const formInputStatus = ref('')



function postTask(e) { // Добавлание задачи
  e.preventDefault()

  let close = false
  if (formInputTask.value == undefined) { // Проверки на валидность
    Swal.fire({
      title: 'Произошла ошибка',
      text: 'Вы ничего не внесли в форму с задачами',
      icon: 'error',
      confirmButtonText: 'Ок'
    })
    return
  }
  allTasks.value.map((task) => { // Проверки на валидность
    if (task.task == formInputTask.value) {
      Swal.fire({
        title: 'Произошла ошибка',
        text: 'Такая задача уже есть',
        icon: 'error',
        confirmButtonText: 'Ок'
      })
      close = true
    }
  })
  if (close) { // Проверки на валидность
    return
  }





  const newTask = { // Создание новой задачи
    task: formInputTask.value,
    idTask: uuidv4().slice(0, 6),
    dates: GLOBAL_DATES.value
  }

  allTasks.value.push(newTask)


  // const IndexLastTask = allTasks.value.length - 1

  // allTasks.value[IndexLastTask]?.dates.map((date) => {
  //   date.statusDateTask = null
  //   date.isStatus = false
  // })

  formInputTask.value = ''
}

function postStatus(e) { // Добавлание статус
  e.preventDefault()

  if (formInputStatus.value == '') {
    Swal.fire({
      title: 'Произошла ошибка',
      text: 'Вы ничего не внесли в форму со статусами',
      icon: 'error',
      confirmButtonText: 'Ок'
    })
    return
  } else if (allTasks.value.length == 0) {
    Swal.fire({
      title: 'Произошла ошибка',
      text: 'Чтобы добавить статус задачи, сначала задайте задачу',
      icon: 'error',
      confirmButtonText: 'Хорошо!'
    })
    return
  } else if (allTasks.value[0]?.dates.length == 0) {
    Swal.fire({
      title: 'Произошла ошибка',
      text: 'Чтобы добавить статус задачи, задайте дату',
      icon: 'error',
      confirmButtonText: 'Хорошо!'
    })
    return
  }

  let close = false

  allTasks.value.map((task) => { // Проверки на валидность

    task.dates.map((date) => {

      date.status.map((status) => {

        if (status.status == formInputStatus.value) {
          Swal.fire({
            title: 'Произошла ошибка',
            text: 'Такой статус уже есть',
            icon: 'error',
            confirmButtonText: 'Ок'
          })
          close = true

        }
      })
    })

  })
  if (close) { // Проверки на валидность
    formInputStatus.value = ''
    return
  }

  statusTasks.value = true
  // localStorage.setItem('statusTasks', JSON.stringify(statusTasks.value))


  const newStatus = {
    status: formInputStatus.value,
    idStatus: uuidv4().slice(0, 6)
  }

  statuses.value.push(newStatus)

  dates.value.map((val) => {
    val.status = props.statuses
  })

  allTasks.value.map((val) => {
    val.dates.map((dates) => {
      dates.status = props.statuses
    })
  })


  formInputStatus.value = ''

}

function postDate(e) { // Добавление даты
  e.preventDefault() // Отключаем перезагрузку страницы

  if (formInputDate.value == '') {
    Swal.fire({
      title: 'Произошла ошибка',
      text: 'Вы ничего не внесли в форму с датами',
      icon: 'error',
      confirmButtonText: 'Ок'
    })
    return
  } else if (allTasks.value.length == 0) {
    Swal.fire({
      title: 'Произошла ошибка',
      text: 'Чтобы добавить дату задачи, сначала задайте задачу',
      icon: 'error',
      confirmButtonText: 'Хорошо!'
    })
    return
  }

  let close = false
  allTasks.value.map((task) => { // Проверки на валидность
    task.dates.map((date) => {
      if (date.date == formInputDate.value) {
        Swal.fire({
          title: 'Произошла ошибка',
          text: 'Такая дата уже есть',
          icon: 'error',
          confirmButtonText: 'Ок'
        })
        close = true
      }
    })

  })
  if (close) { // Проверки на валидность
    return
  }

  const newDate = { // Новая дата
    date: formInputDate.value,
    status: props.statuses,
    idDate: uuidv4().slice(0, 6),
    idStatus: uuidv4().slice(0, 6),
    statusDateTask: null,
    isStatus: false
  }

  // GLOBAL_DATES.value.push(newDate)
  // allTasks.value.map((task) => {
  //   task.dates = GLOBAL_DATES.value
  // })

  GLOBAL_DATES.value = [...GLOBAL_DATES.value, newDate]

  allTasks.value.forEach((task) => {
    task.dates = [...task.dates, newDate]
    // task.status = task.status ? task.status.push(newDate) : []
  })

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


  allTasks.value.map((task) => {

    task.dates.map((date, index) => {
      if (date.idDate == id) {
        isDeleteDate = date
        isDeleteId = index
      }

    })

    if (isDeleteId >= 0) {
      task.dates.splice(isDeleteId, 1)
    }
  })




  // allTasks.value.map((val) => {
  //   val.dates.map((itemObj, index) => {
  //     if (itemObj.date === isDeleteDate.date) {
  //       val.dates.splice(index, 1)
  //     }
  //   })
  // })



  // localStorage.setItem('dates', JSON.stringify(dates.value))
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
      dates.isStatus = false
      dates.status.map((stat, index) => {
        if (stat.status === isDeleteStatus.status) {

          dates.status.splice(index, 1)
        }
      })
    })
  })

  dates.value.map((val) => {


    val.status.map((stat, index) => {
      if (stat.status === isDeleteStatus.status) {

        val.status.splice(index, 1)
      }
    })

  })

  if (statuses.value.length == 0) {
    statusTasks.value = false
  }

  console.log(allTasks.value)
}

function deleteStatusOnAllTasks(task, dateItem) {
  task.dates.map((date) => {
    if (dateItem == date.date) {
      date.isStatus = false
      date.statusDateTask = null
    }
  })
}


</script>

<template>
  <header class="grid 2xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6 mt-6">
    <div>
      <form action="#" class=' border border-black flex justify-between'>
        <input v-model='formInputTask' class="p-2 w-full outline-none" type="text" placeholder="Введите задачу ...">
        <button @click="postTask" class=" bg-blue-950 text-white px-5 transition hover:bg-blue-800">Добавить</button>
      </form>
      <ul v-auto-animate class="w-full">
        <li v-for="item of allTasks" class="flex justify-between items-center border gap-6 p-4 my-2 mt-0">
          <span class=" text-slate-400">id: {{ item.idTask }}</span>
          <p>{{ item.task }}</p>
          <button :id="item.idTask" class="bg-rose-600 p-2 text-white rounded-md px-4 transition hover:bg-rose-800"
            @click="deleteTask">Удалить</button>
        </li>
      </ul>
    </div>
    <div>
      <form action="#" class=' border border-black flex justify-between'>
        <input v-model='formInputDate' class="p-2 flex-1 w-full outline-none" type="text"
          placeholder="Введите дату ...">
        <button @click="postDate" class=" bg-blue-950 text-white px-5 transition hover:bg-blue-800">Добавить</button>

      </form>
      <ul v-if='allTasks != []' v-auto-animate class="w-full">

        <li v-for="item in allTasks[0]?.dates" class="flex justify-between items-center border gap-6 p-4 my-2 mt-0">
          <span class=" text-slate-400">id: {{ item.idDate }}</span>
          <p>{{ item.date }}</p>
          <button :id="item.idDate" @click="deleteDate"
            class="bg-rose-600 p-2 text-white rounded-md px-4 transition hover:bg-rose-800">Удалить</button>

        </li>




      </ul>
    </div>
    <div>
      <form action="#" class=' border border-black flex justify-between'>
        <input v-model='formInputStatus' class="p-2 flex-1 w-full outline-none" type="text"
          placeholder="Введите статус ...">
        <button @click="postStatus" class=" bg-blue-950 text-white px-5 transition hover:bg-blue-800">Добавить</button>

      </form>
      <ul v-auto-animate class="w-full">
        <li v-for="item of props.statuses" class="flex justify-between items-center border gap-6 p-4 my-2 mt-0">
          <span class=" text-slate-400">id: {{ item.idStatus }}</span>
          <p>{{ item.status }}</p>
          <button :id="item.idStatus" @click="deleteStatus"
            class="bg-rose-600 p-2 text-white rounded-md px-4 transition hover:bg-rose-800">Удалить</button>
        </li>
      </ul>

    </div>
    <div>
      <ul v-auto-animate v-for="item of allTasks" class="w-full">
        <li class='mb-5' v-for="itemTask, index of item.dates">
          <div v-if="itemTask.isStatus === true"
            class="flex relative justify-between items-center border gap-6 p-4 my-2 mt-0">
            <div class="flex justify-between gap-2">
              <span class=" absolute -top-2 text-sm text-slate-400 bg-white px-2 pb-1">id: {{ item.idTask +
          [index].toString()
                }}</span>
              <p class="flex-1 mr-2">{{ item.task }}</p>
              <b class="bg-white px-2 pb-1 absolute right-0 -top-3">{{ itemTask.date }}</b>
              <b>{{ itemTask.statusDateTask }}</b>
            </div>
            <button :id="item.idTask + [index].toString()" @click="deleteStatusOnAllTasks(item, itemTask.date)"
              class="bg-rose-600 p-2 text-white rounded-md px-4 transition hover:bg-rose-800">Удалить</button>
          </div>
        </li>

      </ul>
    </div>
  </header>
</template>
