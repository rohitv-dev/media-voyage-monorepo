import { Center, Container, Stack, Title } from "@mantine/core";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useAtom } from "jotai";
import { authAtom } from "../state/userAtom";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [auth] = useAtom(authAtom);

  return (
    <Container>
      <Center>
        <Stack style={{ textAlign: "center" }}>
          <Title order={2}>Welcome!</Title>
          {auth.isLoggedIn && <Link to="/media">Media</Link>}
        </Stack>
      </Center>
    </Container>
  );
}
