<script lang="ts" type="module">
	import icons from '$lib/assets/icons.js';
	import Card from '$lib/components/Card.svelte';
	import Dialog from '$lib/components/Dialog.svelte';
	import Form from '$lib/components/Form.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import TextField from '$lib/components/TextField.svelte';
	export let data;
	const { prospeccao } = data;

	let searchValue = '';

	let showDialog = false;
</script>

<svelte:head>
	<title>Apsa - Condominios</title>
</svelte:head>

<Dialog title="Novo Condominio" bind:open={showDialog}>
	<Form />
</Dialog>

<section class="flex w-full flex-col items-center gap-2" data-page="condominios">
	<section class="flex w-full flex-col justify-between gap-2 md:flex-row">
		<div class="flex flex-row-reverse justify-between gap-2 md:flex-row md:justify-start">
			<button
				on:click={() => (showDialog = !showDialog)}
				class="fab fab-normal interactive-bg-tertiary-container fill-on-tertiary-container"
			>
				<Icon d={icons.plus} />
			</button>
			<h1 class="text-display-medium">Condominios</h1>
		</div>
		<div class="w-full md:w-1/2">
			<TextField bind:value={searchValue} title="Pesquise" icon={icons.search} />
		</div>
	</section>
</section>

<ul class="grid place-items-center justify-center gap-2">
	{#each $prospeccao.Items as items, index (items.id)}
		<Card content={items} {index} />
	{/each}
</ul>

<style lang="postcss">
	ul.grid {
		grid-template-columns: repeat(auto-fill, minmax(22rem, 1fr));
	}
</style>
