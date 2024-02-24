<script setup>
import axios from 'axios'
import { onMounted, provide, ref } from 'vue'
import HeaderMenu from './components/HeaderMenu.vue'

const forms = ref([])

async function getForms(){
  const {data} = await axios.get('https://2aaa3219f3d77ced.mokky.dev/forms')
  
  if (data){
    forms.value = data
  }
}

async function deleteItemBD(indexItem){
  
  await axios.patch(`https://2aaa3219f3d77ced.mokky.dev/forms/${indexItem+1}`,{
		data: forms.value[indexItem].data
	})
  
}

async function deleteItem(e) {

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
})


</script>

<template>
  <div class="wrapper w-11/12 mx-auto">
    <HeaderMenu :forms='forms' />
  </div>
</template>

