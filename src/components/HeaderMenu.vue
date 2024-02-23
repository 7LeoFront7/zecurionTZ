<script setup>
import FormItemHeader from './FormItemHeader.vue'

const props = defineProps({
  forms: Array
})






</script>

<template>
  <header class="flex gap-6 mt-6">
    <div v-for='form of props.forms ' :key="form.id">
      <FormItemHeader :placeholder="form.placeholer" :nameForm='form.nameForm' :forms='forms' />
    </div>
    <ul class="max-w-md">
      <li class="flex justify-between items-center border gap-6 p-2 my-2 mt-0">
        <span class=" text-slate-400">id:&nbsp;3232FF</span>
        <p>выполненно Задача 1 Невыполнено выполненно Задача </p>
        <button class="bg-rose-600 p-2 text-white rounded-md px-4 transition hover:bg-rose-800">Удалить</button>
      </li>
      <li class="flex justify-between items-center border gap-6 p-2 my-2">
        <span class=" text-slate-400">id:&nbsp;3232FF</span>
        <p>выполненно Задача 1 Невыполнено выполненно Задача </p>
        <button class="bg-rose-600 p-2 text-white rounded-md px-4 transition hover:bg-rose-800">Удалить</button>
      </li>
      <li class="flex justify-between items-center border gap-6 p-2 my-2">
        <span class=" text-slate-400">id:&nbsp;3232FF</span>
        <p>выполненно Задача 1 Невыполнено выполненно Задача </p>
        <button class="bg-rose-600 p-2 text-white rounded-md px-4 transition hover:bg-rose-800">Удалить</button>
      </li>
    </ul>
  </header>
</template>

