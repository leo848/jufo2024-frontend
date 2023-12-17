<script lang="ts">
	import { Popover } from 'flowbite-svelte';
	import { createEventDispatcher } from 'svelte';
	import type { Color } from '../../color/color';

	export let triggeredBy: string;
	export let color: Color;

	const dispatch = createEventDispatcher<{ limit: null }>();
</script>

<Popover {triggeredBy} placement="bottom" trigger="click">
	<div>
		<div class="max-w-xs flex flex-col">
			<div class="text-xl">Außerhalb RGB</div>
			<p>
				Die gewählte Farbe liegt außerhalb des <span class="text-white">RGB-Farbraums</span> und
				kann daher nicht auf digitalen Bildschirmen angezeigt werden. Durch
				<span class="text-white">Klicken</span>
				auf den Button 'Beschränken' wird die Farbe auf
				{#await color.name() then meta}
					{meta.name}
				{/await}
				beschränkt. Visuell ist <span class="text-white">kein Unterschied</span> festzustellen,
				lediglich das Datenobjekt und damit der <span class="text-white">3D-Punkt</span> ändern sich.
			</p>
			<div>
				<button
					class="mt-2 p-2 rounded bg-gray-600 text-white hover:bg-gray-500 transition-all"
					on:click={() => {
						dispatch('limit');
					}}>Beschränken</button
				>
			</div>
		</div>
	</div>
</Popover>
