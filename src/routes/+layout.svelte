<script lang="ts">
	import Dialog from '$lib/components/Dialog.svelte';
	import Form from '$lib/components/Form.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import '@fontsource/roboto/400.css';
	import '@fontsource/roboto/500.css';
	import '../app.css';
	import { easeEmphasizedDecel, easeEmphasizedAccel } from '$lib/easing';
	import { fly } from 'svelte/transition';

	let showDialog = false;

	export let data;

	const routes = [
		{ name: 'home', href: '/', d: 'M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z' },
		{ name: 'condominios', href: '/condominio', d: 'M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z' },
		{ name: 'sobre', href: '/sobre', d: 'M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z' }
	];
</script>

<header class="fixed capitalize bottom-0 z-[999] w-full sm:static md:w-[86px]">
	<div class="hidden h-screen flex-col items-center justify-evenly md:flex">
		<nav class="custom-navbar flex-col items-center gap-y-3 px-3 py-2">
			<ul>
				{#each routes as { href, d, name }, i (i)}
					<li>
						<a
							class="group flex flex-col items-center gap-y-1"
							{href}
							aria-label={`Ir para a página ${name}`}
							aria-current={data.currentPathname === href ? 'page' : null}
							role="tab"
							tabindex="0"
						>
							<div
								class="button group-hover:bg-secondary-container-hover"
								style="background-color:{data.currentPathname === href
									? 'rgb(var(--color-secondary-container))'
									: ''} "
							>
								<span class="fill-on-background group-hover:fill-on-secondary-container">
									<Icon d={data.currentPathname === href ? d : d} />
								</span>
							</div>
							<span>
								{name}
							</span>
						</a>
					</li>
				{/each}
			</ul>
		</nav>
		<div>
			<button
				on:click={() => (showDialog = !showDialog)}
				class="fab fab-normal interactive-bg-tertiary-container fill-on-tertiary-container"
			>
				<Icon d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
			</button>
		</div>
	</div>
	<div class="flex w-full flex-col gap-y-2 md:hidden">
		<div class="self-end pr-8">
			<div>
				<button
					on:click={() => (showDialog = !showDialog)}
					class="fab fab-normal interactive-bg-tertiary-container fill-on-tertiary-container"
				>
					<Icon d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
				</button>
			</div>
		</div>
		<nav class="custom-navbar h-20 w-full flex-row bg-background px-2 py-0">
			{#each routes as { href, d, name }, i (i)}
				<a
					{href}
					class="group"
					aria-label={`Ir para a página ${href}`}
					aria-current={data.currentPathname === href ? 'page' : null}
					role="tab"
					tabindex="0"
				>
					<div
						class="group-hover:bg-secondary-container-hover"
						style="background-color:{data.currentPathname === href
							? 'rgb(var(--color-secondary-container))'
							: ''} "
					>
						<span class="fill-on-background group-hover:fill-on-secondary-container">
							<Icon d={data.currentPathname === href ? d : d} />
						</span>
					</div>
					<span>{name}</span>
				</a>
			{/each}
		</nav>
	</div>
</header>

{#key data.currentPathname}
	<main
		in:fly={{ y: -5, duration: 250, delay: 250, easing: easeEmphasizedDecel }}
		out:fly={{ y: 5, duration: 250, easing: easeEmphasizedAccel }}
		class="flex flex-1 flex-col gap-2 overflow-auto p-3"
	>
		<slot />
	</main>
{/key}

<Dialog title="Novo Condominio" confirmLabel="Enviar" cancelLabel="Cancelar" bind:open={showDialog}>
	<Form />
</Dialog>

<style lang="scss">
	main.flex {
		min-height: 100dvh;
		min-width: 50dvw;
	}

	.custom-navbar {
		@apply flex flex-none flex-grow-0;
		a {
			@apply order-[0] flex h-20 flex-none flex-grow flex-col items-center justify-center gap-1 px-0 pb-4 pt-3;

			div {
				@apply flex h-8 w-16 items-center justify-center rounded-2xl p-0 transition-colors duration-[250ms];

				span {
					@apply flex h-8 items-center justify-center rounded-2xl;
				}
			}
			span {
				@apply order-1 h-4 flex-none flex-grow-0 self-stretch text-center text-label-small;
			}
		}
	}
</style>
