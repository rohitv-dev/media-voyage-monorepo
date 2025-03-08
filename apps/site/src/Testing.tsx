import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "./utils/trpc";

export const Testing = () => {
  const trpc = useTRPC();

  const { data, isLoading, isError, error } = useQuery(trpc.media.getMedia.queryOptions());

  console.log(data, isLoading, isError, error);

  return <div>Testing</div>;
};
