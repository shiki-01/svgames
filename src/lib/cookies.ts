import { writable, type Writable } from "svelte/store";

interface Settings {
    theme: {
        bright: 'light' | 'dark',
        color: string
    },
    locate: string,
    clock: {
        style: ':.' | ':-',
        isSec: boolean,
        is24: boolean
    },
    calender: {
        style: string,
    }
}

const def: Settings = {
    theme: {
        bright: 'light',
        color: '#eee'
    },
    locate: 'ja',
    clock: {
        style: ':.',
        isSec: true,
        is24: true
    },
    calender: {
        style: 'YYYY/MM/DD'
    }
}

const settings: Writable<Settings> = writable(def)

export { type Settings, settings }