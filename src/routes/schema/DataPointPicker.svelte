<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import type { DataPoint, PossibleDataPoint, Schema } from './types';
	import { Modal } from 'flowbite-svelte';

	export let schema: Schema;
	export let initialValue: DataPoint | null = null;

	const dispatch = createEventDispatcher<{ create: DataPoint; cancel: null }>();

	let modal = true;

	let partial: PossibleDataPoint =
		initialValue == null ? schema.stubPossibleDataPoint() : initialValue.toInvalidated();

	function requestCreation() {
		let result = schema.validateDataPoint(partial);
		if (!result.success) {
			error = result.error;
		} else {
			modal = false;
			dispatch('create', result.value);
		}
	}

	let error: string | null = null;
	$: partial, (error = null);

	let titleElement: HTMLInputElement;
	onMount(() => titleElement.select());
</script>

<div class="inline-block transition picker h-n4 m-0 p-0">
	<Modal
		bind:open={modal}
		backdropClass="modal-background"
		size="xl"
		defaultClass="dark:bg-black dark:backdrop-blur dark:bg-clip-padding dark:backdrop-filter dark:backdrop-blur-xl dark:bg-opacity-10 dark:border dark:border-gray-800"
	>
		<div slot="header">
			<p class="text-2xl 2xl:text-4xl text-bold 2xl:my-2 dark:text-white text-black">
				Datenpunkt hinzufügen
			</p>
		</div>
		{#if error}
			<div class="w-full p-5 dark:bg-red-700 bg-red-300 dark:text-white text-black rounded">
				{error}
			</div>
		{/if}
		<div>
			<div>Titel</div>
			<input
				type="text"
				bind:this={titleElement}
				class="dark:bg-gray-800 rounded text-lg w-full"
				bind:value={partial.name}
			/>
		</div>
		<hr class="opacity-20" />
		<div>
			{#each schema.numericDimensions as dim, index}
				<div class="mb-4">
					<div>{dim.name}</div>
					<div class="flex flex-row gap-4">
						{#if dim.min != null && dim.max != null}
							<input
								bind:value={partial.numericDimensions[index]}
								type="range"
								class="dark:bg-transparent rounded text-lg w-full"
								min={dim?.min}
								max={dim?.max}
								step={dim?.step ?? 0.01}
							/>
						{/if}
						<input
							type="number"
							class="dark:bg-gray-800 rounded text-lg w-full"
							min={dim?.min}
							max={dim?.max}
							step={dim?.step}
							bind:value={partial.numericDimensions[index]}
						/>
					</div>
				</div>
			{/each}
		</div>
		{#if schema.optionDimensions.length}
			<hr class="opacity-20" />
			<div>
				{#each schema.optionDimensions as dim, index}
					<div class="mb-4">
						<div>{dim.name}</div>
						<div class="flex flex-row gap-4">
							<select
								class="dark:bg-gray-800 rounded text-lg w-full"
								bind:value={partial.optionDimensions[index]}
							>
								{#each dim.options as option}
									<option value={option}>{option}</option>
								{/each}
							</select>
						</div>
					</div>
				{/each}
			</div>
		{/if}
		<div slot="footer">
			<form class="text-xl">
				<button
					class="rounded p-2 dark:bg-gray-300 dark:text-black bg-green-400 text-white"
					on:click={requestCreation}
				>
					{#if initialValue != null}
						Speichern
					{:else}
						Erstellen
					{/if}
				</button>
				<button
					class="rounded p-2 dark:bg-gray-800 bg-gray-200"
					on:click={() => {
						modal = false;
						dispatch('cancel');
					}}>Abbrechen</button
				>
			</form>
		</div>
	</Modal>
</div>

<style>
	:global(.picker .modal-background) {
		z-index: 40;
		inset: 0;
		position: fixed;
		background: #111;
		opacity: 0.5;
	}
</style>
