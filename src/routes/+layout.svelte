<script lang="ts">
	import Dialog from '$lib/components/Dialog.svelte';
	import Form from '$lib/components/Form.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import '../app.css';
	import '@fontsource/roboto/400.css';
	import '@fontsource/roboto/500.css';

	let showDialog = false;
</script>

<main class="flex flex-col gap-2 p-3">
	<slot />
</main>

<Dialog title="Novo Condominio" confirmLabel="Enviar" cancelLabel="Cancelar" bind:open={showDialog}>
	<Form />
</Dialog>
<div class="fixed bottom-4 right-4">
	<button
		on:click={() => (showDialog = !showDialog)}
		class="fab fab-normal interactive-bg-tertiary-container fill-on-tertiary-container"
	>
		<Icon d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
	</button>
</div>
