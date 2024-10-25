<script lang="ts">
    import { settings } from "$lib/cookies";
	import { json } from "@sveltejs/kit";
	import { onMount } from "svelte";

    let hour: string = ''
    let min: string = ''
    let sec: string = ''

    let style: ':.' | ':-' = ':.'
    let isSec: boolean = true

    const updateTime = () => {
        const is24 = $settings.clock.is24

        const now = new Date()
        const h = now.getHours()
        const m = now.getMinutes()
        const s = now.getSeconds()

        hour = (is24 ? h < 10 ? `0${h}`: h : h % 12 < 10 ? `0${h % 12}` : h % 12 || 12).toString()
        min = (m < 10 ? `0${m}` : m).toString()
        sec = (s < 10 ? `0${s}` : s).toString()
    }

    $: {
        style = $settings.clock.style
        isSec = $settings.clock.isSec

        updateTime()
    }

    onMount(() => {
        const interval = setInterval(updateTime, 1000)
        return () => clearInterval(interval)
    })
</script>

<header class="w-full h-[40px] py-2 px-5 z-50 bg-slate-600/50 text-slate-50 backdrop-blur-md shadow-md shadow-slate-600/50 rounded-full grid grid-cols-3 items-center">
    <div class="w-full flex justify-start">h</div>
    <div class="w-full flex flex-row justify-center">
        <span>{hour}</span>
        <span>{style.split('')[0]}</span>
        <span>{min}</span>
        {#if isSec}
            <span>{style.split('')[1]}</span>
            <span>{sec}</span>
        {/if}
    </div>
    <div class="w-full flex justify-end">y</div>
</header>