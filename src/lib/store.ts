import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import { browser } from '$app/environment';

export const createStore = <Type>(label: string, defaultValue: Type) => {
	let data: Writable<Type>;
	if (browser) {
		const localData = localStorage?.getItem(label);
		data = writable<Type>(localData ? JSON.parse(localData) : defaultValue);
		data.subscribe((value) => {
			if (value) {
				localStorage[label] = JSON.stringify(value);
			} else {
				delete localStorage[label];
			}
		});
	} else {
		data = writable<Type>(defaultValue);
	}

	return data;
};
