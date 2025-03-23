import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, useParams } from "@tanstack/react-router";
import { ErrorScreen } from "../../../components/ErrorScreen";
import { LoadingScreen } from "../../../components/LoadingScreen";
import { MediaView } from "../../../components/MediaView";
import { queryClient, trpc } from "../../../utils/trpc";

export const Route = createFileRoute("/media/$mediaId/view")({
  loader: async ({ params }) => {
    await queryClient.ensureQueryData(
      trpc.media.getSingleMedia.queryOptions({
        id: parseInt(params.mediaId),
      })
    );
    return;
  },
  component: RouteComponent,
  pendingComponent: LoadingScreen,
  errorComponent: ({ error }) => <ErrorScreen message={error.message} />,
});

function RouteComponent() {
  const { mediaId } = useParams({
    from: "/media/$mediaId/view",
  });

  const { data } = useSuspenseQuery(
    trpc.media.getSingleMedia.queryOptions(
      {
        id: parseInt(mediaId),
      },
      {
        enabled: !!mediaId,
      }
    )
  );

  return <MediaView media={data} />;
}
