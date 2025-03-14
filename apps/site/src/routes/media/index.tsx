import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { trpc } from "../../utils/trpc";
import { ErrorScreen } from "../../components/ErrorScreen";
import { LoadingScreen } from "../../components/LoadingScreen";

export const Route = createFileRoute("/media/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isLoading, isSuccess, isError, error } = useQuery(trpc.media.getMedia.queryOptions());

  if (isLoading) return <LoadingScreen />;
  if (isError) return <ErrorScreen message={error.message} />;

  if (!isSuccess) return <>Success Loading...</>;

  return (
    <>
      {data.map((media) => (
        <div key={media.id}>{media.title}</div>
      ))}
    </>
  );
}
