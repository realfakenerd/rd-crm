import { TABLE_NAME, db } from '$lib/aws';
import type { Content } from '$lib/types';
import {
	GetCommand,
	UpdateCommand,
	type GetCommandInput,
	type UpdateCommandInput
} from '@aws-sdk/lib-dynamodb';
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

export const PUT = (async ({ request, params }) => {
	const body = (await request.json()) as Content;

	const param: UpdateCommandInput = {
		TableName: TABLE_NAME,
		Key: { id: params.id },
		UpdateExpression: `SET sindico = :sindico,
			administradora = :administradora,
			unidades = :unidades,
			funcionarios = :funcionarios,
			endereco = :endereco`,
		ExpressionAttributeValues: {
			':administradora': body.administradora,
			':sindico': body.sindico,
			':unidades': body.unidades,
			':funcionarios': body.funcionarios,
			':endereco': body.endereço
		}
	};


	console.log(body)
	console.log(param)

	const command = new UpdateCommand(param);
	const data = await db.send(command);
	return json(data);
}) satisfies RequestHandler;
