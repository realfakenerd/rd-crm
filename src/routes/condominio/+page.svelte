<script lang="ts">
	import icons from '$lib/assets/icons.js';
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

<section class="flex w-full flex-col items-center gap-2">
	<section class="flex w-full flex-col md:flex-row justify-between">
		<h1 class="text-display-medium">Condominios</h1>
		<div class="w-full md:w-1/2">
			<TextField
				supportingText={searchValue ? `${count} de resultados` : ''}
				bind:value={searchValue}
				title="Pesquise"
				icon={icons.search}
			/>
		</div>
	</section>
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
