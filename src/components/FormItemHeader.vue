<script setup>
import axios from 'axios'
import { inject, ref } from 'vue'

const formInput = ref('')

const tasks = inject('tasks')

const props = defineProps({
	placeholder: String
})

async function postTask(e) { // Добавлание задачи
	e.preventDefault()
	try {

		await axios.post('https://cf2bd04fe3eff35b.mokky.dev/tasks', {
			task: formInput.value,
		})

		const { data } = await axios.get('https://cf2bd04fe3eff35b.mokky.dev/tasks')
		const idTask = data.pop()

		const newTask = {
			task: formInput.value,
			id: idTask.id
		}



		tasks.value.push(newTask)

	} catch (err) {
		console.log(err)
	} finally {
		formInput.value = ''
	}
}




</script>

<template>
	<div class='w-96'>
		<form action="#" class=' border border-black flex justify-between'>
			<input v-model='formInput' class="p-2 flex-1 outline-none" type="text" :placeholder="props.placeholder">
			<button @click="postTask" class=" bg-blue-950 text-white px-5 transition hover:bg-blue-800">Добавить</button>
		</form>

	</div>
</template>

