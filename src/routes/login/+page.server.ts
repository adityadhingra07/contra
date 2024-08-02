// login.server.ts
import { error, fail, redirect } from '@sveltejs/kit';
import type { Action, Actions, PageServerLoad } from './$types';
import bcrypt from 'bcryptjs';
import { db } from '$lib/database';

export const load: PageServerLoad = async (session) => {
	const sessionData = session.cookies.get('session');
	if (sessionData) {
		return redirect(303, '/');
	}
	return {};
};

const login: Action = async ({ cookies, request }) => {
	const data = await request.formData();
	const email = data.get('email');
	const password = data.get('password');

	if (typeof email !== 'string' || typeof password !== 'string' || !email || !password) {
		return error(400, 'Username and Password must be a string');
	}

	const user = await db.user.findUnique({ where: { email } });

	if (!user) {
		return fail(400, { credentials: true });
	}

	const userPassword = await bcrypt.compare(password, user.passwordHash);

	if (!userPassword) {
		return fail(400, { credentials: true });
	}

	// generate new auth token just in case
	const authenticatedUser = await db.user.update({
		where: { email: user.email },
		data: { userAuthToken: crypto.randomUUID() }
	});

	cookies.set('session', authenticatedUser.userAuthToken, {
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
		secure: process.env.NODE_ENV === 'production',
		maxAge: 60 * 60 * 24 * 30
	});

	// redirect the user
	if (!authenticatedUser.isCompleteProfile) {
		return redirect(302, '/profile');
	}
	return redirect(302, '/dashboard');
};

export const actions: Actions = { login };
