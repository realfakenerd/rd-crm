<script lang="ts">
	import icons from '$lib/assets/icons';
	import type { Content } from '../types';
	import Icon from './Icon.svelte';

	export let content: Content = {
		'nome do condomínio': '',

		//@ts-expect-error
		endereço: '',
		numero: '',
		//@ts-expect-error
		bairro: '',
		sindico: '',
		apto: '0',
		telefone: '(21) 0000-0000',
		unidades: '0',
		administradora: '',
		funcionarios: '0',
		data: '',
		id: 's-s-s-s-s'
	};
</script>

<section
	id={content.id}
	class="card interactive-bg-surface-variant w-full gap-2 fill-on-surface-variant"
>
	<hgroup style:--tag="h-{content['nome do condomínio'].split(' ').join('-')}">
		<h1 class="text-title-large capitalize">
			{content['nome do condomínio']}
		</h1>
		<address class="inline-flex items-center gap-2 text-title-small">
			<Icon width={14} d={icons.condominio} />
			<span class="capitalize">
				{content.endereço}, {content.numero} - {content.bairro}
			</span>
		</address>
	</hgroup>
	<div class="flex flex-col gap-2 text-body-medium capitalize">
		<section class="flex flex-col">
			<div class=" inline-flex items-center gap-1">
				<Icon width={14} d={icons.sindico} />
				<h1>Sindico - {content.sindico}</h1>
			</div>
			<div class="inline-flex items-center gap-1">
				<Icon width={14} d={icons.administradora} />
				<h2>Administradora - {content.administradora}</h2>
			</div>
		</section>

		<section class="flex flex-col text-body-medium">
			<div class="inline-flex items-center gap-1">
				<Icon width={14} d={icons.hash} />
				<h3>
					Unidades: {content.unidades.includes('0') ? 'Não informado' : content.unidades}
				</h3>
			</div>

			<div class="inline-flex items-center gap-1">
				<Icon width={14} d={icons.group_people} />
				<h3>
					funcionarios: {content.funcionarios.includes('0')
						? 'Não informado'
						: content.funcionarios}
				</h3>
			</div>
		</section>
	</div>

	<div class="inline-flex flex-wrap items-center justify-between gap-1">
		<a
			href={`tel:+55${content.telefone}`}
			class={content.telefone.includes('(21) 0000-0000') ? 'cursor-not-allowed' : 'cursor-pointer'}
		>
			<address class="chips items-center bg-surface text-on-surface">
				<div class="chips-layer" />
				<div class="chips-content inline-flex items-center fill-on-surface pl-2">
					<Icon width={18} height={18} d={icons.telephone} />
					{content.telefone.includes('(21) 0000-0000') ? 'Sem telefone' : content.telefone}
				</div>
			</address>
		</a>

		<a class="btn interactive-bg-primary" href={`/condominios/${content.id}`}>
			<Icon d={icons.plus} /> info
		</a>
	</div>
</section>
