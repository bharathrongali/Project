import { ref } from 'vue';

export interface IUser {
	username: string;
	password: string;
	avatar: string;
}

export const users = ref<IUser[]>([]);

export const getRandomAvatar = () => {
	const { random, floor } = Math;
	const n = floor(random() * 100);
	return `https://randomuser.me/api/portraits/men/${n}.jpg`;
}
