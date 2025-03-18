import {
  Button,
  Card,
  Divider,
  Group,
  Rating,
  rem,
  SimpleGrid,
  Stack,
  Text,
  Title,
  useMantineColorScheme,
} from "@mantine/core";
import { useEditor } from "@tiptap/react";
import { RichTextEditor } from "@mantine/tiptap";
import StarterKit from "@tiptap/starter-kit";
import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { Media } from "../types/media";
import { DataColumn } from "./DataColumn";
import { Link, useNavigate } from "@tanstack/react-router";

interface MediaViewProps {
  media: Media;
  viewOnly?: boolean;
}

export const MediaView = ({ media, viewOnly }: MediaViewProps) => {
  const { colorScheme } = useMantineColorScheme();

  // const { mutateAsync, isPending, isError, error } = useMutation({
  //   mutationFn: MediaService.deleteMedia,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["media"] });
  //   },
  //   onError: (res) => {
  //     showErrorNotification(res.message);
  //   },
  // });

  const editor = useEditor({
    extensions: [StarterKit],
    content: media?.comments ?? "",
    editable: false,
  });

  // useEffect(() => {
  //   const controls = animate(0, media?.rating, {
  //     onUpdate: (val) => {
  //       if (val) setRating(val);
  //     },
  //   });

  //   return () => controls.stop();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // const handleDelete = async () => {
  //   if (!media.id) return;
  //   const res = await mutateAsync(media.id);
  //   if (res.ok) {
  //     showSuccessNotification("Deleted Media Successfully");
  //     navigate("/");
  //   } else showErrorNotification(res.message);
  //   deleteHandlers.close();
  // };

  if (!media) return null;

  return (
    <Card shadow={colorScheme === "dark" ? "sm" : "lg"}>
      <Stack gap="sm">
        {/* {isError ? <Text>{error.message}</Text> : null} */}
        <Group justify="space-between">
          <Group align="center">
            <Title c="teal">{media.title}</Title>
            {media.rating && <Rating value={media.rating} readOnly />}
          </Group>
          {!viewOnly && (
            <Group>
              <Link to="/media/$mediaId/update" params={{ mediaId: media.id.toString() }}>
                <Button size="xs">Update</Button>
              </Link>
              <Button size="xs" color="red">
                Delete
              </Button>
            </Group>
          )}
        </Group>
        <Divider />
        <SimpleGrid cols={2}>
          <DataColumn title="Type" value={media.type} />
          <DataColumn title="Status" value={media.status} />
          <DataColumn title="Start Date" value={media.startDate} />
          <DataColumn title="Completed Date" value={media.completedDate} />
          <DataColumn title="Platform" value={media.platform} />
          <DataColumn title="Recommended?" value={media.recommended} />
          <DataColumn title="Private" value={media.isPrivate ? "Yes" : "No"} />
        </SimpleGrid>
        {media.comments ? (
          <Stack gap="5px">
            <Text fw="600" fz={rem(16)}>
              Comments
            </Text>
            <RichTextEditor editor={editor}>
              <RichTextEditor.Content />
            </RichTextEditor>
          </Stack>
        ) : null}
        <Divider />
        <SimpleGrid cols={2}>
          <DataColumn title="Added On" value={media.createdOn} />
          <DataColumn title="Last Updated On" value={media.createdOn} />
        </SimpleGrid>
      </Stack>
      {/* <Modal opened={deleteOpened} onClose={deleteHandlers.close} title={`Delete ${media.title}?`}>
        <Stack>
          <Stack gap="xs">
            <Text>Are you sure you want to delete...</Text>
            <Text fw="bold" fz="lg">
              {toUpperCase(media.title)}?!
            </Text>
          </Stack>
          <Group justify="right">
            <Button loading={isPending} onClick={deleteHandlers.close}>
              No
            </Button>
            <Button color="red" onClick={handleDelete} loading={isPending}>
              Yes
            </Button>
          </Group>
        </Stack>
      </Modal> */}
    </Card>
  );
};
