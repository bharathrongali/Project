<script setup lang="ts">
import { ISession, session } from './models/session';

const storage = localStorage.getItem('session');

if (storage !== null) {
	const ses: ISession = JSON.parse(storage);
	session.avatar = ses.avatar;
	session.loggedIn = ses.loggedIn;
	session.token = ses.token;
	session.username = ses.username;
}

</script>

<template>
	<router-view></router-view>
</template>

<style>
</style>
