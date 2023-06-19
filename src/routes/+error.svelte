<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="card bg-error-container h-full justify-center gap-2">
    <h1 class="text-headline-small">{$page.status}</h1>
    <h2 class="text-display-large">{$page.error?.message}</h2>

    <p>{$page.url.pathname}</p>

    <a class="underline" href="/">vá para pagina inicial</a>
</div>