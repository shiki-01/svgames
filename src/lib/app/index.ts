import { type AppProps } from "$lib";
import { writable, type Writable } from "svelte/store";
import clock from "./clock";
import calender from "./calender"

const activeApp: Writable<AppProps | null> = writable(null);

const apps: AppProps[] = [
    clock,
    calender
]

export default apps

export { activeApp }