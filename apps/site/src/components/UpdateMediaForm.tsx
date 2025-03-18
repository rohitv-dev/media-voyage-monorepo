import { Center, Group, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import { useAppForm } from "./forms/form";
import { Media, UpdateMedia } from "../types/media";
import { updateMediaSchema } from "@repo/schemas/mediaSchema";
import { trpc } from "../utils/trpc";
import { useNavigate } from "@tanstack/react-router";
import { showErrorNotification, showSuccessNotification } from "../utils/notifications";

export const UpdateMediaForm = ({ media }: { media: Media }) => {
  const navigate = useNavigate();

  const { AppForm, AppField, handleSubmit, SubmitButton } = useAppForm({
    defaultValues: {
      ...media,
      recommended: media?.recommended ? (media.recommended ? "Yes" : "No") : undefined,
    } as UpdateMedia,
    onSubmit: async ({ value }) => {
      await mutateAsync(value);
    },
    validators: {
      onSubmit: updateMediaSchema,
    },
  });

  const { mutateAsync, isPending, isError, error } = useMutation(
    trpc.media.updateMedia.mutationOptions({
      onSuccess: () => {
        showSuccessNotification("Media Updated Successfully");
        navigate({
          to: "/media",
        });
      },
      onError: (error) => {
        showErrorNotification(error.message);
      },
    })
  );

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <AppForm>
        <Stack>
          {isError ? <Text>{error.message}</Text> : null}
          <Group justify="space-between">
            <Title order={3}>Update Media</Title>
            {/* <Switch label="Private" {...form.getInputProps("isPrivate", { type: "checkbox" })} /> */}
          </Group>
          <AppField name="title" children={({ TextField }) => <TextField withAsterisk label="Title" />} />
          <SimpleGrid cols={{ base: 1, sm: 2 }}>
            <AppField
              name="type"
              children={({ SelectField }) => (
                <SelectField withAsterisk label="Media Type" data={["Movie", "Show", "Game", "Book"]} />
              )}
            />
            <AppField name="genre" children={({ TextField }) => <TextField label="Genre" />} />
          </SimpleGrid>
          <SimpleGrid cols={{ base: 1, sm: 2 }}>
            <AppField name="startDate" children={({ DateField }) => <DateField label="Start Date" />} />
            <AppField name="completedDate" children={({ DateField }) => <DateField label="Completed Date" />} />
          </SimpleGrid>
          <AppField
            name="status"
            children={({ SelectField }) => (
              <SelectField withAsterisk label="Status" data={["Completed", "In Progress", "Planned", "Dropped"]} />
            )}
          />

          <SimpleGrid cols={{ base: 1, sm: 2 }}>
            <AppField name="platform" children={({ TextField }) => <TextField label="Platform" />} />
            <AppField
              name="recommended"
              children={({ SelectField }) => <SelectField label="Recommended" data={["Yes", "No"]} />}
            />
          </SimpleGrid>
          <Stack gap="5px">
            <Text fw="600">Comments</Text>
            <AppField name="comments" children={({ EditorField }) => <EditorField label="Comments" />} />
          </Stack>
          <Center>
            <AppField name="rating" children={({ RatingField }) => <RatingField size="xl" />} />
          </Center>
          <SubmitButton loading={isPending}>Update Media</SubmitButton>
        </Stack>
      </AppForm>
    </form>
  );
};
