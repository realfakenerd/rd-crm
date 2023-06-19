<script lang="ts">
	import type { Content } from '$lib/types';
	import Icon from './Icon.svelte';

	export let content: Content;

</script>

<section
	id={content.id}
	
	class="card interactive-bg-surface-variant w-full gap-2 fill-on-surface-variant"
>
	<hgroup>
		<h1 class="text-title-large capitalize">
			{content['nome do condomínio']}
		</h1>
		<address class="inline-flex items-center gap-2 text-title-small">
			<Icon
				width={14}
				d={`M17,11V3H7v4H3v14h8v-4h2v4h8V11H17z M7,19H5v-2h2V19z M7,15H5v-2h2V15z M7,11H5V9h2V11z M11,15H9v-2h2V15z M11,11H9V9h2 V11z M11,7H9V5h2V7z M15,15h-2v-2h2V15z M15,11h-2V9h2V11z M15,7h-2V5h2V7z M19,19h-2v-2h2V19z M19,15h-2v-2h2V15z`}
			/>
			<span class="capitalize">
				{content.endereço}, {content.numero} -{content.bairro}
			</span>
		</address>
	</hgroup>
	<div class="flex flex-col gap-2 text-body-medium capitalize">
		<section class="flex flex-col">
			<div class=" inline-flex items-center gap-1">
				<Icon
					width={14}
					d={`M12 5.9c1.16 0 2.1.94 2.1 2.1s-.94 2.1-2.1 2.1S9.9 9.16 9.9 8s.94-2.1 2.1-2.1m0 9c2.97 0 6.1 1.46 6.1 2.1v1.1H5.9V17c0-.64 3.13-2.1 6.1-2.1M12 4C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 9c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z`}
				/>
				<h1>Sindico - {content.sindico}</h1>
			</div>
			<div class="inline-flex items-center gap-1">
				<Icon
					width={14}
					d={`M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z`}
				/>
				<h2>Administradora - {content.administradora}</h2>
			</div>
		</section>

		<section class="flex flex-col text-body-medium">
			<div class="inline-flex items-center gap-1">
				<Icon
					width={14}
					d="M20,10V8h-4V4h-2v4h-4V4H8v4H4v2h4v4H4v2h4v4h2v-4h4v4h2v-4h4v-2h-4v-4H20z M14,14h-4v-4h4V14z"
				/>
				<h3>
					Unidades: {content.unidades.includes('0') ? 'Não informado' : content.unidades}
				</h3>
			</div>

			<div class="inline-flex items-center gap-1">
				<Icon
					width={14}
					d="M4,13c1.1,0,2-0.9,2-2c0-1.1-0.9-2-2-2s-2,0.9-2,2C2,12.1,2.9,13,4,13z M5.13,14.1C4.76,14.04,4.39,14,4,14 c-0.99,0-1.93,0.21-2.78,0.58C0.48,14.9,0,15.62,0,16.43V18l4.5,0v-1.61C4.5,15.56,4.73,14.78,5.13,14.1z M20,13c1.1,0,2-0.9,2-2 c0-1.1-0.9-2-2-2s-2,0.9-2,2C18,12.1,18.9,13,20,13z M24,16.43c0-0.81-0.48-1.53-1.22-1.85C21.93,14.21,20.99,14,20,14 c-0.39,0-0.76,0.04-1.13,0.1c0.4,0.68,0.63,1.46,0.63,2.29V18l4.5,0V16.43z M16.24,13.65c-1.17-0.52-2.61-0.9-4.24-0.9 c-1.63,0-3.07,0.39-4.24,0.9C6.68,14.13,6,15.21,6,16.39V18h12v-1.61C18,15.21,17.32,14.13,16.24,13.65z M8.07,16 c0.09-0.23,0.13-0.39,0.91-0.69c0.97-0.38,1.99-0.56,3.02-0.56s2.05,0.18,3.02,0.56c0.77,0.3,0.81,0.46,0.91,0.69H8.07z M12,8 c0.55,0,1,0.45,1,1s-0.45,1-1,1s-1-0.45-1-1S11.45,8,12,8 M12,6c-1.66,0-3,1.34-3,3c0,1.66,1.34,3,3,3s3-1.34,3-3 C15,7.34,13.66,6,12,6L12,6z"
				/>
				<h3 class="	">
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
					<Icon
						width={18}
						height={18}
						d={`M6.54 5c.06.89.21 1.76.45 2.59l-1.2 1.2c-.41-1.2-.67-2.47-.76-3.79h1.51m9.86 12.02c.85.24 1.72.39 2.6.45v1.49c-1.32-.09-2.59-.35-3.8-.75l1.2-1.19M7.5 3H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.49c0-.55-.45-1-1-1-1.24 0-2.45-.2-3.57-.57-.1-.04-.21-.05-.31-.05-.26 0-.51.1-.71.29l-2.2 2.2c-2.83-1.45-5.15-3.76-6.59-6.59l2.2-2.2c.28-.28.36-.67.25-1.02C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1z`}
					/>
					{content.telefone.includes('(21) 0000-0000') ? 'Sem telefone' : content.telefone}
				</div>
			</address>
		</a>

		<a class="btn interactive-bg-primary" href={`/condominio/${content.id}`}>
			<Icon d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" /> info
		</a>
	</div>
</section>
