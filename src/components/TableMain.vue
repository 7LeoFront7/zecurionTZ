<script setup>

const props = defineProps({
  table: Array
})

console.log(props)










</script>

<template>
   <table class="table-auto border-separate border-spacing-3 text-xl border-4 border-blue-950">
  <thead>
    <tr>
      <th class="w-56 border border-slate-600 p-3">Задачи</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for='item of props.table' :key="item.id">
      <td   class="border border-slate-400 p-2">
      <input class="outline-1 outline-offset-8 hover:bg-blue-100 transition outline-blue-600" type="text" :value="item.task">
    </td>
    </tr>
  </tbody>
</table>
</template>