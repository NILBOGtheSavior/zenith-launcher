import { writable } from "svelte/store";

export var editMode = writable(false);
export const searchEngine = writable("duckduckgo");
