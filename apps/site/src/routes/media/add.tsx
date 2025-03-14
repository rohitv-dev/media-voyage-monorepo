import { createFileRoute } from "@tanstack/react-router";
import { useAppForm } from "../../components/forms/form";
import { trpc } from "../../utils/trpc";
import { SimpleGrid, Stack, Title, Text, Center } from "@mantine/core";
import { inferInput } from "@trpc/tanstack-react-query";
import { addMediaSchema } from "@repo/schemas/mediaSchema";
import { useMutation } from "@tanstack/react-query";

type AddMediaSchema = inferInput<typeof trpc.media.addMedia>;

export const Route = createFileRoute("/media/add")({
  component: RouteComponent,
});

function RouteComponent() {
  const addMedia = useMutation(trpc.media.addMedia.mutationOptions());

  const { AppForm, AppField, SubmitButton, handleSubmit } = useAppForm({
    defaultValues: {
      title: "",
      status: "In Progress",
      type: "Movie",
    } as AddMediaSchema,
    onSubmit: async ({ value }) => {
      console.log(value);
      const res = await addMedia.mutateAsync(value);

      console.log(res);
    },
    validators: {
      onSubmit: addMediaSchema,
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <AppForm>
        <Stack>
          <Title order={3}>Add Media</Title>
          <AppField
            name="title"
            children={({ TextField }) => <TextField withAsterisk label="Title" placeholder="Title" />}
          />
          <SimpleGrid cols={{ base: 1, sm: 2 }}>
            <AppField
              name="type"
              children={({ SelectField }) => (
                <SelectField
                  withAsterisk
                  label="Type"
                  placeholder="Select The Type"
                  data={["Movie", "Show", "Game", "Book"]}
                />
              )}
            />
            <AppField
              name="genre"
              children={({ TextField }) => <TextField label="Genre" placeholder="Enter the genre" />}
            />
          </SimpleGrid>
          <SimpleGrid cols={{ base: 1, sm: 2 }}>
            <AppField
              name="startDate"
              children={({ DateField }) => <DateField label="Start Date" placeholder="Start Date" />}
            />
            <AppField
              name="completedDate"
              children={({ DateField }) => <DateField label="Completed Date" placeholder="Completed Date" />}
            />
          </SimpleGrid>
          <AppField
            name="status"
            children={({ SelectField }) => (
              <SelectField withAsterisk label="Status" data={["In Progress", "Completed", "Planned", "Dropped"]} />
            )}
          />
          <SimpleGrid cols={{ base: 1, sm: 2 }}>
            <AppField
              name="platform"
              children={({ TextField }) => <TextField label="Platform" placeholder="Enter the platform" />}
            />
            <AppField
              name="recommended"
              children={({ SelectField }) => (
                <SelectField label="Recommended" data={["Yes", "No"]} placeholder="Yes/No" />
              )}
            />
          </SimpleGrid>
          <Stack gap="5px">
            <Text fw="600">Comments</Text>
            <AppField name="comments" children={({ EditorField }) => <EditorField label="Comments" />} />
          </Stack>
          <Center>
            <AppField name="rating" children={({ RatingField }) => <RatingField size="xl" />} />
          </Center>
          <SubmitButton loading={addMedia.isPending}>Add Media</SubmitButton>
        </Stack>
      </AppForm>
    </form>
  );
}
