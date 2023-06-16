<script lang="ts">
	import Map from '$lib/components/Map.svelte';

	export let data;
	const { localData } = data;

	const coord = {
		lat: parseFloat(localData[0].lat),
		lon: parseFloat(localData[0].lon)
	};

	
</script>

<div class="card card-filled">
    <h1 class="text-display-medium">{localData[0].namedetails.name}</h1>
</div>
    
<Map bbox={localData[0].boundingbox} {coord} markerName={localData[0].address.road} />
