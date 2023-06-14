import type { NominatimOpenAPI } from '$lib/types';

export const load = async ({ fetch, params }) => {
	const res = await fetch('/api/condominio/' + params.endereco);
	const data = await res.json();

	console.log(data);

	return {
		localData: data as NominatimOpenAPI[]
	};
};
