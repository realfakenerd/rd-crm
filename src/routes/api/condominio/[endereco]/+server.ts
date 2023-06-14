import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
export const GET = (async ({fetch, params, setHeaders}) => {
	setHeaders({
		'cache-control': 'public, maxage=3600'
	});
	const res = await fetch(
		'https://nominatim.openstreetmap.org/search?addressdetails=1&extratags=1&namedetails=1&format=jsonv2&q=' +
			params.endereco
	);
	const data = await res.json();

	return json(data);
}) satisfies RequestHandler;
