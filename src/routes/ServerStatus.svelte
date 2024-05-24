<script lang="ts">
	import * as Icon from 'flowbite-svelte-icons';
	import { onDestroy, onMount } from 'svelte';
	import {
		connectionData,
		reconnectWebsocket,
		setStatusCallback,
		updateConnectionData
	} from '../server/websocket';
	import { type ServerStatus, assertNever } from '../server/types';
	import { relativeTimeFromDates } from '../utils/time';
	import { Badge, GradientButton, Popover } from 'flowbite-svelte';
	import { tweened } from 'svelte/motion';
	import { quartInOut } from 'svelte/easing';

	const extractors = [
		{
			key: 'firstConnected',
			title: 'Verbunden',
			icon: Icon.DesktopPcOutline
		},
		{ key: 'lastRequest', title: 'Letzte Anfrage', icon: Icon.UploadOutline },
		{ key: 'lastResponse', title: 'Letzte Antwort', icon: Icon.DownloadOutline }
	] as const;

	let setting = 'offline';
	let neverOnline: boolean = true;
	const tweenOptions = { duration: 1000, easing: quartInOut };
	let upload = tweened(0, tweenOptions);
	let download = tweened(0, tweenOptions);
	$: active = $upload > 0 || $download > 0;

	const act = (b: boolean) => (b ? 'active' : '');
	$: className = ['circle', setting, act(active)].join(' ');
	$: upClass = ['icon', 'up', act($upload > 0)].join(' ');
	$: downClass = ['icon', 'up', act($download > 0)].join(' ');

	let interval: null | NodeJS.Timeout = null;
	let popupElt: HTMLElement | null = null;
	$: if (popupElt == null) {
		if (interval !== null) clearInterval(interval);
	} else {
		if (interval !== null) clearInterval(interval);
		interval = setInterval(updateConnectionData, 5000);
	}
	onDestroy(() => interval && clearInterval(interval));

	onMount(() => {
		setStatusCallback((ss: ServerStatus) => {
			if (ss.type === 'status') {
				setTimeout(() => (setting = ss.status), 200);
			} else if (ss.type === 'interact') {
				setting = 'online';
				if (ss.status === 'upload') {
					upload.update((n) => n + 1, { duration: 500 });
					setTimeout(() => upload.update((n) => n - 1), 500);
				} else if (ss.status === 'download') {
					download.update((n) => n + 1, { duration: 500 });
					setTimeout(() => download.update((n) => n - 1), 500);
				} else {
					assertNever(ss.status);
				}
			} else {
				assertNever(ss);
			}
			if (setting == 'online') neverOnline = false;
		});
	});
</script>

<div>
	<div
		class={className}
		on:click={updateConnectionData}
		role="button"
		tabindex="0"
		on:keypress={() => {}}
	>
		<div class={upClass} style={'opacity: ' + $upload}>
			<Icon.ArrowUpSolid />
		</div>
		<div class={downClass} style={'opacity: ' + $download}>
			<Icon.ArrowDownSolid />
		</div>
	</div>
	<Popover class="zindex9" trigger="click">
		<div bind:this={popupElt} class="min-w-20 m-2 zindex9">
			<p class="mb-2 text-xl font-bold">Serververbindung</p>
			<GradientButton
				color="teal"
				class="transition mb-4"
				on:click={() => {
					upload.set(0);
					download.set(0);
					reconnectWebsocket();
				}}
			>
				<Icon.RotateOutline class="mr-4" />
				<div>Neu verbinden</div>
			</GradientButton>
			<div class="font-normal min-w-40">
				{#if setting === 'offline'}
					<p class="mb-3">Verbindung getrennt</p>
				{:else if setting === 'loading'}
					<p class="mb-3">Verbindung wird hergestellt...</p>
				{:else if setting === 'online'}
					<p class="mb-3">Verbindung hergestellt</p>
				{/if}
				{#if neverOnline}
					<hr />
					<p class="mb-3 mt-3 max-w-40">
						Zum Ausführen von Sortierungen muss das Serverprogramm heruntergeladen und ausgeführt
						werden. Dazu kann der Quelltext über GitHub heruntergeladen werden: <a
							class="underline text-white underline-offset-2 hover:underline-offset-4 transition-all"
							href="https://github.com/leo848/jufo2024-backend">leo848/jufo2024-backend – GitHub</a
						>
					</p>
				{/if}
				{#each extractors as { key, title, icon }}
					{#if $connectionData[key]}
						<div class="flex justify-between items-center">
							<p class="mb-3">
								<b>{title}</b><br />
								<Badge color="dark" border large>
									<Icon.ClockSolid class="w-3 h-3 mr-2" />
									{relativeTimeFromDates($connectionData[key])}
								</Badge>
							</p>
							<svelte:component this={icon} class="ml-4" />
						</div>
					{/if}
				{/each}
				{#if $connectionData.latency}
					<div class="flex justify-between items-center">
						<p class="mb-3">
							<b>Latenz</b><br />
							<Badge color="dark" border large>
								<Icon.UploadOutline class="w-3 h-3 mr-2" />
								{$connectionData.latency.serverToClient}ms
							</Badge>
							<Badge color="dark" border large>
								<Icon.DownloadOutline class="w-3 h-3 mr-2" />
								{$connectionData.latency.clientToServer}ms
							</Badge>
						</p>
						<svelte:component this={Icon.ClockOutline} class="ml-4" />
					</div>
				{/if}
			</div>
		</div>
	</Popover>
</div>

<style>
	.zindex9 {
		z-index: 99;
	}

	.circle {
		border-radius: 100%;
		width: 40px;
		height: 40px;
		transition: all 0.2s ease;
		overflow: hidden;
		transform: scale(1.3);
	}

	.circle.online {
		background-color: darkgreen;
		box-shadow: 11px 19px 39px -20px rgba(255, 255, 255, 0.7) inset;
		animation: swoop 8s infinite ease-in;
	}

	@keyframes swoop {
		0% {
			box-shadow: 19px 19px 19px -20px rgba(255, 255, 255, 0.7) inset;
		}
		25% {
			box-shadow: 19px -19px 19px -20px rgba(255, 255, 0, 0.7) inset;
		}
		50% {
			box-shadow: -19px -19px 19px -20px rgba(255, 128, 255, 0.7) inset;
		}
		75% {
			box-shadow: -19px 19px 19px -20px rgba(0, 255, 255, 0.7) inset;
		}
		100% {
			box-shadow: 19px 19px 19px -20px rgba(255, 255, 255, 0.7) inset;
		}
	}

	.circle.online.active {
		transform: perspective(800px) scale(1.4);
	}

	.circle.online:hover {
		background-color: green;
		box-shadow: 21px 29px 39px -20px rgba(255, 255, 255, 0.7) inset;
	}

	.circle.offline {
		background: linear-gradient(
			302deg,
			rgba(175, 7, 7, 1) 0%,
			rgba(255, 0, 0, 1) 23%,
			rgba(69, 0, 0, 1) 100%
		);
	}

	.circle.loading {
		background-color: yellow;
		box-shadow: 21px 29px 20px -20px rgba(255, 100, 0, 0.9) inset;
		animation: turn 1s infinite;
	}

	.circle.loading:hover {
		animation: none;
	}

	.circle > .icon {
		display: none;
	}

	.circle.online > .icon.active {
		position: absolute;
		width: 50px;
		height: 50px;
		transform: translate(9px, 9px);
		transition: ease-in;
		color: white;
	}

	.circle.online > .icon.active.up {
		display: block;
		/* animation: scroll-up 1s; */
	}

	.circle.online > .icon.active.down {
		display: block;
		/* animation: scroll-down 1s; */
	}

	@keyframes scroll-down {
		from {
			display: block;
			transform: translate(4px, 44px);
		}
		to {
			display: block;
			transform: translate(4px, -36px);
		}
	}

	@keyframes scroll-up {
		from {
			display: block;
			transform: translate(4px, -36px);
		}
		to {
			display: block;
			transform: translate(4px, 44px);
		}
	}

	@keyframes pulse {
		from {
			filter: blur(0%);
			background-image: radial-gradient(
				circle,
				rgba(255, 255, 255, 1) 0%,
				rgba(255, 0, 0, 1) 23%,
				darkgreen 62%
			);
		}
		to {
			filter: blur(1000%);
			background-image: radial-gradient(
				circle,
				rgba(255, 255, 255, 1) 0%,
				rgba(255, 0, 0, 1) 23%,
				darkgreen 62%
			);
		}
	}

	@keyframes turn {
		from {
			transform: scale(1.3) rotate(0deg);
		}
		to {
			transform: scale(1.3) rotate(360deg);
		}
	}
</style>
