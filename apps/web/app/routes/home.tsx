import type { Route } from "+/app/routes/+types/home";
import { useFetcher } from "react-router";

import { Welcome } from "~/welcome/welcome";

export function meta() {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader() {
  return await Promise.resolve({ message: "Hello World" });
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return <Welcome />;
}
