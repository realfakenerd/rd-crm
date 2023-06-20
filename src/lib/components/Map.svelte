<script lang="ts">
	import type { LayerGroup, Map } from 'leaflet';
	import { onDestroy, onMount } from 'svelte';
	export let bbox: string[] = [];
	export let markerName = '';
	export let coord = {
		lat: 0,
		lon: 0
	};

	let map: Map | LayerGroup<any>;
	let mapDiv: HTMLDivElement;

	export let v;

	onMount(async () => {
		const leafLet = await import('leaflet');
		console.log(bbox);
		
		console.log(leafLet.latLng(parseFloat(bbox[0]), parseFloat(bbox[2])));
		console.log(leafLet.latLng(parseFloat(bbox[1]), parseFloat(bbox[3])));

		map = leafLet
			.map(mapDiv, {
				preferCanvas: true
			})
			.fitBounds(
				[
					[parseFloat(bbox[0]), parseFloat(bbox[2])],
					[parseFloat(bbox[1]), parseFloat(bbox[3])]
				],
				
			);

		console.log(coord);

		leafLet
			.tileLayer(
				'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?access_token=zIfM2mGEZ8pdHVp2nR1nvWqcuX7W2ZjoNOzPZz98',
				{
					accessToken: 'zIfM2mGEZ8pdHVp2nR1nvWqcuX7W2ZjoNOzPZz98',
					attribution: 'Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright'
				}
			)
			.addTo(map);
		leafLet.marker({ lat: coord.lat, lng: coord.lon }).addTo(map).bindPopup(markerName).openPopup();
	});

	onDestroy(async () => {
		if (map) {
			console.log('Unloading Leaflet map.');
			map.remove();
		}
	});
</script>

<div class="card w-full capitalize" id="mapDiv" bind:this={mapDiv} />

<style>
	#mapDiv {
		min-height: 50dvh;
	}
</style>
