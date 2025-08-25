import { component$ } from "@builder.io/qwik";
import {DocumentHead, routeLoader$} from "@builder.io/qwik-city";

export default component$(() => {
  return (
      <>
          <h1>Home</h1>
      </>
  );
});

export const head: DocumentHead = {
  title: "Home",
  meta: [
    {
      name: "description",
      content: "Univers of Woodcutting Mining Farming Trading",
    },
  ],
};
