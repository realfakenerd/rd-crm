<script>
	import TextField from './TextField.svelte';
</script>

<form class="flex flex-col gap-2">
	<TextField title="Nome" />
	<div class="flex w-full flex-col gap-2 md:flex-row">
		<section class="flex w-full flex-col">
			<TextField title="Endereço" />
			<section class="flex flex-row gap-2">
				<TextField title="Numero" />
				<TextField title="Apto" />
			</section>
			<TextField title="Bairro" />
		</section>

		<section class="flex w-full flex-col">
			<TextField title="Sindico" />
			<section class="flex w-full flex-row gap-2">
				<TextField title="Unidades" />
				<TextField title="Funcionários" />
			</section>
			<TextField title="Telefone" />
		</section>
	</div>
	<TextField title="Administradora" />
	<TextField isDate title="Data" />
</form>
