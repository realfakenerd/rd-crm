<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import Map from '$lib/components/Map.svelte';

	export let data;
	const { condominio, streamed } = data;
	const cond = condominio.Item;

	const markerName = `Condominio ${cond['nome do condomínio']}, ${cond.endereço} - ${cond.numero}`
</script>


<div class="card card-filled">
    <h1 class="text-display-medium capitalize">Condominio {cond['nome do condomínio']}</h1>
</div>
<div class="card card-filled text-body-medium">
	<h2 class="text-title-large">Info</h2>
    <p class="capitalize">
		Administradora: {cond.administradora} <br>
		Sindico: {cond.sindico}
	</p>
</div>

{#await streamed.endereco}
	<div
		id="mapDivAwait"
		class="mapDivAwait card animate-pulse items-center justify-center bg-surface-variant fill-tertiary"
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
		<div class="mapDivAwait card bg-error">
			<h1 class="text-title-large">Não foi possível carregar o mapa</h1>
			<p class="text-body-large">:(</p>
		</div>
	{/if}
{/await}

<style>
	@import 'leaflet/dist/leaflet.css';
	.mapDivAwait {
		height: 50dvh;
	}
</style>
