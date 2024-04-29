import {readonly, writable} from "svelte/store";

let oldValue = document.documentElement.classList.contains("dark");
let writableDark = writable(oldValue);
let writableDarkValue = oldValue;
export let dark = readonly(writableDark);

setInterval(() => {
	const newValue = document.documentElement.classList.contains("dark");
	if (newValue != writableDarkValue) {
		writableDark.set(newValue);
		writableDarkValue = newValue; // for efficiency reasons
	}
}, 500)
