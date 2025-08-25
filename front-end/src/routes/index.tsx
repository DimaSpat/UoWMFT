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
        message from backend: {test.value.message}
    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
