import { writable } from "svelte/store";

export const data = writable(null);
export const variables = writable(null);
export const global_year = writable(2020);
export const national_year = writable(2020);
export const country = writable("United States");
export const toggle = writable("Global");
export const number_of_metrics = writable(null);
export const ranked_metric = writable(null);
export const temporal_metric_1 = writable(null);
export const temporal_metric_2 = writable(null);
export const methodology_year = writable(2020);