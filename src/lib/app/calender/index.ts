import Calender from "./Calender.svelte";
import { type AppProps } from "$lib";

const calender: AppProps = {
    app: {
        name: 'Calender',
        id: 'calender',
        version: '1.0.0',
        category: 'utility',
        visible: true,
    },
    component: Calender,
    context: {},
    interface: {
        pos: {
            x: 50,
            y: 200,
        },
        size: {
            width: 200,
            height: 200.
        }
    }
}

export default calender;