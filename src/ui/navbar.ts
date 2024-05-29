import type {ComponentType} from 'svelte';
import {writable, type Writable} from 'svelte/store';

export const title: Writable<null | string | ComponentType> = writable(null);

title.subscribe(title => {
	if (typeof title === "string") {
		document.title = title
	}
})
