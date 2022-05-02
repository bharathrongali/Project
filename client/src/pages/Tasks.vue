<script setup lang="ts">
import { ref } from 'vue';
import { session } from '../models/session';
import { ITask, tasks } from '../models/tasks';
import router from '../router';
import NavBar from '../components/nav.vue';

if(!session.isLoggedIn) {
	router.push('/');
}
const tabsList = ['Assigned', 'Created', 'All'];
const curTab = ref(tabsList[0]);

const getTabCls = (tab: string) => tab === curTab.value ? 'tabLink activeTab' : 'tabLink';

const fetchTodos = (e: ITask[]): ITask[] => {
	e = e.sort((a, b) => a.done ? 1 : -1);
	if(curTab.value == tabsList[0])
		return e.filter(t => t.for === session.username);

	if(curTab.value == tabsList[1])
		return e.filter(t => t.by === session.username);

	return e;
}

const gotoAdd = () => {
	router.push('/add');
}

</script>

<template>
	<NavBar />

	<img class="backImg" src="../assets/tasks_img.png">

	<h1>T O D O</h1>
	<div class="tabs card">
		<div :class="getTabCls(tab)" v-for="tab in tabsList" @click="() => curTab = tab">{{ tab }}</div>
	</div>
	<button class="button add" @click="gotoAdd">
		<span class="icon is-small">
				<i class="fa-solid fa-plus"></i>
			</span>
			<span>Add</span>
	</button>
	<div class="tasks">
		<div class="taskList">
				<div class="card task" v-for="task in fetchTodos(tasks)" :key="task.title">
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

.backImg {
	width: 800px;
	height: 800px;
	position: absolute;
	top: 50%;
	left: 10%;
	transform: translate(0, -50%);
	opacity: 0.2;
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