<script setup>
import { v4 as uuidv4 } from 'uuid'
import { inject, ref } from 'vue'
const formInput = ref('')

const deleteBtn = inject('funcDelete')

const props = defineProps({
	placeholder: String,
	id: String,
	nameForm: String,
	forms: Array,
	addFullTask: Function,
	allTasks: Array
})

function addNewInput(e) {
	e.preventDefault()

	const newItemInForm = {
		id: uuidv4().slice(0, 6)
	}

	if (e.target.id === 'tasks') {
		newItemInForm.task = formInput.value
		props.forms[0].data.push(newItemInForm)
	} else if (e.target.id === 'dates') {
		newItemInForm.date = formInput.value
		props.forms[1].data.push(newItemInForm)
	} else if (e.target.id === 'statuses') {
		newItemInForm.status = formInput.value
		props.forms[2].data.push(newItemInForm)
	}

	formInput.value = ''

}





</script>

<template>
	<div class='w-96'>
		<form action="#" class=' border border-black flex justify-between'>
			<input v-model='formInput' class="p-2 flex-1 outline-none" type="text" :placeholder="placeholder">
			<button :id="props.nameForm" @click="addNewInput"
				class=" bg-blue-950 text-white px-5 transition hover:bg-blue-800">Добавить</button>
		</form>
		<ul v-if="props.nameForm === 'statuses'">
			<li v-for="item of props.forms[2].data" class="flex justify-between items-center border gap-6 p-2 my-2">
				<span class=" text-slate-400">id: {{ item.id }}</span>
				<p>{{ item.status }}</p>
				<button @click="deleteBtn" :id="item.id"
					class="bg-rose-600 p-2 text-white rounded-md px-4 transition hover:bg-rose-800">Удалить</button>
			</li>
		</ul>
		<ul v-if="props.nameForm === 'dates'">
			<li v-for="item of props.forms[1].data" class="flex justify-between items-center border gap-6 p-2 my-2">
				<span class=" text-slate-400">id: {{ item.id }}</span>
				<p>{{ item.date }}</p>
				<button @click="deleteBtn" :id="item.id"
					class="bg-rose-600 p-2 text-white rounded-md px-4 transition hover:bg-rose-800">Удалить</button>
			</li>
		</ul>
		<ul v-if="props.nameForm === 'tasks'">
			<li v-for="item of props.forms[0].data" class="flex justify-between items-center border gap-6 p-2 my-2">
				<span class=" text-slate-400">id: {{ item.id }}</span>
				<p class="  max-w-44">{{ item.task }}</p>
				<button :data-nameForm='item.nameForm' @click="deleteBtn" :id="item.id"
					class=" bg-rose-600 p-2 text-white rounded-md px-4 transition hover:bg-rose-800">Удалить</button>
			</li>
		</ul>

	</div>
</template>

