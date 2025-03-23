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
import { Media } from "../types/media";
import { DataColumn } from "./DataColumn";
import { Link } from "@tanstack/react-router";

interface MediaViewProps {
  media: Media;
  viewOnly?: boolean;
}

export const MediaView = ({ media, viewOnly }: MediaViewProps) => {
  const { colorScheme } = useMantineColorScheme();

  const editor = useEditor({
    extensions: [StarterKit],
    content: media?.comments ?? "",
    editable: false,
  });

  if (!media) return null;

  return (
    <Card shadow={colorScheme === "dark" ? "sm" : "lg"}>
      <Stack gap="sm">
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
          <DataColumn title="Added On" value={media.createdAt} />
          <DataColumn title="Last Updated On" value={media.updatedAt} />
        </SimpleGrid>
      </Stack>
    </Card>
  );
};
