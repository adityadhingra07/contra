import type { Handle } from '@sveltejs/kit';
import { db } from '$lib/database';

export const handle: Handle = async ({ event, resolve }) => {
	const session = event.cookies.get('session');

	if (!session) {
		return resolve(event);
	}

	const user = await db.user.findUnique({
		where: { userAuthToken: session },
		select: { email: true, isCompleteProfile: true, id: true }
	});

	if (user) {
		event.locals.user = {
			id: user.id,
			email: user.email,
			isCompleteProfile: user.isCompleteProfile
		};
	}

	// load page as normal
	return resolve(event);
};
