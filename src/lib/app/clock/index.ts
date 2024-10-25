import Clock from "./Clock.svelte";
import { type AppProps } from "$lib";

const clock: AppProps = {
    app: {
        name: 'Clock',
        id: 'clock',
        version: '1.0.0',
        category: 'utility',
        visible: true,
    },
    component: Clock,
    context: {},
    interface: {
        pos: {
            x: 10,
            y: 10,
        },
        size: {
            width: 400,
            height: 300.
        }
    }
}

export default clock;