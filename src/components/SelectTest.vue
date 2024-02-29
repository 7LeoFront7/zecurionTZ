<script setup>
import { inject, ref } from 'vue'
const statuses = inject('statuses')
const allTasks = inject('allTasks')

const props = defineProps({
	date: String,
	task: String,
	addNewStatusOnTask: Function,
	idItem: String
})

const selected = ref(statuses.value[0].status)

function chancge(e) {
	const nowStatus = e.target.value

	allTasks.value.map((el, index) => {
		el.dates.map((dates, index) => {
			if (dates.date === props.date) {
				if (props.task === el.task) {
					dates.statusDateTask = nowStatus
				}
			}
		})
	})
	// localStorage.setItem('allTasks', JSON.stringify(allTasks.value))
}
</script>

<template>
	<button :id="props.idItem" @click="props.addNewStatusOnTask"
		class="w-full bg-slate-200 p-2 hover:bg-slate-300 transition">
		+
	</button>

	<!-- <select @change="chancge" v-model="selected">
			<option v-for="status of statuses" :value="status.status">{{ status.status }}</option>
		</select> -->
</template>