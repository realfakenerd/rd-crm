import { extractFormData } from '$lib/utils';
import type { Actions } from './$types';

export const actions: Actions = {
	criar: async ({ request, fetch }) => {
		const data = extractFormData(await request.formData());

		const res = await fetch('/api/condominio', {
			method: 'POST',
			body: JSON.stringify({ id: crypto.randomUUID(), ...data })
		});
		
		if (res.ok) {
			return { success: true };
		}

		return { success: false };
	}
};
