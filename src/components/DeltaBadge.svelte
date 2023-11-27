<script lang="ts">
	import { assertNever } from '../server/types';

	export let value: number;
	export let type: 'negpos' | 'pos' = 'negpos';

	const formatter = new Intl.NumberFormat(undefined, {
		minimumFractionDigits: 1,
		maximumFractionDigits: 1
	});

	function color() {
		const red = ['#522', '#933'];
		const green = ['#272', '#3c3'];
		const gray = ['#444', '#666'];
		if (type == 'negpos') {
			if (value < -0.1) {
				return red;
			} else if (value > 0.1) {
				return green;
			} else {
				return gray;
			}
		} else if (type == 'pos') {
			if (value < 0.1) {
				return green;
			} else if (value < 1) {
				return gray;
			} else {
				return red;
			}
		} else {
			assertNever(type);
		}
	}

	function format(value: number) {
		if (Math.abs(value) < 0.001) {
			return null;
		} else {
			return '±' + formatter.format(value);
		}
	}
</script>

{#if format(value)}
	<button
		style={`background-color: ${color()[0]}; border: 2px solid ${color()[1]}`}
		class="border border-2 rounded-xl text-white px-2 mx-4 text-xl flex flex-row items-center"
		on:click
	>
		<div>
			{format(value)}
		</div>
	</button>
{/if}
