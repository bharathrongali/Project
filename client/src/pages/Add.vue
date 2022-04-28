<script setup lang="ts">
import { ref } from 'vue';
import { session } from '../models/session';
import { tasks } from '../models/tasks';
import { users } from '../models/users';
import router from '../router';

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

	router.push('/tasks');
}
</script>

<template>
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
			font-size: 36px;
			font-weight: 600;
			margin-bottom: 100px;
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
</style>