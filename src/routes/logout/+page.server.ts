import { redirect } from '@sveltejs/kit';

export const load = async ({ cookies }) => {
	cookies.set('session', '', {
		path: '/',
		expires: new Date(0)
	});
	throw redirect(302, '/login');
};
