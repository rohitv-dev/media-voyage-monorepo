import { useQuery } from "@tanstack/react-query";
import { createFileRoute, useParams } from "@tanstack/react-router";
import { ErrorScreen } from "../../../components/ErrorScreen";
import { LoadingScreen } from "../../../components/LoadingScreen";
import { trpc } from "../../../utils/trpc";
import { UpdateMediaForm } from "../../../components/UpdateMediaForm";

function transformNullToUndefined<T extends object>(data: T): T {
  // unpack the object into an array of key-value pairs
  const entries = Object.entries(data).map(([key, value]) => {
    // replace null values with undefined
    if (value === null) {
      return [key, undefined];
    } else {
      return [key, value];
    }
  });
  return Object.fromEntries(entries) as T;
}

export const Route = createFileRoute("/media/$mediaId/update")({
  component: RouteComponent,
});

function RouteComponent() {
  const { mediaId } = useParams({
    from: "/media/$mediaId/update",
  });

  const { data, isLoading, isError, error } = useQuery(
    trpc.media.getSingleMedia.queryOptions(
      {
        id: parseInt(mediaId),
      },
      {
        enabled: !!mediaId,
        select(data) {
          if (data) return transformNullToUndefined(data);
          return undefined;
        },
      }
    )
  );

  if (isLoading) return <LoadingScreen />;
  if (isError) return <ErrorScreen message={error.message} />;

  if (!data) return <ErrorScreen message="Media not found" />;

  return <UpdateMediaForm media={data} />;
}
