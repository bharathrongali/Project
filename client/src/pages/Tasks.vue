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
</template>

<style scoped lang="scss">
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