import type { Action, Actions, PageServerLoad } from './$types';
import { db } from '$lib/database';
import { dataSharingQuestions, medAdhProgQuestions } from './questions';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) {
		const profile = await db.profile.findUnique({
			where: { userId: locals.user.id },
			include: { MedPrograms: true, DataSharing: true }
		});
		return { user: locals.user, profile };
	}
	return {};
};

const createOrUpdateProfile: Action = async ({ locals, request }) => {
	const formData = await request.formData();
	const userId = locals.user.id;
	const profile = await db.profile.findUnique({
		where: { userId }
	});
	const profileId = profile?.id;
	const profileData = {
		pbmName: formData.get('pbmName') as string,
		parentCompany: formData.get('parentCompany') as string,
		yearFounded: parseInt(formData.get('yearFounded') as string, 10) || null,
		headquartersLocation: formData.get('headquartersLocation') as string,
		marketShare: parseInt(formData.get('marketShare') as string) || null,
		numberOfCoveredLives: parseInt(formData.get('numberOfCoveredLives') as string) || null,
		contractTypesTraditional: formData.get('contractTypesTraditional') === 'true',
		contractTypesPrebate: formData.get('contractTypesPrebate') === 'true'
	};
	const medPrograms = Object.fromEntries(
		Object.keys(medAdhProgQuestions).map((key) => [
			key,
			formData.get(`medPrograms_${key}`) as string
		])
	);
	const dataSharing = Object.fromEntries(
		Object.keys(dataSharingQuestions).map((key) => [
			key,
			formData.get(`dataSharing_${key}`) === 'true'
		])
	);

	try {
		await db.$transaction([
			db.medPrograms.deleteMany({
				where: { profileId }
			}),
			db.dataSharing.deleteMany({
				where: { profileId }
			}),
			db.profile.upsert({
				where: { userId },
				update: {
					...profileData,
					MedPrograms: { create: medPrograms },
					DataSharing: { create: dataSharing }
				},
				create: {
					userId,
					...profileData,
					MedPrograms: { create: medPrograms },
					DataSharing: { create: dataSharing }
				}
			}),
			db.user.update({
				where: { id: userId },
				data: { isCompleteProfile: true }
			})
		]);
	} catch (error) {
		console.error('Error creating/updating profile:', error);
		return new Response('Internal Server Error', { status: 500 });
	} finally {
		redirect(303, '/dashboard');
	}
};

export const actions: Actions = { createOrUpdateProfile };
