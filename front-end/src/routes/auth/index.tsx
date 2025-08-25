import {component$} from "@builder.io/qwik";
import {DocumentHead} from "@builder.io/qwik-city";

export default component$(() => {
    return (
        <>
            <h1>Authentication</h1>
        </>
    );
});

export const head: DocumentHead = {
    title: "Auth",
    meta: [
        {
            name: "description",
            content: "Authenticating into the system",
        },
    ],
};