import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { ErrorScreen } from "../../components/ErrorScreen";
import { authClient } from "../../services/authClient";

export const Route = createFileRoute("/auth")({
  component: RouteComponent,
  beforeLoad: async () => {
    const { data, error } = await authClient.getSession();

    if (error) {
      console.log(error.message);
      return <ErrorScreen message={error.message} />;
    }

    if (data && data.user) {
      throw redirect({
        to: "/media",
      });
    }

    return <Outlet />;
  },
});

function RouteComponent() {
  return <Outlet />;
}
