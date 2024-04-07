<script lang="ts">
	import {
		type OptionsPool,
		type ParameterKey,
		poolOptions,
		type Parameter
	} from '../server/optionsPool';

	export let pool: OptionsPool;
	export let parameters: ParameterKey[];

	let poolKey = 0;

	function setValue<P extends ParameterKey>(paramKey: P, pool: OptionsPool, value: any) {
		let param: (typeof poolOptions)[P] = poolOptions[paramKey];
		let paramR = relax(param);
		// Type-check at runtime
		if (param.type === 'number') {
			if (typeof value !== 'number') throw new Error(`invalid type: ${typeof value}`);
		} else if (param.type === 'option') {
			if (!param.values.includes(value)) throw new Error(`not included in option: ${value}`);
		} else if (param['type'] === 'boolean') {
			if (typeof value !== 'boolean') throw new Error(`invalid type: ${typeof value}`);
		}
		if (paramR.type === 'number') {
			if (paramR['transform']) {
				value = paramR.transform(value);
			}
		}
		pool[paramKey] = value;
		poolKey++;
	}

	function extractNumber(evt: Event): number {
		let value: any = +(evt.target ?? ({} as any))['value' as any] as any;
		if (typeof value === 'number') {
			return value;
		} else throw new Error(`invalid type ${typeof value}`);
	}

	function extractString(evt: Event): string {
		let value: any = (evt.target ?? ({} as any))['value' as any] as any;
		if (typeof value === 'string') return value;
		else throw new Error(`invalid type ${typeof value}`);
	}

	const relax = (p: Parameter): Parameter => p;
</script>

<div class="my-4 border-2 border border-gray-500 rounded p-2">
	<div class="font-bold">Einstellungen</div>
	<div class="flex flex-col">
		{#each parameters as paramKey}
			{@const p = poolOptions[paramKey]}
			{@const pR = relax(poolOptions[paramKey])}
			<div class="flex flex-row gap-2">
				<div class="text-white">{p.name}</div>
				<div>{p.desc}</div>
			</div>
			{#if pR.type === 'number'}
				{@const entry = pool[paramKey]}
				{#key poolKey}
					<div>
						{#if pR.type === 'number' && typeof entry === 'number'}
							{#if pR.display}
								Aktuell: {pR.display(entry)}
							{:else}
								Aktuell: {entry}
							{/if}
						{/if}
					</div>
				{/key}
				<input
					type="range"
					min={pR.min}
					max={pR.max}
					step={pR.step}
					value={pR.default}
					on:input={(e) => setValue(paramKey, pool, extractNumber(e))}
					class="w-full bg-transparent text-white grayscale"
				/>
			{:else if pR.type === 'option'}
				<select
					class="bg-gray-600 text-gray-200"
					on:input={(e) => setValue(paramKey, pool, extractString(e))}
				>
					{#each pR.values as option}
						<option>{option}</option>
					{/each}
				</select>
			{/if}
		{/each}
	</div>
</div>
