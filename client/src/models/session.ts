import { reactive } from 'vue';

export interface ISession {
	isLoggedIn: boolean;
	username: string | null;
}

export const session: ISession = reactive<ISession>({
	isLoggedIn: false,
	username: null,
});

export const endSession = () => {
	session.isLoggedIn = false;
	session.username = null;
};