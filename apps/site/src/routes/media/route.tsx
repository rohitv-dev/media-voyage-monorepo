import { createFileRoute, redirect } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { trpc } from "../../utils/trpc";

export const Route = createFileRoute("/media")({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    if (context.auth.isLoading) return <>Loading...</>;
    if (!context.auth.isLoggedIn)
      throw redirect({
        to: "/auth/login",
      });

    return <RouteComponent />;
  },
});

function RouteComponent() {
  const { data, isLoading, isSuccess, isError, error } = useQuery(trpc.media.getMedia.queryOptions());

  if (isLoading) return <>Data Loading...</>;
  if (isError) return <>{error.message}</>;

  if (!isSuccess) return <>Success Loading...</>;

  return (
    <>
      {data.map((media) => (
        <div key={media.id}>{media.title}</div>
      ))}
    </>
  );
}
