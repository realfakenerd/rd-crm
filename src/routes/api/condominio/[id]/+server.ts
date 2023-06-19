import { TABLE_NAME, db } from '$lib/aws';
import { GetCommand, type GetCommandInput } from '@aws-sdk/lib-dynamodb';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET = (async ({ params }) => {
	const param: GetCommandInput = {
		TableName: TABLE_NAME,
		Key: {
			id: params.id
		}
	};

	const command = new GetCommand(param);
	const data = await db.send(command);

	return json(data);
}) satisfies RequestHandler;
