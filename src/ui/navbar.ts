import type { ComponentType } from 'svelte';
import { writable, type Writable } from 'svelte/store';

export const title: Writable<null | string | ComponentType> = writable(null);
