import type { Actions } from './$types';

export const actions = {
	atualizar: async ({ request, fetch, params }) => {
		const data = await request.formData();
		const administradora = data.get('Admnistradora');
		const sindico = data.get('Sindico');
		const unidades = data.get('Unidades');
		const funcionarios = data.get('Funcionarios');
		const endereço = data.get('Endereço');

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
