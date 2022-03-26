<script setup lang="ts">
	//
</script>

<template>
	<div class="card">
		<div class="columns is-gapeless">
			<div class="column is-half leftCol">
				<div class="loginLabel">Log In</div>
				<input class="input" type="text" placeholder="Username" />
				<input class="input" type="password" placeholder="Password" />
				<button class="button">Log In</button>
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

			input, button {
				width: 80%;
				margin-top: 30px;
			}
		}
		.rightCol {
			background: linear-gradient(to right, #FF4B2B, #FF416C);
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