import { ref } from 'vue';

export interface ITask {
	_id: string;
	by: string;
	date: string;
	done: boolean;
	title: string;
	for: string;
}

export const tasks = ref<ITask[]>([]);

// e.sort((a, b) => a.done ? 1 : -1);
