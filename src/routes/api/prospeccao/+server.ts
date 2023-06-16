import { TABLE_NAME, db } from "$lib/aws";
import {
    ScanCommand,
    type ScanCommandInput
} from '@aws-sdk/lib-dynamodb';
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
export const GET = (async () => {
	const param: ScanCommandInput = {
		TableName: TABLE_NAME
	};

	const command = new ScanCommand(param);
	const data = await db.send(command);
	return json(data);
}) satisfies RequestHandler;