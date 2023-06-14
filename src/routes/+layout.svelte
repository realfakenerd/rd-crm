<script lang="ts">
	import parseXLSX, { key } from '$lib/parseXLSX';
	import type { ProspeccaoDef } from '$lib/types';
	import { writable } from '@macfja/svelte-persistent-store';
	import '../app.css';

	let files: FileList = {
		length: 0,
		item: function (index: number): File | null {
			throw new Error('Function not implemented.');
		},
		[Symbol.iterator]: function (): IterableIterator<File> {
			throw new Error('Function not implemented.');
		}
	};

	let xlsx = writable<ProspeccaoDef<'Junho'>>(key, {
		Junho: {
			head: [],
			content: []
		}
	});

	async function read() {
		const reader = new FileReader();
		const file = files[0];

		const fileArray = await file.arrayBuffer();
		reader.onload = () => {
			const data = new Uint8Array(fileArray);
			//@ts-expect-error aaaa
			if ($xlsx.Junho.head.length === 0) xlsx.set(parseXLSX(data, true));
		};
		reader.readAsArrayBuffer(file);
	}
</script>

<header>
	<input type="file" bind:files on:change={read} />
</header>
<main class=" p-3">
	<slot />
</main>
