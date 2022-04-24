<script setup lang="ts">
import { ref } from 'vue';
import { session } from '../models/session';
import { users } from '../models/users';
import { ITask, tasks } from '../models/tasks';
import router from '../router';
import NavBar from '../components/nav.vue';

if(!session.isLoggedIn) router.push('/');

const tabs = ['Assigned', 'Created', 'All'];
const currentTab = ref(tabs[0]);

const tabClass = (tab: string) => tab === currentTab.value ? 'tabLink activeTab' : 'tabLink';

const getTasks = (e: ITask[]): ITask[] => {
	e = e.sort((a, b) => a.done ? 1 : -1);
	if(currentTab.value == tabs[0])
		return e.filter(t => t.for === session.username);

	if(currentTab.value == tabs[1])
		return e.filter(t => t.by === session.username);

	return e;
}

const modalState = ref<boolean>(false);

const modalClass = (modalState: boolean): string => modalState ? 'modal is-active' : 'modal';

const title = ref<string>('');
const tfor = ref<string>('');
const date = ref<string>('');

const addTask = () => {
	if(!session.username) return;
	tasks.value.push({
		by: session.username,
		date: date.value,
		done: false,
		for: tfor.value,
		title: title.value
	});
	modalState.value = false;
}

</script>

<template>
	<NavBar />
	<div :class="modalClass(modalState)">
  	<div class="modal-background" @click="()=>modalState=false"></div>
  	<div class="modal-content">
  	  <div class="card">
				<h1>Add Task</h1>
				<input class="input is-normal" type="text" placeholder="Title" v-model="title" />

				<div class="dropdown is-hoverable">
					<div class="dropdown-trigger">
						<div class="field">
							<div class="control">
								<input class="input is-normal" type="search	" placeholder="For" v-model="tfor" />
							</div>
						</div>
					</div>
					<div class="dropdown-menu" id="dropdown-menu" role="menu">
						<div class="dropdown-content">
								<a href="#" class="dropdown-item" v-for="user in users" @click="()=>tfor=user.username">{{user.username}}</a>
						</div>
					</div>
				</div>

				<input class="input is-normal" type="date" placeholder="Date" v-model="date" />
				<button class="button is-normal" @click="addTask">Add</button>
			</div>
  	</div>
  	<button class="modal-close is-large" aria-label="close" @click="()=>modalState=false"></button>
	</div>

	<h1>T O D O</h1>
	<div class="tabs card">
		<div :class="tabClass(tab)" v-for="tab in tabs" @click="() => currentTab = tab">{{ tab }}</div>
	</div>
	<div class="add card" @click="() => modalState = true">Add</div>
	<div class="tasks">
		<div class="taskList">
				<div class="card task" v-for="task in getTasks(tasks)" :key="task.title">
					<div class="title">{{task.title}}</div>
					<div class="for">{{task.for}}</div>
					<div class="date">{{task.date}} • {{task.by}}</div>
					<div class="field">
						<input type="checkbox" v-model="task.done" />
					</div>
				</div>
			</div>
	</div>
</template>

<style scoped lang="scss">
.modal-content {
	width: 500px;
	height: 600px;
	.card {
		display: flex;
		height: 100%;
		width: 100%;
		background-color: white;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		h1 {
			font: 'Roboto';
			font-size: 24px;
			font-weight: 500;
			margin-bottom: 20px;
		}

		.dropdown.is-hoverable {
			width: 80%;

			.dropdown-trigger {
				width: 100%;

				input {
					width: 100%;
				}
			}
		}

		input {
			margin-top: 20px;
			width: 80%;
		}

		button {
			margin-top: 20px;
			width: 80%;
		}
	}
}
.tasks {
	position: absolute;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	top: 350px;
	left: 50px;
	right: 50px;
	height: 60%;
	border: rgb(231, 231, 231) 1px solid;
	border-radius: 5px;

	.taskList {
		top: 50px;
		position: relative;
		display: flex;
		height: calc(100% - 50px);
		width: 60%;
		display: flex;
		flex-direction: column;
		align-items: center;

		.task {
			height: 40px;
			width: 95%;
			display: flex;
			justify-content: space-between;
			flex-direction: row;
			align-items: center;
			margin-top: 10px;

			.title {
				margin: 0;
				font-size: 18px;
				font-weight: 600;
				padding: 10px;
				width: 200px;
			}

			.date, .for {
				font-weight: 500;
				color: rgb(167, 167, 167);
				width: 200px;
				text-align: center;
			}

			.field {
				input {
					margin-right: 20px;
					margin-left: 10px;
				}
			}
		}
	}
}
.tabs {
	position: absolute;
	left: 50%;
	top: 220px;
	transform: translateX(-50%);
	height: 40px;
	width: 500px;
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
	align-items: center;

	.tabLink {
		width: 32%;
		text-align: center;
		font-weight: 600;
		color: rgb(168, 168, 168);
		cursor: pointer;

		&:hover {
			color: darkslategrey;
			transform: scale(1.05);
		}
	}

	.activeTab {
		color: rgb(41, 41, 41);
	}
}

.add {
	position: absolute;
	left: 200px;
	top: 220px;
	width: 100px;
	height: 40px;
	font-weight: 600;
	cursor: pointer;
	color: rgb(41, 41, 41);
	display: flex;
	justify-content: center;
	align-items: center;

	&:hover {
		transform: scale(1.05);
	}
}

h1 {
	font-size: 48px;
	font-weight: 800;
	position: absolute;
	top: 100px;
	left: 50%;
	transform: translateX(-50%);
}
</style>