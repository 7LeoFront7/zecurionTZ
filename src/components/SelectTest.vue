<script setup>
import { inject, ref } from 'vue'
const statuses = inject('statuses')
const allTasks = inject('allTasks')

const props = defineProps({
	date: String,
	task: String
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
	<select @change="chancge" v-model="selected">
		<option v-for="status of statuses" :value="status.status">{{ status.status }}</option>
	</select>
</template>