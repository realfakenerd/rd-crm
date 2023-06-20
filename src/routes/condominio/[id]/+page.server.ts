import { extractFormData } from '$lib/utils';
import type { Actions } from './$types';

export const actions = {
	atualizar: async ({ request, fetch, params }) => {
		const { administradora, sindico, unidades, funcionarios, endereço } = extractFormData(
			await request.formData()
		);

		const res = await fetch('/api/condominio/' + params.id, {
			method: 'PUT',
			body: JSON.stringify({ administradora, sindico, unidades, funcionarios, endereço })
		});

		if (res.ok) {
			return { success: true };
		}

		return { success: false };
	}
} satisfies Actions;
