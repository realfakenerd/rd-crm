<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import TextField from '$lib/components/TextField.svelte';
	import type { Content } from '$lib/types';
	import { onMount } from 'svelte';

	const filters = [
		'nome do condomínio',
		'endereço',
		'numero',
		'bairro',
		'sindico',
		'apto',
		'telefone',
		'unidades',
		'administradora',
		'funcionarios',
		'data',
		'id'
	];

	let init = false;
	onMount(() => (init = true));

	let searchValue = '';
	let chaveSelecionada = 'numero';
	$: filterOjb = (obj: Content) => {
		const lsearch = searchValue.toLowerCase();
		const key = obj[chaveSelecionada as keyof Content]?.toLowerCase();
		return key?.includes(lsearch);
	};

	$: filteredItems = $prospeccao.Items.filter(filterOjb);
	$: count = filteredItems.length;

	export let data;
	const { prospeccao } = data;
</script>

<svelte:head>
	<title>Apsa - Condominios</title>
</svelte:head>

<section>
	<h1 class="text-display-medium">Condominios</h1>
</section>

<section class="flex w-full flex-col items-center gap-2">
	<div style="width: 50dvw;">
		<TextField
			supportingText={searchValue ? `${count} de resultados` : ''}
			bind:value={searchValue}
			title="Pesquise"
			icon="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
		/>
	</div>
	<ul class="inline-flex min-w-[50%] flex-wrap gap-1">
		{#each filters as filter, i (i)}
			{@const id = crypto.randomUUID()}
			{@const name = crypto.randomUUID()}
			{@const selected = chaveSelecionada === filter ? true : false}
			<label class="chips items-center {selected ? 'chips-selected' : ''}" for={id}>
				<div class="chips-layer" />
				<div class="chips-content">
					<input
						on:change={() => {
							searchValue = '';
							chaveSelecionada = filter;
						}}
						class="absolute opacity-0"
						type="radio"
						{name}
						bind:group={chaveSelecionada}
						value={filter}
						{id}
					/>
					{filter}
				</div>
			</label>
		{/each}
	</ul>
</section>

<ul class="grid place-items-center justify-center gap-2">
	{#each filteredItems as content (content.id)}
		{#if init}
			<Card {content} />
		{/if}
	{/each}
</ul>

<style lang="postcss">
	ul.grid {
		grid-template-columns: repeat(auto-fill, minmax(22rem, 1fr));
	}
</style>
