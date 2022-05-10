import { reactive } from 'vue';

import { loginReq, LoginRes } from './request';

export interface ISession {
	avatar: string | null;
	loggedIn: boolean;
	token: string | null;
	username: string | null;
}

export const session = reactive<ISession>({
	avatar: null,
	loggedIn: false,
	token: null,
	username: null,
});

export const startSession = async (username: string, password: string) => {
	const res: LoginRes = await loginReq(username, password);

	if(res.success !== true)
		return res.errors[0];
	else {
		setSession(res);
		return true;
	}
};

export const setSession = (res: LoginRes) => {
	session.avatar = res.data.avatar;
	session.token = res.data.token;
	session.username = res.data.username;
	session.loggedIn = true;

	localStorage.setItem('session', JSON.stringify(session));
};

export const endSession = () => {
	session.avatar = null;
	session.loggedIn = false;
	session.token = null;
	session.username = null;

	localStorage.setItem('session', JSON.stringify(session));
};
