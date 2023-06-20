import { TABLE_NAME, db } from '$lib/aws';
import { ScanCommand, type ScanCommandInput, type PutCommandInput, PutCommand } from '@aws-sdk/lib-dynamodb';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { Content } from '$lib/types';
export const GET = (async () => {
	const param: ScanCommandInput = {
		TableName: TABLE_NAME
	};

	const command = new ScanCommand(param);
	const data = await db.send(command);
	return json(data);
}) satisfies RequestHandler;

export const POST = (async ({ request }) => {
	const body = (await request.json()) as Content;

	const params: PutCommandInput = {
		TableName: TABLE_NAME,
		Item: {
			id: body.id,
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			'nome do condomínio': (body as any).nome,
			endereço: body.endereço,
			numero: body.numero,
			apto: body.apto,
			bairro: body.bairro,
			sindico: body.sindico,
			unidades: body.unidades,
			funcionarios: body.funcionarios,
			telefone: body.telefone,
			administradora: body.administradora,
			data: body.data
		}
	};

	const command = new PutCommand(params);
	const data = await db.send(command);
	return json(data);
}) satisfies RequestHandler;
