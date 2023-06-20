<script lang="ts">
	import icons from '$lib/assets/icons';
	import Dialog from '$lib/components/Dialog.svelte';
	import Form from '$lib/components/Form.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import '@fontsource/roboto/400.css';
	import '@fontsource/roboto/500.css';
	import { fly } from 'svelte/transition';
	import '../app.css';

	export let data;

	const routes = [
		{
			name: 'home',
			href: '/',
			d: {
				o: 'M12 5.69l5 4.5V18h-2v-6H9v6H7v-7.81l5-4.5M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z',
				f: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z'
			}
		},
		{
			name: 'condominios',
			href: '/condominio',
			d: { o: icons.condominio, f: icons.condominio }
		}
	];
</script>

<header style="z-index: 1500;" class="fixed bottom-0 w-full capitalize sm:static md:w-[86px]">
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
									<Icon d={data.currentPathname === href ? d.f : d.o} />
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
	</div>
	<div class="flex w-full flex-col gap-y-2 md:hidden">
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
							<Icon d={data.currentPathname === href ? d.f : d.o} />
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
		in:fly={{ y: -5, duration: 250, delay: 250 }}
		out:fly={{ y: 5, duration: 250 }}
		class="flex flex-1 flex-col gap-2 overflow-auto p-3"
	>
		<slot />
	</main>
{/key}

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
