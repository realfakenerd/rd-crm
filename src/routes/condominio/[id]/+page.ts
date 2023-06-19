import type { Condominio, NominatimOpenAPI } from '$lib/types';
import type { PageLoad } from './$types';

export const load = (async ({ fetch, params }) => {
	const res = await fetch('/api/condominio/' + params.id);
	const data = (await res.json()) as Condominio;

	const resEndereco = await fetch(
		'https://nominatim.openstreetmap.org/search?addressdetails=1&extratags=1&namedetails=1&format=jsonv2&q=' +
			encodeURI(`${data.Item.endereço} ${data.Item.numero} ${data.Item.bairro}`)
	);
	return {
		condominio: data,
		streamed: {
			endereco: resEndereco.json() as Promise<NominatimOpenAPI[]>
		}
	};
}) satisfies PageLoad;
