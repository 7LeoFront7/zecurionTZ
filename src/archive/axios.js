
// async function getTasks() { // Получаем все задачи
//   try {
//     const { data } = await axios.get('https://cf2bd04fe3eff35b.mokky.dev/tasks')
//     if (data) {
//       tasks.value = data
//     }
//   } catch (err) {
//     console.log(err)
//   }
// }

// async function getDates() { // Получаем все даты
//   try {
//     const { data } = await axios.get('https://cf2bd04fe3eff35b.mokky.dev/dates')
//     if (data) {
//       dates.value = data
//     }
//   } catch (err) {
//     console.log(err)
//   }
// }

// async function getStatuses() { // Получаем все статусы
//   try {
//     const { data } = await axios.get('https://cf2bd04fe3eff35b.mokky.dev/statuses')
//     if (data) {
//       statuses.value = data
//     }
//   } catch (err) {
//     console.log(err)
//   }
// }

// async function getAllTasks() { // Получаем все
//   try {
//     const { data } = await axios.get('https://cf2bd04fe3eff35b.mokky.dev/allTasks')
//     if (data) {
//       allTasks.value = data
//     }
//   } catch (err) {
//     console.log(err)
//   }
// }



// await axios.post('https://cf2bd04fe3eff35b.mokky.dev/allTasks', {
// 	task: formInput.value,
// 	status: null,
// 	dates: [...arrayDates]
// })

// const { data } = await axios.get('https://cf2bd04fe3eff35b.mokky.dev/allTasks')
// const idTask = data.pop()

// await axios.patch(`https://cf2bd04fe3eff35b.mokky.dev/allTasks/${id}`, {
//   task: text
// })

////////////


// try {
// 	await axios.post('https://cf2bd04fe3eff35b.mokky.dev/dates', { // Отправляем запрос на сохранение новой даты
// 		date: formInput.value,
// 		status: null,
// 		idDate: uuidv4().slice(0, 6)
// 	})

// 	// Обновляем все масиивы во всех задачах
// 	for (let i = 1; i < allTasks.value.length + 1; i++) {
// 		await axios.patch(`https://cf2bd04fe3eff35b.mokky.dev/allTasks/${i}`, {
// 			dates: dates.value,
// 		})
// 		allTasks.value[i - 1].dates.push(newDate) // Добавляем новую дату в Массив
// 	}


// } catch (err) {
// 	console.log(err)
// } finally {
// 	formInput.value = ''
// }

// await axios.patch(`https://cf2bd04fe3eff35b.mokky.dev/allTasks/${i}`, {
// 	dates: dates.value,
// })