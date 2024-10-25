<script lang="ts">
    import '../app.css'
    import Header from '$lib/Header.svelte';
</script>

<svelte:document
    on:touchmove={e => e.preventDefault()}
    on:touchstart={e => e.preventDefault()}
/>

<main class="w-[100svw] h-[100svh] bg-[url(https://s3-ap-northeast-1.amazonaws.com/cdn.appli-world.jp/production/imgs/images/000/052/023/pc.jpg?1542708740)] bg-center bg-cover">
    <div class="w-full h-full bg-slate-50/20 fixed top-0 left-0"></div>
    <div class="w-full p-2">
        <Header />
    </div>
    <div>
        <slot />
    </div>
</main>

<style>
    :global(html) {
        overflow: hidden;
        touch-action: none;
        -webkit-user-select: none;
        -webkit-touch-callout: none;
        user-select: none;
    }
</style>