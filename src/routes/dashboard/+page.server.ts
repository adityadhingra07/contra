import type { Action, Actions, PageServerLoad } from './$types';
import { db } from '$lib/database';
import { s3 } from '$lib/aws';
import { redirect } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) {
		const contracts = await db.contract.findMany({
			where: { userId: locals.user.id }
		});
		return { user: locals.user, contracts };
	}
	return {};
};

const saveContract: Action = async ({ locals, request }) => {
	const formData = await request.formData();
	const userId = locals.user.id;
	const formDataJson = JSON.stringify(Object.fromEntries(formData.entries()));

	// Save JSON to a file
	const fileName = `${crypto.randomUUID()}.json`;
	const filePath = path.join('/tmp', fileName);
	fs.writeFileSync(filePath, formDataJson);

	// Upload the file to S3
	const bucketName = 'contrasvelte';
	const s3Key = `contracts/${fileName}`;
	const fileStream = fs.createReadStream(filePath);

	try {
		await s3
			.upload({
				Bucket: bucketName,
				Key: s3Key,
				Body: fileStream,
				ContentType: 'application/json'
			})
			.promise();
		const fileUrl = `https://${bucketName}.s3.amazonaws.com/${s3Key}`;
		await db.contract.create({
			data: {
				url: fileUrl,
				userId
			}
		});
	} catch (error) {
		console.error('Error uploading to S3 or saving to database:', error);
		return new Response('Internal Server Error', { status: 500 });
	} finally {
		// Clean up the temporary file
		fs.unlinkSync(filePath);
	}

	return redirect(302, '/dashboard');
};

export const actions: Actions = { saveContract };
