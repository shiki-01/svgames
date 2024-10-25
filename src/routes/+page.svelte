<script lang="ts">
    import App from "$lib/App.svelte";
    import apps from "$lib/app";
	import { writable } from "svelte/store";
</script>

{#each apps as app}
    <App appProps={writable(app)} />
{/each}