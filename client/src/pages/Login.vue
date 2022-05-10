<script setup lang="ts">

import { ref } from 'vue';
import { addUser } from '../models/request';
import { session, startSession } from '../models/session';
import { users, getRandomAvatar } from '../models/users';
import router from '../router';

const username = ref('');
const password = ref('');
const confirm = ref('');
const wrong = ref('');

const intf = ref(false);
const in_progress = ref(false);

const label = ["Log In", "Sign Up"];

const login = async () => {
	wrong.value = '';

	if(username.value === '' || password.value === '') {
		wrong.value = 'Empty field(s)';
		return;
	}

	in_progress.value = true;

	const res: boolean | string = await startSession(username.value, password.value);
	
	in_progress.value = false;

	if(res === true) {
		router.push('/tasks');
	} else {
		wrong.value = res;
	}
};

const signup = async () => {
	wrong.value = '';

	if(username.value === '' || password.value === '' || confirm.value === '') {
		wrong.value = 'Empty field(s)';
		return;
	}

	if(password.value !== confirm.value) {
		wrong.value = "Passwords don't match";
		return;
	}

	const user = {
		avatar: getRandomAvatar(),
		password: password.value,
		username: username.value
	};

	in_progress.value = true;

	await addUser(user);
	
	in_progress.value = false;

	users.value.push(user);

	wrong.value = "Sign Up Successful, Now you may login";

	username.value = '';
	password.value = '';
	confirm.value = '';

	intf.value = false;
};

const action = () => {
	if (intf.value === false) return login();
	signup();
}

const changeInterface = () => intf.value = !intf.value;

</script>

<template>
	<img class="Img" src="../assets/login_img.png">
	<div class="card">
		<div class="loginLabel">{{ label[+intf] }}</div>
		<div class="frm">
			<input class="input" type="text" placeholder="Username" v-model="username" />
			<input class="input" type="password" placeholder="Password" v-model="password" />
			<input v-if="intf === true" class="input" type="password" placeholder="Confirm" v-model="confirm" />
			<button class="button" @click="action" :disabled="in_progress">
				<span class="icon is-small">
					<i class="fa-solid fa-right-to-bracket"></i>
				</span>
				<span>{{ label[+intf] }}</span>
			</button>
			<button class="button is-ghost ghost" @click="changeInterface">
				{{ label[+(!intf)] }} ?
			</button>
			<p>{{wrong}}</p>
		</div>
	</div>
</template>

<style scoped lang="scss">
.Img {
	position: absolute;
	top: 50%;
	right: 35%;
	transform: translate(50%, -50%);
}
div.card {
	height: 340px;
	width: 400px;
	background-color: white;
	box-shadow: none;
	position: absolute;
	top: 45%;
	left: 10%;
	transform: translate(0, -50%);
	.loginLabel {
		font-size: 48px;
		font-weight: 800;
		position: absolute;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
	}

	.frm {
		position: absolute;
		top: 100px;
		left: 50%;
		transform: translateX(-50%);
		width: 80%;
		
		input,
		button {
			width: 100%;
			margin-top: 30px;
		}
	
		button {
			font-weight: 600;
		}

		.ghost:focus:not(:focus-visible) {
			outline: 0;
			box-shadow: none;
		}
	
		p {
			width: 100%;
			text-align: center;
			color: red;
			position: absolute;
			top: 380px;
			left: 50%;
			transform: translateX(-50%);
		}
	}

}
</style>