<script lang="ts">
	import { enterExit, outroClass } from '$lib/animation';
	import { easeEmphasizedAccel, easeEmphasizedDecel } from '$lib/easing';

	import { createEventDispatcher, tick } from 'svelte';

	export let title: string;
	export let confirmLabel: string;
	export let cancelLabel: string | null = null;
	export let preventDismiss = false;
	const dispatch = createEventDispatcher();
	export let open = false;
	export let isErrorModal = false;
	let dialog: HTMLDialogElement;
	$: {
		if (!dialog) break $;
		tick().then(() => {
			if (open && !dialog.hasAttribute('open')) {
				dialog.showModal();
			} else if (!open && dialog.hasAttribute('open')) {
				dialog.close();
			}
		});
	}
</script>

{#key open}
	<dialog
		tabindex="-1"
		aria-labelledby="modal-title"
		class='md:max-w-[70dvw] {isErrorModal ? 'bg-error-container' : 'bg-surface'}'
		bind:this={dialog}
		aria-modal={open}
		aria-hidden={!open}
		on:cancel|preventDefault={() => {
			if (preventDismiss) return;
			open = false;
			dispatch('closed', { method: 'browser' });
		}}
		on:click={() => {
			if (preventDismiss) return;
			open = false;
			dispatch('closed', { method: 'clickedOutside' });
		}}
		in:enterExit={{ duration: 400, easing: easeEmphasizedDecel }}
		out:enterExit={{ duration: 200, easing: easeEmphasizedAccel }}
		use:outroClass
	>
		<div class="container" on:click|stopPropagation aria-describedby="modal-description">
			<div id="modal-description" class="sr-only">{title}. {confirmLabel}. {cancelLabel}</div>
			<h2 class="text-headline-small" role="heading" aria-level="2">{title}</h2>
			<div class="text-body-medium w-full text-on-error-container/70"><slot /></div>

			{#if confirmLabel}
				<div class="buttons">
					{#if cancelLabel}
						<button
							class="btn {isErrorModal
								? 'interactive-bg-error-container'
								: 'interactive-bg-primary-container'}"
							on:click={() => {
								open = false;
								dispatch('closed', { method: 'clickCancel' });
							}}
						>
							{cancelLabel}
						</button>
					{/if}
					<button
						aria-label="Fechar"
						class="btn {isErrorModal ? 'interactive-bg-error' : 'interactive-bg-primary'}"
						on:click={() => {
							open = false;
							dispatch('closed', { method: 'clickConfirm' });
						}}
					>
						{confirmLabel}
					</button>
				</div>
			{/if}
		</div>
	</dialog>
{/key}

<style lang="postcss">
	dialog {
		@apply overflow-auto rounded-[1.75rem] border-none p-0 w-full mx-auto;
	}
	dialog::backdrop {
		background-color: rgb(0 0 0 / 0.5);
		animation: backdropIn 500ms;
	}
	:global(.leaving):is(dialog)::backdrop {
		animation: backdropOut 250ms;
	}
	@keyframes backdropIn {
		from {
			background-color: rgb(0 0 0 / 0);
		}
		to {
			background-color: rgb(0 0 0 / 0.5);
		}
	}
	@keyframes backdropOut {
		from {
			background-color: rgb(0 0 0 / 0.5);
		}
		to {
			background-color: rgb(0 0 0 / 0);
		}
	}
	.container {
		@apply flex min-w-[17.5rem] flex-col gap-y-4 p-6;
	}
	.buttons {
		@apply flex justify-end gap-x-2;
	}
</style>
