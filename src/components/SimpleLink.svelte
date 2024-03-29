<script lang="ts">
	export let href: string;
	export let target: string = '_self';
</script>

<a
	{href}
	{target}
	on:click
	class="underline underline-offset-2 hover:underline-offset-4 transition-all hover:text-white active:text-gray-200"
>
	<slot>{href}</slot>
</a>
