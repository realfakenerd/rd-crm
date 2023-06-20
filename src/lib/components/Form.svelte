<script>
	import icons from '$lib/assets/icons';
	import Icon from './Icon.svelte';
	import TextField from './TextField.svelte';
</script>

<form action="?/criar" method="post" class="flex flex-col gap-5">
	<TextField icon={icons.condominio} title="Nome" />
	<div class="flex w-full flex-col gap-2 md:flex-row">
		<section class="flex w-full flex-col gap-3">
			<TextField icon={icons.map} title="Endereço" />
			<section class="flex flex-row gap-2">
				<TextField icon={icons.hash} title="Numero" />
				<TextField icon={icons.hash} title="Apto" />
			</section>
			<TextField icon={icons.map} title="Bairro" />
		</section>

		<section class="flex w-full flex-col gap-3">
			<TextField icon={icons.person} title="Sindico" />
			<section class="flex w-full flex-row gap-2">
				<TextField icon={icons.hash} title="Unidades" />
				<TextField icon={icons.group_people} title="Funcionarios" />
			</section>
			<TextField icon={icons.telephone} title="Telefone" />
		</section>
	</div>

	<div class="flex flex-col md:flex-row gap-2">
		<TextField icon={icons.administradora} title="Admnistradora" />
		<TextField icon={icons.calendar_today} isDate title="Data" />
	</div>

	<button type="submit" class="icon-left interactive-bg-primary text-label-large btn self-center w-1/4">
		<Icon d={icons.upload} />
		Enviar
	</button>
</form>
