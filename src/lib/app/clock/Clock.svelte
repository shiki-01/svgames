<script lang="ts">
    import Icon from "@iconify/svelte"

    const utils = [
        { name: "Clock", id: 'clock', icon: "clock-time-four-outline" },
        { name: "Timer", id: 'timer', icon: "av-timer" },
        { name: "Stop Watch", id: 'stopwatch', icon: "stopwatch-outline" }
    ]

    let selected: "clock" | "timer" | "stopwatch" = "clock"
</script>

<div class="w-full h-full px-6 py-4 grid grid-rows-[1fr_40px] gap-2">
    <div></div>
    <div class="w-full flex flex-row justify-between">
        {#each utils as util}
            <div class="flex flex-row gap-1 justify-center items-center {util.id === selected ? 'text-sky-500' : 'text-sky-950'}">
                <div>{util.name}</div>
                <Icon icon="mdi:{util.icon}" />
            </div>
        {/each}
    </div>
</div>