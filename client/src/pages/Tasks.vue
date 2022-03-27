<script setup lang="ts">
import { ref } from 'vue';

const tabs = ['Assigned', 'Created', 'All'];
const currentTab = ref(tabs[0]);

const tabClass = (tab: string) => tab === currentTab.value ? 'tabLink activeTab' : 'tabLink';

</script>

<template>
	<h1>T O D O</h1>
	<div class="tabs card">
		<div :class="tabClass(tab)" v-for="tab in tabs" @click="() => currentTab = tab">{{ tab }}</div>
	</div>
	<div class="add card">Add</div>
	<div class="tasks">
		<div class="half">
			<div class="heading">TODO</div>
			<div class="taskList">
				<div class="card task">
					<div class="title">Title</div>
					<div class="for">Bob</div>
					<div class="date">20-04-2022</div>
					<div class="field">
						<label>Done</label>
						<input type="checkbox" />
					</div>
				</div>
			</div>
		</div>
		<div class="half">
			<div class="heading">DONE</div>
			<div class="taskList"></div>
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
	border: rgb(231, 231, 231) 1px solid;
	border-radius: 5px;

	.half {
		height: calc(100%);
		width: calc(50%);
		display: flex;
		align-items: center;
		flex-direction: column;

		.heading {
			position: absolute;
			font-size: 18px;
			font-weight: 800;
			height: 50px;
			line-height: 50px;
			top: 0;
			color: rgb(161, 161, 161);
		}

		.taskList {
			top: 50px;
			position: relative;
			display: flex;
			height: calc(100% - 50px);
			width: 100%;
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
				}

				.date, .for {
					font-weight: 500;
					color: rgb(167, 167, 167);
				}

				.field {
					label {
						font-weight: 500;
					}

					input {
						margin-right: 20px;
						margin-left: 10px;
					}
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
		width: 100px;
		text-align: center;
		font-weight: 600;
		color: rgb(168, 168, 168);
		cursor: pointer;
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