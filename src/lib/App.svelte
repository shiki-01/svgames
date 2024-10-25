<script lang="ts">
	import { type Writable } from 'svelte/store';
	import Icon from '@iconify/svelte';
	import { draggable, type DragEventData } from '@neodrag/svelte';
	import { type AppProps } from '$lib';
	import { activeApp } from './app';

	export let appProps: Writable<AppProps> | undefined;

	let mainElement: HTMLElement | null = null;

	let tl: HTMLDivElement | null = null;
	let tr: HTMLDivElement | null = null;
	let bl: HTMLDivElement | null = null;
	let br: HTMLDivElement | null = null;
	let l: HTMLDivElement | null = null;
	let r: HTMLDivElement | null = null;
	let b: HTMLDivElement | null = null;

	const handleDrag = (e: CustomEvent<DragEventData>, direction: string) => {
		const dx = e.detail.offsetX;
		const dy = e.detail.offsetY;

		if (!$appProps) return;

		switch (direction) {
			case 'se':
				$appProps.interface.size.width = Math.min(Math.max(width + dx, 50), 500);
				$appProps.interface.size.height = Math.min(Math.max(height + dy, 50), 500);
				break;
			case 'e':
				$appProps.interface.size.width = Math.min(Math.max(width + dx, 50), 500);
				break;
			case 's':
				$appProps.interface.size.height = Math.min(Math.max(height + dy, 50), 500);
				break;
			case 'sw':
				position.x = Math.min(Math.max(npos.x + dx, 0), sw - $appProps.interface.size.width);
				$appProps.interface.size.width = Math.min(Math.max(width - dx, 50), 500);
				$appProps.interface.size.height = Math.min(Math.max(height + dy, 50), 500);
				break;
			case 'w':
				position.x = Math.min(Math.max(npos.x + dx, 0), sw - $appProps.interface.size.width);
				$appProps.interface.size.width = Math.min(Math.max(width - dx, 50), 500);
				break;
			case 'nw':
				position.x = Math.min(Math.max(npos.x + dx, 0), sw - $appProps.interface.size.width);
				position.y = Math.min(Math.max(npos.y + dy, 0), sh - $appProps.interface.size.height);
				$appProps.interface.size.width = Math.min(Math.max(width + dx, 50), 500);
				$appProps.interface.size.height = Math.min(Math.max(height - dy, 50), 500);
				break;
			case 'n':
				position.y = Math.min(Math.max(npos.y + dy, 0), sh - $appProps.interface.size.height);
				$appProps.interface.size.height = Math.min(Math.max(height - dy, 50), 500);
				break;
			case 'ne':
				position.y = Math.min(Math.max(npos.y + dy, 0), sh - $appProps.interface.size.height);
				$appProps.interface.size.width = Math.min(Math.max(width + dx, 50), 500);
				$appProps.interface.size.height = Math.min(Math.max(height - dy, 50), 500);
				break;
		}
	};

	let width = 0, height = 0
	let dpos = { x: 0, y: 0 };

	let npos = { x: 0, y: 0 };
	let position = { x: 0, y: 0 };

	let sw = 0, sh = 0;
</script>

<svelte:window bind:innerWidth={sw} bind:innerHeight={sh} />

{#if $appProps}
	<main
		bind:this={mainElement}
		use:draggable={{
			handle: '.drag',
			position,
		}}
		on:pointerdown={() => { if ($appProps) activeApp.set($appProps)}}
		style="
            width: {$appProps.interface.size.width}px;
            height: {$appProps.interface.size.height}px;
        "
		class="relative shadow-lg shadow-slate-400/20 {$activeApp === $appProps ? 'z-10' : 'z-0'}"
	>
	    <div
		    class="w-full h-[calc(100%+25px)] z-10 pointer-events-none absolute top-0 left-0 rounded-lg transition-[background] duration-300 {$activeApp === $appProps ? 'bg-black/0' : 'bg-black/20'}"
		></div>
		<div
			role="button"
			tabindex="0"
			bind:this={tl}
			class="w-2 h-2 absolute -top-1 -left-1"
			use:draggable={{
				position: dpos,
				onDragStart: () => { width = $appProps.interface.size.width; height = $appProps.interface.size.height; },
				onDrag: () => { dpos = { x: 0, y: 0 }; npos = { x: 0, y: 0 } }
			}}
			on:neodrag={(e) => handleDrag(e, 'nw')}
		></div>
		<div
		    role="button"
		    tabindex="0"
		    bind:this={tr}
			class="w-2 h-2 absolute -top-1 -right-1"
			use:draggable={{
				position: dpos,
				onDragStart: () => { width = $appProps.interface.size.width; height = $appProps.interface.size.height; },
				onDrag: () => { dpos = { x: 0, y: 0 }; npos = { x: 0, y: 0 } }
			}}
			on:neodrag={(e) => handleDrag(e, 'ne')}
		></div>
		<div
		    role="button"
			tabindex="0"
			bind:this={bl}
			class="w-2 h-2 absolute -bottom-7 -left-1"
			use:draggable={{
				position: dpos,
				onDragStart: () => { width = $appProps.interface.size.width; height = $appProps.interface.size.height; },
				onDrag: () => { dpos = { x: 0, y: 0 } }
			}}
			on:neodrag={(e) => handleDrag(e, 'sw')}
		></div>
		<div
		    role="button"
			tabindex="0"
		    bind:this={br}
			class="w-2 h-2 absolute -bottom-7 -right-1"
			use:draggable={{
				position: dpos,
				onDragStart: () => { width = $appProps.interface.size.width; height = $appProps.interface.size.height; },
				onDrag: () => { dpos = { x: 0, y: 0 } }
			}}
			on:neodrag={(e) => handleDrag(e, 'se')}
		></div>
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
			<div
			    role="button"
				tabindex="0"
				bind:this={l}
				class="w-2 h-[calc(100%-4px)] absolute top-0 -left-2"
				use:draggable={{
					position: dpos,
					onDragStart: () => { width = $appProps.interface.size.width; height = $appProps.interface.size.height; },
					onDrag: () => { dpos = { x: 0, y: 0 }; npos = { x: 0, y: 0 } }
				}}
				on:neodrag={(e) => handleDrag(e, 'w')}
			></div>
			<div
			    role="button"
				tabindex="0"
				bind:this={r}
				class="w-2 h-[calc(100%-4px)] absolute top-0 -right-2"
				use:draggable={{
					position: dpos,
					onDragStart: () => { width = $appProps.interface.size.width; height = $appProps.interface.size.height; },
					onDrag: () => { dpos = { x: 0, y: 0 }; npos = { x: 0, y: 0 } }
				}}
				on:neodrag={(e) => handleDrag(e, 'e')}
			></div>
			<div
			    role="button"
				tabindex="0"
				bind:this={b}
				class="w-[calc(100%-4px)] h-2 absolute -bottom-2 left-0"
				use:draggable={{
					position: dpos,
					onDragStart: () => { width = $appProps.interface.size.width; height = $appProps.interface.size.height; },
					onDrag: () => { dpos = { x: 0, y: 0 }; npos = { x: 0, y: 0 } }
				}}
				on:neodrag={(e) => handleDrag(e, 's')}
			></div>
			<svelte:component this={$appProps.component} />
		</div>
	</main>
{/if}
