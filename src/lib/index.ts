import type { Component } from "svelte"

type App = {
    name: string,
    id: string,
    version: string,
    category?: 'utility' | 'game' | 'social' | 'media' | 'other',
    visible: boolean,
}

type Context = {
    [key: string]: Context | string | boolean | void
}

interface AppProps {
    app: App,
    component: Component,
    context: Context,
    interface: {
        pos: {
            x: number,
            y: number
        },
        size: {
            width: number,
            height: number
        }
    }
}

const apps: App[] = [
    {
        name: 'Clock',
        id: 'clock',
        version: '1.0.0',
        category: 'utility',
        visible: true,
    },
    {
        name: 'Calender',
        id: 'calender',
        version: '1.0.0',
        category: 'utility',
        visible: true,
    },
    {
        name: 'Calculator',
        id: 'calculator',
        version: '1.0.0',
        category: 'utility',
        visible: true,
    },
    {
        name: 'Memo',
        id: 'memo',
        version: '1.0.0',
        category: 'utility',
        visible: true,
    },
    {
        name: 'Tetris',
        id: 'tetris',
        version: '1.0.0',
        category: 'game',
        visible: true,
    },
    {
        name: 'Sudoku',
        id: 'sudoku',
        version: '1.0.0',
        category: 'game',
        visible: true,
    },
    {
        name: 'Twitter',
        id: 'twitter',
        version: '1.0.0',
        category: 'social',
        visible: true,
    },
    {
        name: 'Instagram',
        id: 'instagram',
        version: '1.0.0',
        category: 'social',
        visible: true,
    },
    {
        name: 'Youtube',
        id: 'youtube',
        version: '1.0.0',
        category: 'media',
        visible: true,
    },
    {
        name: 'Spotify',
        id: 'spotify',
        version: '1.0.0',
        category: 'media',
        visible: true,
    },
    {
        name: 'Discord',
        id: 'discord',
        version: '1.0.0',
        category: 'social',
        visible: true,
    },
    {
        name: 'Slack',
        id: 'slack',
        version: '1.0.0',
        category: 'social',
        visible: true,
    },
    {
        name: 'Facebook',
        id: 'facebook',
        version: '1.0.0',
        category: 'social',
        visible: true,
    },
    {
        name: 'Messenger',
        id: 'messenger',
        version: '1.0.0',
        category: 'social',
        visible: true,
    },
    {
        name: 'Whatsapp',
        id: 'whatsapp',
        version: '1.0.0',
        category: 'social',
        visible: true,
    },
    {
        name: 'Zoom',
        id: 'zoom',
        version: '1.0.0',
        category: 'social',
        visible: true,
    },
    {
        name: 'Terminal',
        id: 'terminal',
        version: '1.0.0',
        category: 'utility',
        visible: true,
    },
    {
        name: 'Settings',
        id: 'settings',
        version: '1.0.0',
        category: 'utility',
        visible: true,
    },
    {
        name: 'Sudokit',
        id: 'sudokit',
        version: '1.0.0',
        category: 'game',
        visible: true,
    },
    {
        name: 'Weather',
        id: 'weather',
        version: '1.0.0',
        category: 'utility',
        visible: true,
    }
]

export { type App, type AppProps, apps }