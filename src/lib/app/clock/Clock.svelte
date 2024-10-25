<script lang="ts">
    import Icon from "@iconify/svelte"
		import { settings } from '$lib/cookies';
		import { onMount } from 'svelte';

		const utils = [
        { name: "Clock", id: 'clock', icon: "clock-time-four-outline" },
        { name: "Timer", id: 'timer', icon: "av-timer" },
        { name: "Stop Watch", id: 'stopwatch', icon: "stopwatch-outline" }
    ]

    let selected: string = "clock"

		let style: ':.' | ':-' = ':.';

		$: {
			style = $settings.clock.style;
			updateTime();
		}

		let hour: string = '';
		let min: string = '';
		let sec: string = '';

		const updateTime = () => {
			const is24 = $settings.clock.is24;

			const now = new Date();
			const h = now.getHours();
			const m = now.getMinutes();
			const s = now.getSeconds();

			hour = (is24 ? h < 10 ? `0${h}` : h : h % 12 < 10 ? `0${h % 12}` : h % 12 || 12).toString();
			min = (m < 10 ? `0${m}` : m).toString();
			sec = (s < 10 ? `0${s}` : s).toString();
		};

		onMount(() => {
			const interval = setInterval(updateTime, 1000);
			return () => clearInterval(interval);
		});
</script>

<div class="w-full h-full px-6 py-4 grid grid-rows-[1fr_40px] gap-2">
    <div class="w-full h-full flex justify-center items-center">
        {#if selected === "clock"}
            <div class="w-full h-full flex flex-col">
                <div class="w-full h-full flex justify-center items-center">
									<span class="min-w-[60px] w-1/2 relative aspect-square rounded-full border-2 border-slate-800">
										<span
											style="
												transform: translate(0%, -50%) rotate(calc(30deg * {hour} - 90deg));
												transform-origin: left;
											"
											class="w-1/5 h-1 bg-slate-800 absolute top-1/2 left-1/2"
										></span>
										<span
											style="
												transform: translate(0%, -50%) rotate(calc(6deg * {min} - 90deg));
												transform-origin: left;
											"
											class="w-1/4 h-1 bg-slate-800 absolute top-1/2 left-1/2"
										></span>
										<span
											style="
												transform: translate(0%, -50%) rotate(calc(6deg * {sec} - 90deg));
												transform-origin: left;
											"
											class="w-1/3 h-0.5 bg-slate-800 absolute top-1/2 left-1/2"
										></span>
									</span>
                </div>
            </div>
        {/if}
        {#if selected === "timer"}
            <div></div>
        {/if}
        {#if selected === "stopwatch"}
            <div></div>
        {/if}
    </div>
    <div class="w-full flex flex-row justify-between">
        {#each utils as util}
            <button
              on:click={() => selected = util.id}
              class="flex flex-row gap-1 justify-center items-center transition-colors duration-300 {util.id === selected ? 'text-sky-500' : 'text-sky-950'}"
            >
                <span>{util.name}</span>
                <Icon icon="mdi:{util.icon}" />
            </button>
        {/each}
    </div>
</div>