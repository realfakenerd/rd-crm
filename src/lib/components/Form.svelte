<script>
	import TextField from './TextField.svelte';
</script>

<form class="flex flex-col gap-2">
	<TextField title="Nome" />
	<div class="flex flex-col md:flex-row w-full gap-2">
		<section class="flex flex-col w-full">
			<TextField title="Endereço" />
			<section class="flex flex-row gap-2">
				<TextField title="Numero" />
				<TextField title="Apto" />
			</section>
			<TextField title="Bairro" />
		</section>

		<section class="flex flex-col w-full">
            <TextField title="Sindico" />
			<section class="flex flex-row gap-2 w-full">
				<TextField title="Unidades" />
				<TextField title="Funcionários" />
			</section>
            <TextField title="Telefone" />
		</section>
	</div>
	<TextField title="Administradora" />
	<TextField isDate title="Data" />
</form>
