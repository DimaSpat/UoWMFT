import { component$ } from "@builder.io/qwik";
import {DocumentHead, routeLoader$} from "@builder.io/qwik-city";

const API_ENDPOINTS = {
    TEST: process.env.BASE_URL+'api/auth/test'
}

export const useTestData = routeLoader$(async () => {
    const response = await fetch(API_ENDPOINTS.TEST);
    return response.json();
})

export default component$(() => {
    const test = useTestData();
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
