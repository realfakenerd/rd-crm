<script lang="ts">
	import icons from '$lib/assets/icons.js';
	import Icon from '$lib/components/Icon.svelte';
	import Map from '$lib/components/Map.svelte';
	import TextField from '$lib/components/TextField.svelte';

	export let data;
	const { condominio, streamed } = data;
	const cond = condominio.Item;

	const markerName = `Condominio ${cond['nome do condomínio']}, ${cond.endereço} - ${cond.numero}`;

	let hiddenForm = true;
</script>

<svelte:head>
	<title>Condominio - {cond['nome do condomínio']}</title>
</svelte:head>

<div class="card card-filled">
	<h1 class="text-display-medium capitalize">Condominio {cond['nome do condomínio']}</h1>
</div>

<section class="flex w-full flex-col gap-2 md:flex-row">
	<div class="card card-filled w-full gap-2 text-body-medium">
		<section class="inline-flex items-center justify-between">
			<h2 class="text-title-large">Info</h2>
			<div>
				<button
					on:click={() => (hiddenForm = !hiddenForm)}
					class="icon-left btn interactive-bg-secondary"
				>
					<Icon width={18} d={icons.edit} />
					<span class="text-label-large"> Editar </span>
				</button>
				<button class="icon-left btn interactive-bg-error">
					<Icon width={18} d={icons.remove} />
					<span class="text-label-large"> Remover </span>
				</button>
			</div>
		</section>
		{#if hiddenForm}
			<ul class="list rounded bg-surface capitalize">
				<li class="item list-lines-2">
					<div class="list-item-body">
						<h2 class="list-headline">Administradora</h2>
						<p class="list-description">{cond.administradora}</p>
					</div>
				</li>
				<hr class="divider-list-inset" />
				<li class="list-lines-2 item">
					<div class="list-item-body">
						<h2 class="list-headline">Sindico</h2>
						<p class="list-description">{cond.sindico}</p>
					</div>
				</li>
				<hr class="divider-list-inset" />
				<li class="list-lines-2 item">
					<div class="list-item-body">
						<h2 class="list-headline">Unidades</h2>
						<p class="list-description">{cond.unidades}</p>
					</div>
				</li>
				<hr class="divider-list-inset" />
				<li class="list-lines-2 item">
					<div class="list-item-body">
						<h2 class="list-headline">Funcionarios</h2>
						<p class="list-description">{cond.funcionarios}</p>
					</div>
				</li>
				<hr class="divider-list-inset" />
				<li class="list-lines-2 item">
					<div class="list-item-body">
						<h2 class="list-headline">Endereco</h2>
						<p class="list-description">{cond.endereço}, {cond.bairro} - {cond.numero}</p>
					</div>
				</li>
			</ul>
		{:else}
			<form
				action="?/atualizar"
				method="POST"
				class="flex flex-col gap-3 rounded bg-surface px-2 py-3"
			>
				<TextField
					bind:value={cond.administradora}
					icon={icons.administradora}
					title="Admnistradora"
				/>
				<TextField bind:value={cond.sindico} icon={icons.sindico} title="Sindico" />
				<section class="flex flex-row gap-2">
					<TextField bind:value={cond.unidades} icon={icons.hash} title="Unidades" />
					<TextField
						bind:value={cond.funcionarios}
						icon={icons.group_people}
						title="Funcionarios"
					/>
				</section>
				<TextField bind:value={cond.endereço} icon={icons.condominio} title="Endereço" />
				<button class="btn interactive-bg-primary w-full text-label-large" type="submit">
					Enviar
				</button>
			</form>
		{/if}
	</div>

	{#await streamed.endereco}
		<div
			id="mapDivAwait"
			class="mapDivAwait card w-full animate-pulse items-center justify-center bg-surface-variant fill-tertiary"
		>
			<Icon
				width={64}
				d="M12 12c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm6-1.8C18 6.57 15.35 4 12 4s-6 2.57-6 6.2c0 2.34 1.95 5.44 6 9.14 4.05-3.7 6-6.8 6-9.14zM12 2c4.2 0 8 3.22 8 8.2 0 3.32-2.67 7.25-8 11.8-5.33-4.55-8-8.48-8-11.8C4 5.22 7.8 2 12 2z"
			/>
		</div>
	{:then value}
		{#if value.length > 0}
			{@const v = value[0]}
			<Map
				bbox={v.boundingbox}
				coord={{ lat: parseFloat(v.lat), lon: parseFloat(v.lon) }}
				{markerName}
			/>
		{:else}
			<div class="mapDivAwait card w-full bg-error">
				<h1 class="text-title-large">Não foi possível carregar o mapa</h1>
				<p class="text-body-large">:(</p>
			</div>
		{/if}
	{/await}
</section>

{#await streamed.endereco}
	<div
		id="mapDivAwait"
		class="mapDivAwait card w-full animate-pulse items-center justify-center bg-surface-variant fill-tertiary"
	>
		<Icon
			width={64}
			d="M12 12c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm6-1.8C18 6.57 15.35 4 12 4s-6 2.57-6 6.2c0 2.34 1.95 5.44 6 9.14 4.05-3.7 6-6.8 6-9.14zM12 2c4.2 0 8 3.22 8 8.2 0 3.32-2.67 7.25-8 11.8-5.33-4.55-8-8.48-8-11.8C4 5.22 7.8 2 12 2z"
		/>
	</div>
{:then value}
	{#if value.length > 0}
		{@const v = value[0]}
		<iframe
			title="gmap"
			src={'https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d20000!2d' +
				v.lon +
				'!3d' +
				v.lat +
				'!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2suk!4v1486486434098'}
			width="600"
			height="450"
			style="border:0;"
			loading="lazy"
			referrerpolicy="no-referrer-when-downgrade"
		/>
	{:else}
		<div class="mapDivAwait card w-full bg-error">
			<h1 class="text-title-large">Não foi possível carregar o mapa</h1>
			<p class="text-body-large">:(</p>
		</div>
	{/if}
{/await}

<div style="width: 100%">
	<iframe
		title="m"
		width="100%"
		height="600"
		frameborder="0"
		scrolling="no"
		marginheight="0"
		marginwidth="0"
		src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=1%20Grafton%20Street,%20Dublin,%20Ireland+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
	/>
</div>

<style>
	@import 'leaflet/dist/leaflet.css';
	.mapDivAwait {
		min-height: 50dvh;
	}

	.list-item-body {
		margin-top: auto;
		margin-bottom: auto;
		margin-left: 0px;
		margin-right: 0px;
		display: flex;
		flex: 1 1 0%;
		flex-direction: column;
		overflow: hidden;
	}
</style>
