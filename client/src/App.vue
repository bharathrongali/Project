<script setup lang="ts">
import { LoginRes } from './models/request';
import { setSession } from './models/session';

const storage = localStorage.getItem('session');

if (storage !== null) {
	const res: LoginRes = {
		success: true,
		errors: [],
		data: JSON.parse(storage)
	};

	setSession(res);
}

</script>

<template>
	<router-view></router-view>
</template>

<style>
</style>
