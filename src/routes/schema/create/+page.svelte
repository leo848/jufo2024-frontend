<script lang="ts">
	import * as Icon from 'flowbite-svelte-icons';
	import SelectButton from '../../../components/SelectButton.svelte';
	import { title } from '../../../ui/navbar';
	import { loadSchemas, loadSchema, saveSchema } from '../storage';
	import { Schema, type NumericDimension, type OptionDimensions, type SchemaType } from '../types';
	import { deepCopy } from '../../../utils/deepMap';
	import SchemaDisplay from '../SchemaDisplay.svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	title.set('Schema erstellen');

	const otherSchemas = loadSchemas();

	let schemaType: SchemaType = {
		name: 'new-schema',
		desc: undefined,
		numericDimensions: [],
		optionDimensions: []
	};

	if ($page.url.searchParams.has('load')) {
		let schemaKey = $page.url.searchParams.get('load') as string;
		let schema: Schema | null = loadSchema(schemaKey);
		if (schema != null) {
			schemaType = schema.deserialize();
		}
	}

	let error: { titleDuplicate: boolean; titleUrlUnsafe: boolean } = {
		titleDuplicate: false,
		titleUrlUnsafe: false
	};
	$: error.titleDuplicate = otherSchemas.some((schema) => schema.name == schemaType.name);
	$: error.titleUrlUnsafe = !urlSafe(schemaType.name);

	function urlSafe(comp: string): boolean {
		return comp == encodeURIComponent(comp);
	}

	const schemaNumericDimensionOptionalEntries = [
		{
			key: 'min',
			name: 'Minimum'
		},
		{
			key: 'max',
			name: 'Maximum'
		},
		{
			key: 'step',
			name: 'Schrittgröße'
		},
		{
			key: 'default',
			name: 'Standardwert'
		}
	] as const;

	const weightOperations: { title: string; desc: string; method: (weight: number) => number }[] = [
		{ title: '^-1', method: (w) => 1 / w, desc: 'Kehrwert' },
		{ title: '/10', method: (w) => w / 10, desc: 'Dezimieren' },
		{ title: '/2', method: (w) => w / 2, desc: 'Halbieren' },
		{ title: '=1', method: (_) => 1, desc: 'Zurücksetzen' },
		{ title: '*2', method: (w) => w * 2, desc: 'Verdoppeln' },
		{ title: '*10', method: (w) => w * 10, desc: 'Verzehnfachen' }
	];

	function addNumericDimension(idx: number | null = null) {
		const newDimension: NumericDimension = {
			name: 'Dimension ' + (idx == null ? schemaType.numericDimensions.length + 1 : idx + 1),
			weight: 1.0,
			max: undefined,
			min: undefined,
			step: undefined,
			default: undefined
		};
		if (idx == null) {
			schemaType.numericDimensions = [...schemaType.numericDimensions, newDimension];
		} else {
			schemaType.numericDimensions[idx] = newDimension;
		}
	}

	function addOptionDimension(idx: number | null = null) {
		const newDimension: OptionDimensions = {
			name: 'Dimension ' + (idx == null ? schemaType.numericDimensions.length + 1 : idx + 1),
			weight: 1.0,
			options: ['Option 1', 'Option 2'],
			default: undefined
		};
		if (idx == null) {
			schemaType.optionDimensions = [...schemaType.optionDimensions, newDimension];
		} else {
			schemaType.optionDimensions[idx] = newDimension;
		}
	}

	$: schemaResult = Schema.fromSchemaType(schemaType);

	function save() {
		if (!schemaResult.success) return;
		const schema = schemaResult.value;

		saveSchema(schema);
		goto('/schema/list?highlight=' + schema.name);
	}
</script>

<div class="mx-4 mt-4 md:mx-32 dark:text-white text-black grid grid-cols-1 gap-4">
	<div>
		<div>Name</div>
		<input
			type="text"
			class="dark:bg-gray-800 rounded text-lg w-full"
			bind:value={schemaType.name}
		/>
		{#if error.titleDuplicate}
			<div class="text-red-500">
				Name nicht verfügbar. Wie wäre es mit
				<b
					><SelectButton
						bind:value={schemaType.name}
						text={schemaType.name.replace(/[-\d]+$/, '') +
							'-' +
							Math.floor(Math.random() * 900 + 100).toString()}
					/></b
				>?
			</div>
		{/if}
		{#if error.titleUrlUnsafe}
			<div class="text-red-500">
				Name nicht URL-sicher. Wie wäre es mit
				<b
					><SelectButton
						bind:value={schemaType.name}
						text={[
							...schemaType.name
								.replaceAll('ä', 'ae')
								.replaceAll('ö', 'oe')
								.replaceAll('ü', 'ue')
								.replaceAll('ß', 'ss')
						]
							.map((char) => (urlSafe(char) ? char : '-'))
							.join('')
							.replaceAll(/-{2,}/g, '-')
							.replaceAll(/(-$)|(^-)/g, '')}
					/></b
				>?
			</div>
		{/if}
	</div>
	<div>
		<div>Beschreibung</div>
		<textarea
			class="dark:bg-gray-800 rounded text-lg w-full"
			placeholder="Beschreibung des neuen Schemas"
			bind:value={schemaType.desc}
		/>
	</div>
	<hr class="opacity-20" />

	<div>Numerische Dimensionen ({schemaType.numericDimensions.length})</div>
	<div class="ml-4 flex flex-col gap-4">
		{#each schemaType.numericDimensions as dim, dimIndex}
			<div class="dark:bg-gray-800 p-2 grid grid-cols-12 gap-4 rounded">
				<div class="col-span-12">
					<div>Name</div>
					<input
						type="text"
						class="dark:bg-gray-700 rounded text-lg w-full"
						bind:value={dim.name}
					/>
				</div>
				<div class="col-span-12">
					<div>Gewichtung</div>
					<div class="flex flex-row gap-4">
						<input
							type="number"
							min="0"
							class="dark:bg-gray-700 rounded text-lg w-full"
							bind:value={dim.weight}
						/>
						{#each weightOperations as op}
							<button
								class="p-2 dark:bg-gray-700 dark:hover:bg-gray-600 rounded"
								title={op.desc}
								on:click={() => (dim.weight = op.method(dim.weight))}>{op.title}</button
							>
						{/each}
					</div>
				</div>
				{#each schemaNumericDimensionOptionalEntries as entry}
					<div class="col-span-12 md:col-span-6">
						<div>{entry.name}</div>
						{#if dim[entry.key] == null}
							<button
								class="p-2 dark:bg-gray-700 dark:hover:bg-gray-600 transition-all rounded w-full"
								on:click={() => (dim[entry.key] = 0)}>{entry.name} eintragen</button
							>
						{:else}
							<div class="flex flex-row gap-2">
								<input
									type="number"
									class="dark:bg-gray-700 rounded text-lg w-full"
									bind:value={dim[entry.key]}
								/>
								<button
									class="p-2 px-4 dark:bg-gray-700 dark:hover:bg-gray-600 transition-all rounded-full"
									on:click={() => (dim[entry.key] = undefined)}
									><Icon.TrashBinSolid size="lg" /></button
								>
							</div>
						{/if}
					</div>
				{/each}
				<div class="col-span-4">
					<button
						class="p-2 px-4 dark:bg-gray-700 dark:hover:bg-gray-600 transition-all flex rounded flex-row gap-4 w-full"
						on:click={() =>
							(schemaType.numericDimensions = schemaType.numericDimensions.toSpliced(dimIndex, 1))}
						><Icon.TrashBinSolid /> <span>Dimension löschen</span></button
					>
				</div>
				<div class="col-span-4">
					<button
						class="p-2 px-4 dark:bg-gray-700 dark:hover:bg-gray-600 transition-all flex rounded flex-row gap-4 w-full"
						on:click={() =>
							(schemaType.numericDimensions = schemaType.numericDimensions.toSpliced(
								dimIndex + 1,
								0,
								deepCopy(dim)
							))}><Icon.CopySolid /> <span>Dimension duplizieren</span></button
					>
				</div>
				<div class="col-span-4">
					<button
						class="p-2 px-4 dark:bg-gray-700 dark:hover:bg-gray-600 transition-all flex rounded flex-row gap-4 w-full"
						on:click={() => addNumericDimension(dimIndex)}
						><Icon.ArrowLeftToBracketOutline /> <span>Dimension zurücksetzen</span></button
					>
				</div>
			</div>
		{/each}
	</div>
	<button
		class="dark:bg-gray-800 dark:hover:bg-gray-700 bg-gray-200 p-2 rounded transition-all"
		on:click={() => addNumericDimension()}>Numerische Dimension hinzufügen</button
	>
	<hr class="opacity-20" />

	<div>Kategorielle Dimensionen ({schemaType.optionDimensions.length})</div>
	{#each schemaType.optionDimensions as dim, dimIndex}
		<div class="dark:bg-gray-800 p-2 grid grid-cols-12 gap-4 rounded">
			<div class="col-span-12">
				<div>Name</div>
				<input type="text" class="dark:bg-gray-700 rounded text-lg w-full" bind:value={dim.name} />
			</div>
			<div class="col-span-12">
				<div>Gewichtung</div>
				<div class="flex flex-row gap-4">
					<input
						type="number"
						min="0"
						class="dark:bg-gray-700 rounded text-lg w-full"
						bind:value={dim.weight}
					/>
					{#each weightOperations as op}
						<button
							class="p-2 dark:bg-gray-700 dark:hover:bg-gray-600 rounded"
							on:click={() => (dim.weight = op.method(dim.weight))}>{op.title}</button
						>
					{/each}
				</div>
			</div>
			<div class="col-span-12">
				<div>Auswahlmöglichkeiten</div>
				<div class="ml-4 flex flex-col gap-2">
					{#each dim.options as option, optionIndex}
						<div class="flex flex-row gap-2">
							<input
								bind:value={dim.options[optionIndex]}
								type="text"
								class="dark:bg-gray-700 transition-all rounded w-full p-2"
							/>
							<button
								on:click={() => (dim.options = dim.options.toSpliced(optionIndex, 1))}
								class="dark:bg-gray-700 dark:hover:bg-gray-600 transition-all rounded-full p-2"
								disabled={dim.options.length <= 2}><Icon.TrashBinSolid /></button
							>
						</div>
					{/each}
					<button
						class="dark:bg-gray-700 dark:hover:bg-gray-600 transition-all rounded w-full p-2"
						on:click={() => (dim.options = [...dim.options, 'Option ' + (dim.options.length + 1)])}
						>Option hinzufügen</button
					>
				</div>
			</div>
			<div class="col-span-4">
				<button
					class="p-2 px-4 dark:bg-gray-700 dark:hover:bg-gray-600 transition-all flex rounded flex-row gap-4 w-full"
					on:click={() =>
						(schemaType.optionDimensions = schemaType.optionDimensions.toSpliced(dimIndex, 1))}
					><Icon.TrashBinSolid /> <span>Dimension löschen</span></button
				>
			</div>
			<div class="col-span-4">
				<button
					class="p-2 px-4 dark:bg-gray-700 dark:hover:bg-gray-600 transition-all flex rounded flex-row gap-4 w-full"
					on:click={() =>
						(schemaType.optionDimensions = schemaType.optionDimensions.toSpliced(
							dimIndex + 1,
							0,
							deepCopy(dim)
						))}><Icon.CopySolid /> <span>Dimension duplizieren</span></button
				>
			</div>
			<div class="col-span-4">
				<button
					class="p-2 px-4 dark:bg-gray-700 dark:hover:bg-gray-600 transition-all flex rounded flex-row gap-4 w-full"
					on:click={() => addOptionDimension(dimIndex)}
					><Icon.ArrowLeftToBracketOutline /> <span>Dimension zurücksetzen</span></button
				>
			</div>
		</div>
	{/each}
	<button
		class="dark:bg-gray-800 dark:hover:bg-gray-700 bg-gray-200 p-2 rounded transition-all"
		on:click={() => addOptionDimension()}>Kategorielle Dimensionen hinzufügen</button
	>

	<hr class="opacity-20" />

	<div>Vorschau</div>
	{#if schemaResult.success}
		<SchemaDisplay schema={schemaResult.value} />
	{:else}
		<div class="p-8 text-2xl bg-red-900 rounded">
			Fehler: {schemaResult.error}
		</div>
	{/if}

	<hr class="opacity-20" />
	<div>Aktionen</div>
	<div class="flex flex-row gap-4">
		{#if schemaResult.success}
			<button
				class="text-xl dark:bg-gray-800 dark:hover:bg-gray-700 bg-gray-200 p-2 rounded transition-all w-full"
				on:click={save}
			>
				Speichern
			</button>
		{/if}
		<button
			class="opacity-80 text-xl dark:bg-gray-800 dark:hover:bg-gray-700 bg-gray-200 p-2 rounded transition-all w-full"
			on:click={() => goto('/schema/list', { invalidateAll: true })}
		>
			Abbrechen
		</button>
	</div>
</div>
