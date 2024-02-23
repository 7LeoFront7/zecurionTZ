<script setup>
import { v4 as uuidv4 } from 'uuid'
import { provide, ref } from 'vue'
import HeaderMenu from './components/HeaderMenu.vue'

const forms = ref([
  {
    id: 1,
    nameForm: 'tasks',
    placeholer: 'Введите задачу',
    data: [
      {
        id: uuidv4().slice(0, 6),
        task: 'Помыть пол'
      },
      {
        id: uuidv4().slice(0, 6),
        task: 'Купить хлеб'
      },
      {
        id: uuidv4().slice(0, 6),
        task: 'Сделать сайт'
      }
    ]
  },
  {
    id: 2,
    nameForm: 'dates',
    placeholer: 'Введите дату',
    data: [
      {
        id: uuidv4().slice(0, 6),
        date: '12.01'
      },
      {
        id: uuidv4().slice(0, 6),
        date: '05.04'
      },
      {
        id: uuidv4().slice(0, 6),
        date: '06.12'
      }
    ]
  },
  {
    id: 3,
    nameForm: 'statuses',
    placeholer: 'Введите статус',
    data: [
      {
        id: uuidv4().slice(0, 6),
        status: 'В работе'
      },
      {
        id: uuidv4().slice(0, 6),
        status: 'Выполнено'
      }
    ]
  }

])

function deleteItem(e) {
  forms.value.map((item, index) => {
    let indexItem = index

    item.data.map((elem, index) => {
      if (elem.id === e.target.id) {

        forms.value[indexItem].data.splice(index, 1)

      }
    })
  })
}

provide('funcDelete', deleteItem)



</script>

<template>
  <div class="wrapper w-11/12 mx-auto">
    <HeaderMenu :forms='forms' />
  </div>
</template>

