import { createFileRoute, redirect } from "@tanstack/react-router";

/** Fallback: any unknown URL redirects to the homepage instead of showing a 404. */
export const Route = createFileRoute("/$")({
  beforeLoad: () => {
    throw redirect({ to: "/", replace: true });
  },
  component: () => null,
});
