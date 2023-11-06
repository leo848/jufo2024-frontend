<script lang="ts">
	import * as Icon from 'flowbite-svelte-icons';
	import { onMount } from 'svelte';
	import { connectionData, reconnectWebsocket, setStatusCallback } from '../server/websocket';
	import { type ServerStatus, assertNever } from '../server/types';
	import { relativeTimeFromDates } from '../utils/time';
	import { Badge, GradientButton, Popover } from 'flowbite-svelte';

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
	let upload = 0;
	let download = 0;
	$: active = upload > 0 || download > 0;

	const act = (b: boolean) => (b ? 'active' : '');
	$: className = ['circle', setting, act(active)].join(' ');
	$: upClass = ['icon', 'up', act(upload > 0)].join(' ');
	$: downClass = ['icon', 'up', act(download > 0)].join(' ');

	onMount(() => {
		setStatusCallback((ss: ServerStatus) => {
			if (ss.type === 'status') {
				setting = ss.status;
			} else if (ss.type === 'interact') {
				setting = 'online';
				if (ss.status === 'upload') {
					upload += 1;
					let i = setInterval(() => {
						upload -= 0.02;
						if (upload <= 0) {
							upload = 0;
							clearInterval(i);
						}
					}, 20);
				} else if (ss.status === 'download') {
					download += 1;
					let i = setInterval(() => {
						download -= 0.02;
						if (download <= 0) {
							download = 0;
							clearInterval(i);
						}
					}, 20);
				} else {
					assertNever(ss.status);
				}
			} else {
				assertNever(ss);
			}
		});
	});
</script>

<div>
	<div class={className} role="button" tabindex="0" on:keypress={() => {}}>
		<div class={upClass} style={'opacity: ' + upload}>
			<Icon.ArrowUpSolid />
		</div>
		<div class={downClass} style={'opacity: ' + download}>
			<Icon.ArrowDownSolid />
		</div>
	</div>
	<Popover>
		<div class="min-w-20 m-4">
			<p class="mb-2 text-xl font-bold">Serververbindung</p>
			<GradientButton color="teal" class="transition mb-4" on:click={reconnectWebsocket}>
				<Icon.RotateOutline class="mr-4" />
				<div>Neu verbinden</div>
			</GradientButton>
			<p class="font-normal min-w-40">
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
			</p>
		</div>
	</Popover>
</div>

<style>
	.tooltip {
		display: none;
	}

	.tooltip.active {
		display: block;
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
