import { ref } from 'vue';

export interface IUser {
	username: string;
	password: string;
}

export const users = ref<IUser[]>([
	{
		username: 'Bob',
		password: '123',
	},
	{
		username: 'Alice',
		password: '456',
	},
]);
