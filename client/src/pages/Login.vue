<script setup lang="ts">

import { ref } from 'vue';
import { session } from '../models/session';
import { users } from '../models/users';
import router from '../router';

const username = ref('');
const password = ref('');

const login = () => {
	const valid = users.value.filter(u => u.username === username.value && u.password === password.value).length > 0;
	if(valid) {
		session.username = username.value;
		session.isLoggedIn = true;
		router.push('/tasks');
	} else {
		username.value = 'Invalid Credentials';
	}
};

</script>

<template>
	<div class="card">
		<div class="columns is-gapeless">
			<div class="column is-half leftCol">
				<div class="loginLabel">Log In</div>
				<input class="input" type="text" placeholder="Username" v-model="username" />
				<input class="input" type="password" placeholder="Password" v-model="password" />
				<button class="button" @click="login">Log In</button>
			</div>
			<div class="column is-half rightCol">
				<div class="todoLabel">To Do App</div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
div.card {
	height: 700px;
	width: 800px;
	background-color: white;

	.columns {
		height: 100%;

		.leftCol {
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			.loginLabel {
				font-size: 48px;
				font-weight: 800;
				position: absolute;
				top: 100px;
			}

			input,
			button {
				width: 80%;
				margin-top: 30px;
			}

			button {
				font-weight: 600;
			}
		}
		.rightCol {
			background: linear-gradient(to right, #ff4b2b, #ff416c);
			background-repeat: no-repeat;
			background-size: cover;
			border-radius: 0px 5px 5px 0;
			background-position: 0 0;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;

			.todoLabel {
				font-size: 36px;
				font-weight: 600;
				color: white;
			}
		}
	}
}
</style>