<script setup lang="ts">
	import { users } from '../models/users';
	import { endSession, session } from '../models/session';
	import router from '../router';

	
	const logout = () => {
		endSession();
		router.push('/');
	};
</script>

<template>
	<nav>
		<div class="sessionContainer">
			<img :src="users.filter(e => e.username === session.username)[0].avatar">
			<p>{{ session.username }}</p>
			<button @click="logout" class="button is-normal is-outlined">
				<span class="icon is-small">
					<i class="fa-solid fa-right-from-bracket"></i>
				</span>
				<span>Log Out</span>
			</button>
		</div>
	</nav>
</template>

<style scoped lang="scss">
nav {
	display: flex;
	position: absolute;
	top: 0;
	left: 0;
	height: 100px;
	width: 100%;
	background-color: transparent;

	.sessionContainer {
		display: flex;
		position: absolute;
		right: 0;
		margin: 20px;

		img {
			width: 48px;
			height: 48px;
			border-radius: 50%;
		}

		p {
			font-weight: 600;
			margin: 10px 20px;
		}

		button {
			font-weight: 500;
		}
	}
}
</style>