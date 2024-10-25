<script lang="ts">
	import { type Writable } from 'svelte/store';
	import Icon from '@iconify/svelte';
	import { draggable, type DragEventData } from '@neodrag/svelte';
	import { type AppProps } from '$lib';
	import { activeApp } from './app';

	export let appProps: Writable<AppProps> | undefined;

	const handleDrag = (e: CustomEvent<DragEventData>, direction: string) => {
		const dx = e.detail.offsetX;
		const dy = e.detail.offsetY;

		if (!$appProps || !main) return;

		translate = main.style.transform || 'translate3d(0px, 0px, 0px)';

		const size = (value: number) => {
			return Math.min(Math.max(value, 50), 500);
		}

		if (direction.includes('n')) {
			$appProps.interface.size.height = size(height - dy);
		} else if (direction.includes('s')) {
			$appProps.interface.size.height = size(height + dy);
		}

		if (direction.includes('w')) {
			$appProps.interface.size.width = size(width - dx);
		} else if (direction.includes('e')) {
			$appProps.interface.size.width = size(width + dx);
		}

		if (direction === 'sw' || direction === 'w' || direction === 'nw') {
			npos.x = position.x + $appProps.interface.size.width;
		} else if (direction === 'ne' || direction === 'e' || direction === 'se') {
			npos.x = position.x;
		}

		if (direction === 'nw' || direction === 'n' || direction === 'ne') {
			npos.y = position.y + $appProps.interface.size.height;
		} else if (direction === 'sw' || direction === 's' || direction === 'se') {
			npos.y = position.y;
		}
	};

	let width = 0, height = 0;
	let dpos = { x: 0, y: 0 };

	let main: HTMLElement | null = null;

	let npos = { x: 0, y: 0 };
	let position = { x: 0, y: 0 };

	let translate = 'translate3d(0px, 0px, 0px)';

	let sw = 0, sh = 0;

	const directions = [
		{
			direction: 'nw',
			style: 'w-2 h-2 -top-2 -left-2 cursor-nw-resize',
		},
		{
			direction: 'ne',
			style: 'w-2 h-2 -top-2 -right-2 cursor-ne-resize',
		},
		{
			direction: 'sw',
			style: 'w-2 h-2 -bottom-2 -left-2 cursor-sw-resize',
		},
		{
			direction: 'se',
			style: 'w-2 h-2 -bottom-2 -right-2 cursor-se-resize',
		},
		{
			direction: 'w',
			style: 'w-2 h-[calc(100%-25px)] top-[25px] -left-2 cursor-w-resize',
		},
		{
			direction: 'e',
			style: 'w-2 h-[calc(100%-25px)] top-[25px] -right-2 cursor-e-resize',
		},
		{
			direction: 's',
			style: 'w-full h-2 -bottom-2 left-0 cursor-s-resize',
		},
	]
</script>

<svelte:window bind:innerWidth={sw} bind:innerHeight={sh} />

{#if $appProps}
	<main
		bind:this={main}
		use:draggable={{
			handle: '.drag',
			position,
		}}
		on:pointerdown={() => { if ($appProps) activeApp.set($appProps)}}
		style="
				width: {$appProps.interface.size.width}px;
				height: {$appProps.interface.size.height + 25}px;
				display: grid;
				grid-template-rows: 25px 1fr;
				transform: {translate};
		"
		class="relative shadow-lg shadow-slate-400/20 {$activeApp === $appProps ? 'z-10' : 'z-0'}"
	>
		<div
			class="w-full h-full z-10 pointer-events-none absolute top-0 left-0 rounded-lg transition-[background] duration-300 {$activeApp === $appProps ? 'bg-black/0' : 'bg-black/20'}"
		></div>
		{#each directions as dir}
			<div
				role="button"
				tabindex="0"
				class="absolute {dir.style}"
				use:draggable={{
					position: dpos,
					onDragStart: () => {
						width = $appProps.interface.size.width;
						height = $appProps.interface.size.height;
					},
					onDrag: () => {
						dpos = { x: 0, y: 0 };
						npos = { x: 0, y: 0 };
					}
				}}
				on:neodrag={(e) => handleDrag(e, dir.direction)}
			></div>
		{/each}
		<header
			class="w-full h-[25px] px-1 flex justify-between items-center bg-slate-600/50 text-slate-50 backdrop-blur-md rounded-t-lg"
			role="button"
			tabindex="0"
		>
			<div class="w-[60px] h-full pl-1 flex justify-start items-center">
				<Icon icon="mdi:menu" />
			</div>
			<div class="drag w-full h-full flex justify-center">
				<h1>{$appProps.app.name}</h1>
			</div>
			<div class="w-[60px] flex flex-row justify-center items-center">
				<div>
					<Icon icon="mdi:window-minimize" />
				</div>
				<div>
					<Icon icon="mdi:window-maximize" />
				</div>
				<div>
					<Icon icon="mdi:window-close" />
				</div>
			</div>
		</header>
		<div class="w-full h-full relative bg-slate-50 rounded-b-lg">
			<svelte:component this={$appProps.component} />
		</div>
	</main>
{/if}
