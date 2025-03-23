import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { trpc } from "../../utils/trpc";
import { ErrorScreen } from "../../components/ErrorScreen";
import { MediaTable } from "../../components/table/MediaTable";
import { Group, Stack, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useAppForm } from "../../components/forms/form";
import { useStore } from "@tanstack/react-form";
import { MediaArray } from "../../types/media";

export const Route = createFileRoute("/media/")({
  component: RouteComponent,
});

const emptyArray: NonNullable<MediaArray> = [];

function RouteComponent() {
  const { AppForm, AppField, store } = useAppForm({
    defaultValues: {
      status: "",
      type: "",
    },
  });

  const status = useStore(store, (state) => state.values.status);
  const type = useStore(store, (state) => state.values.type);

  const { data, isLoading, isError, error } = useQuery(
    trpc.media.getMediaBy.queryOptions(
      {
        status,
        type,
      },
      {
        select: (data) => (data ? data : emptyArray),
      }
    )
  );

  if (isError) return <ErrorScreen message={error.message} />;

  return (
    <Stack gap="xs">
      <Group grow>
        <form>
          <AppForm>
            <Group gap="xs" grow>
              <TextInput flex={1} size="xs" leftSection={<IconSearch size={18} />} placeholder="Search" />
              <Group grow>
                <AppField
                  name="status"
                  children={({ SelectField }) => (
                    <SelectField
                      size="xs"
                      clearable
                      placeholder="Status"
                      data={["Completed", "In Progress", "Planned", "Dropped"]}
                    />
                  )}
                />
                <AppField
                  name="type"
                  children={({ SelectField }) => (
                    <SelectField size="xs" clearable placeholder="Type" data={["Movie", "Show", "Game", "Book"]} />
                  )}
                />
              </Group>
            </Group>
          </AppForm>
        </form>
      </Group>
      <MediaTable isLoading={isLoading} data={data ?? []} />
    </Stack>
  );
}
