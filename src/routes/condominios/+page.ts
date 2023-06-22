import { writable } from 'svelte/store';
import type { ProspeccaoDDB } from '$lib/types';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const res = await fetch('/api/condominio');
	const data = (await res.json()) as ProspeccaoDDB;

	return {
		prospeccao: writable(data)
	};
};
