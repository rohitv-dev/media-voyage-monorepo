import { useQuery } from "@tanstack/react-query";
import { createFileRoute, useParams } from "@tanstack/react-router";
import { ErrorScreen } from "../../../components/ErrorScreen";
import { LoadingScreen } from "../../../components/LoadingScreen";
import { MediaView } from "../../../components/MediaView";
import { trpc } from "../../../utils/trpc";

export const Route = createFileRoute("/media/$mediaId/view")({
  component: RouteComponent,
});

function RouteComponent() {
  const { mediaId } = useParams({
    from: "/media/$mediaId/view",
  });

  const { data, isLoading, isError, error } = useQuery(
    trpc.media.getSingleMedia.queryOptions(
      {
        id: parseInt(mediaId),
      },
      {
        enabled: !!mediaId,
      }
    )
  );

  if (isLoading) return <LoadingScreen />;
  if (isError) return <ErrorScreen message={error.message} />;

  if (!data) return <ErrorScreen message="Media not found" />;

  return <MediaView media={data} />;
}
