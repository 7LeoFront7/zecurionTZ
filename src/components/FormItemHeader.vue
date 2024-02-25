<script setup>
import axios from 'axios'
import { inject, ref } from 'vue'

const formInput = ref('')

const tasks = inject('tasks')
const dates = inject('dates')
const statuses = inject('statuses')

const props = defineProps({
	placeholder: String,
	idForm: String
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

async function chancgedatesOfTask() {
	const { data } = await axios.get('https://cf2bd04fe3eff35b.mokky.dev/tasks')

	data.map((item) => {
		item.dates.push(formInput.value)

		console.log(item.dates)

		// axios.patch(`https://cf2bd04fe3eff35b.mokky.dev/tasks`, {
		// 	dates: 
		// })
	})
}

async function postDate(e) { // Добавление дат
	e.preventDefault()
	try {

		await axios.post('https://cf2bd04fe3eff35b.mokky.dev/dates', {
			date: formInput.value,
		})

		chancgedatesOfTask()





		const { data } = await axios.get('https://cf2bd04fe3eff35b.mokky.dev/dates')
		const idDate = data.pop()

		const newDate = {
			date: formInput.value,
			id: idDate.id
		}

		dates.value.push(newDate)

	} catch (err) {
		console.log(err)
	} finally {
		formInput.value = ''
	}
}

async function postStatus(e) { // Добавлание статус
	e.preventDefault()
	try {

		await axios.post('https://cf2bd04fe3eff35b.mokky.dev/statuses', {
			status: formInput.value,
		})


		const { data } = await axios.get('https://cf2bd04fe3eff35b.mokky.dev/statuses')
		const idStatus = data.pop()

		const newStatus = {
			status: formInput.value,
			id: idStatus.id
		}

		statuses.value.push(newStatus)

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
			<button v-if="idForm === 'tasksForm'" @click="postTask"
				class=" bg-blue-950 text-white px-5 transition hover:bg-blue-800">Добавить</button>
			<button v-if="idForm === 'datesForm'" @click="postDate"
				class=" bg-blue-950 text-white px-5 transition hover:bg-blue-800">Добавить</button>
			<button v-if="idForm === 'statusForm'" @click="postStatus"
				class=" bg-blue-950 text-white px-5 transition hover:bg-blue-800">Добавить</button>
		</form>

	</div>
</template>

