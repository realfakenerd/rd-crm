import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET = (async () => {
	return json({
		prospeccao: '/api/prospeccao',
		condominio: '/api/condominio'
	});
}) satisfies RequestHandler;
