<script setup>
import { inject } from 'vue'
import SelectTest from './SelectTest.vue'
const statuses = inject('statuses')
const allTasks = inject('allTasks')
const statusTasks = inject('statusTasks')
const GLOBAL_DATES = inject('GLOBAL_DATES')



const props = defineProps({
	datesFormAllTasks: Array,
	task: String
})

function addNewStatusOnTask(task, dateTask) {

	let currentIndex = 0

	allTasks.value.map((fullTask, index) => {
		if (task == fullTask.task) {
			currentIndex = index
		}
	})

	const currentValue = {
		...allTasks.value[currentIndex], dates: [...allTasks.value[currentIndex].dates.map((date) => {
			if (date.date === dateTask) {
				return { ...date, isStatus: true, statusDateTask: statuses.value[0].status }
			}
			return date
		})]
	}


	allTasks.value[currentIndex] = currentValue

}



</script>

<template>
	<td class=" relative" v-for="dateItem of props.datesFormAllTasks" :key="dateItem.idDate">
		<span v-if="statusTasks == false">Нет статусов</span>

		<button v-if="statusTasks != false && dateItem.isStatus == false"
			@click="addNewStatusOnTask(props.task, dateItem.date)"
			class="w-full bg-slate-200 p-2 hover:bg-slate-300 transition">
			+
		</button>

		<SelectTest v-if="dateItem.isStatus == true" :date='dateItem.date' :task='props.task' :statuses='dateItem.status' />
	</td>
</template>