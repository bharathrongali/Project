import { ref } from 'vue';

export interface IUser {
	username: string;
	password: string;
	avatar: string;
}

export const users = ref<IUser[]>([
	{
		username: 'Bob',
		password: '123',
		avatar: "https://randomuser.me/api/portraits/men/7.jpg"
	},
	{
		username: 'Alice',
		password: '456',
		avatar: "https://randomuser.me/api/portraits/men/8.jpg"
	},
]);
