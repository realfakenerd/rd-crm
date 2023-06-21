<script lang="ts">
	import type { GeoCodeData } from '$lib/types';
	import { Map, Marker, NavigationControl, Popup } from 'maplibre-gl';
	import 'maplibre-gl/dist/maplibre-gl.css';
	import { onDestroy, onMount } from 'svelte';
	export let markerName = '';

	let map: Map;
	let mapDiv: HTMLDivElement;

	export let value: GeoCodeData[] = [];

	function encontrarCentro(coordenadas: GeoCodeData[]) {
		let somaLat = 0;
		let somaLon = 0;

		coordenadas.forEach(function (resultado: GeoCodeData) {
			somaLat += parseFloat(resultado.lat);
			somaLon += parseFloat(resultado.lon);
		});

		const mediaLat = somaLat / coordenadas.length;
		const mediaLon = somaLon / coordenadas.length;

		return { lat: mediaLat, lon: mediaLon };
	}

	onMount(() => {
		const centro = encontrarCentro(value);
		map = new Map({
			maplibreLogo: true,
			antialias: true,
			container: mapDiv,
			style: 'https://api.maptiler.com/maps/streets-v2-dark/style.json?key=3PtdP7z1W2HexsiXHCE7',
			hash: true,
			zoom: 15,
			pitch: 45,
			center: {
				lat: centro.lat,
				lon: centro.lon
			}
		});

		const popup = new Popup().setText(markerName);

		value.forEach((val) => {
			new Marker({
				color: 'rgb(var(--color-primary))'
			})
				.setLngLat({
					lon: parseFloat(val.lon),
					lat: parseFloat(val.lat)
				})
				.setPopup(popup)
				.addTo(map);
		});

		map.addControl(new NavigationControl(), 'top-right');
	});

	onDestroy(async () => {
		if (map) {
			console.log('Unloading Leaflet map.');
			map.remove();
		}
	});
</script>

<div class="card w-full bg-surface-variant" id="mapDiv" bind:this={mapDiv} />

<style>
	#mapDiv {
		min-height: 50dvh;
	}
</style>
