import { createFileRoute } from "@tanstack/react-router";
import { useAtom } from "jotai";
import { userAtom } from "../../state/userAtom";
import { Center, Stack, Card, Avatar, Text } from "@mantine/core";
import { formatDate } from "@repo/schemas/dateFunctions";

export const Route = createFileRoute("/profile")({
  component: RouteComponent,
});

function RouteComponent() {
  const [user] = useAtom(userAtom);

  return (
    <Center>
      <Stack>
        <Card miw={400} radius="md" shadow="md">
          <Stack style={{ textAlign: "center" }}>
            <Center>
              <Avatar radius="xl" size="xl" color="initials" name={user.name} />
            </Center>
            <Text fw="bold" fz="lg">
              {user.name}
            </Text>
            <Text>{user.email}</Text>
            <Text>Registered on {formatDate(user.createdAt, true)}</Text>
          </Stack>
        </Card>
        {/* <FriendsCard /> */}
      </Stack>
    </Center>
  );
}
