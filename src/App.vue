<script setup>
import axios from 'axios'
import { onMounted, provide, ref } from 'vue'
import HeaderMenu from './components/HeaderMenu.vue'
import TableMain from './components/TableMain.vue'

const forms = ref([])


async function getForms(){
  try {
    const {data} = await axios.get('https://2aaa3219f3d77ced.mokky.dev/forms')
  
  if (data){
    forms.value = data
  }
  } catch (err){
    console.log(err)
  }
  
}

async function deleteItemBD(indexItem){
  try {
    await axios.patch(`https://2aaa3219f3d77ced.mokky.dev/forms/${indexItem+1}`,{
		data: forms.value[indexItem].data
	})
  } catch (err){
    console.log(err)
  }
  
  
}

function deleteItem(e) {

  forms.value.map((item, index) => {
    let indexItem = index

    item.data.map((elem, index) => {
      if (elem.id === e.target.id) {
        forms.value[indexItem].data.splice(index, 1)
         deleteItemBD(indexItem)

      }
    })
  })
}



provide('funcDelete', deleteItem)

onMounted(()=>{
  getForms()
  getFullTask()
})

const table = ref([])

function getFullTask() {
  getForms()
forms.value.map((items) => {
  if (items.nameForm === 'tasks') {
    items.data.map((item) => {
     
      const newTask = {
        id: item.id,
        status: null,
        task: item.task
      }
      table.value.push(newTask)
    })
  }
})

}







</script>

<template>
  <div class="wrapper w-11/12 mx-auto">
    <HeaderMenu class="mb-8" :forms='forms' />
    <TableMain :table='table'/>
  </div>
</template>

