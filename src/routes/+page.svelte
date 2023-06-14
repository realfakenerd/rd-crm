<script lang="ts">
	import { easeEmphasizedDecel } from '$lib/easing';
	import { key } from '$lib/parseXLSX';
	import type { ProspeccaoDef } from '$lib/types';
	import { writable } from '@macfja/svelte-persistent-store';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';

	let xlsx = writable<ProspeccaoDef<'Junho'>>(key, {
		Junho: {
			content: [],
			head: []
		}
	});

	let init = false;
	onMount(() => (init = true));
</script>

<ul class="grid gap-2 place-items-center justify-center">
	{#each $xlsx.Junho.content as content, i (i)}
		{#if init}
			<a
				in:fly={{
					easing: easeEmphasizedDecel,
					duration: 500,
					y: 5,
					delay: Math.round(Math.random() * (i * 50))
				}}
				href={`/condominio/${encodeURI(`${content.endereço} ${content.numero} ${content.bairro}`)}`}
				class="card gap-2 card-filled w-full bg-slate-500"
			>
				<h1 class="capitalize text-title-large">{content['nome do condomínio']} - {content.bairro}</h1>
                <div class="capitalize flex flex-col">
                    <h1 class="text-body-large">Sindico: {content.sindico}</h1>
                    <h2 class="text-body-medium">Administradora: {content.administradora}</h2>
                    <div>
                        <h3 class="text-body-medium">Unidades: {content.unidades === 0 ? 'Não informado' : content.unidades}</h3>
                        <h3 class="text-body-medium">funcionarios: {content.funcionarios === 0 ? 'Não informado' : content.funcionarios}</h3>
                    </div>
                </div>

				<div class="inline-flex flex-wrap gap-1">
					<address class="chips bg-surface text-on-surface">
						<div class="chips-layer" />
						<span class="chips-content">
							{content.endereço}
							{content.numero}
						</span>
					</address>
					<address class="chips bg-surface text-on-surface">
						<div class="chips-layer" />
						<a class="chips-content" href={`tel:+55${content.telefone}`}>
							{content.telefone.includes('(21) 0000-0000') ? 'Sem telefone' : content.telefone}
						</a>
					</address>
				</div>
			</a>
		{/if}
	{/each}
</ul>

<style>
	ul.grid {
		grid-template-columns: repeat(auto-fill, minmax(22rem,1fr));
	}
</style>
