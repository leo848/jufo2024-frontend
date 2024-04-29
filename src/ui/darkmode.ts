import {readonly, writable} from "svelte/store";

let writableDark = writable(true);
let writableDarkValue = true;
export let dark = readonly(writableDark);

setInterval(() => {
	const newValue = document.documentElement.classList.contains("dark");
	if (newValue != writableDarkValue) {
		writableDark.set(newValue);
		writableDarkValue = newValue; // for efficiency reasons
	}
}, 500)
