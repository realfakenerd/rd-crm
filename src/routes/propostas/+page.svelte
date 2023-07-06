<script lang="ts">
	import parseXLSX from '$lib/parseXLSX';

	let files: FileList = {
		length: 0,
		item: function (index: number): File | null {
			throw new Error('Function not implemented.');
		},
		[Symbol.iterator]: function (): IterableIterator<File> {
			throw new Error('Function not implemented.');
		}
	};

	async function log (){
		const file = files[0];
        const buffer = await file.arrayBuffer();
        
        const excel = parseXLSX(buffer);
        
        console.log(excel);
        

	}
</script>

<input type="file" bind:files on:change={log} />
