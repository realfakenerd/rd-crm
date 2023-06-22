import { beforeNavigate } from '$app/navigation';
import { navigating } from '$app/stores';
import { onDestroy } from 'svelte';

type StringOrNull = string | null;
export function extractFormData(data: FormData) {
	const administradora = data.get('Admnistradora') as StringOrNull;
	const sindico = data.get('Sindico') as StringOrNull;
	const unidades = data.get('Unidades') as StringOrNull;
	const funcionarios = data.get('Funcionarios') as StringOrNull;
	const endereço = data.get('Endereço') as StringOrNull;
	const numero = data.get('Numero') as StringOrNull;
	const apto = data.get('Apto') as StringOrNull;
	const bairro = data.get('Bairro') as StringOrNull;
	const nome = data.get('Nome') as StringOrNull;
	const telefone = data.get('Telefone') as StringOrNull;
	const calendarData = data.get('Data') as StringOrNull;

	return {
		nome,
		endereço,
		numero,
		apto,
		bairro,
		sindico,
		unidades,
		funcionarios,
		telefone,
		administradora,
		data: calendarData
	};
}

function getNavigationStore() {
	const callbacks: ((val?: never) => void)[] = [];

	const navigation = {
		...navigating,
		complete: async () => {
			await new Promise((res) => {
				callbacks.push(res);
			});
		}
	};

	
	
	// This used to subscribe inside the callback, but that resolved the promise too early
	const unsub = navigating.subscribe((n) => {
		if (n === null) {
			while (callbacks.length > 0) {
				const res = callbacks.pop();
				res?.();
			}
		}
	});

	onDestroy(() => {
		unsub();
	});

	return navigation;
}

export const preparePageTransition = () => {
	const navigation = getNavigationStore();

	
	// before navigating, start a new transition
	beforeNavigate(() => {
		if (!document.startViewTransition) {
			return;
		}
		const navigationComplete = navigation.complete();
		
		document.startViewTransition(async () => {
			await navigationComplete;
		});
	});
};
