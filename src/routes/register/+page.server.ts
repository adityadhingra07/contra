// register.server.ts
import { error, fail, redirect } from '@sveltejs/kit';
import type { Action, Actions, PageServerLoad } from './$types';
import bcrypt from 'bcryptjs';
import { db } from '$lib/database';

export const load: PageServerLoad = async (session) => {
	const sessionData = session.cookies.get('session');
	if (sessionData) {
		return redirect(303, '/dashboard');
	}
	return {};
};

const register: Action = async ({ request }) => {
	const data = await request.formData();
	const email = data.get('email');
	const password = data.get('password');

	if (typeof email !== 'string' || typeof password !== 'string' || !email || !password) {
		return error(400, 'Username and Password must be a string');
	}

	try {
		const existingUser = await db.user.findUnique({
			where: { email }
		});

		if (existingUser) {
			return fail(400, { user: true });
		}

		await createUser(email, password);
		return redirect(302, '/login');
	} catch (error) {
		console.error('Error during user registration:', error);
		return fail(500, { error: 'Internal server error' });
	}
};

async function createUser(email: string, password: string) {
	const passwordHash = await bcrypt.hash(password, 10);
	await db.user.create({
		data: {
			email,
			passwordHash,
			userAuthToken: crypto.randomUUID()
		}
	});
}

export const actions: Actions = { register };
