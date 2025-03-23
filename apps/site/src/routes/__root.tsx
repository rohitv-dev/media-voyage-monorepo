import {
  ActionIcon,
  AppShell,
  Burger,
  Button,
  Container,
  Group,
  Skeleton,
  Stack,
  Title,
  useMantineColorScheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconMoon, IconSun } from "@tabler/icons-react";
import { createRootRouteWithContext, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { authAtom, AuthState, User } from "../state/userAtom";
import { HeaderDropdown } from "../components/HeaderDropdown";
import { useAtom } from "jotai";

interface MediaRouterContext {
  auth: AuthState;
  user: User;
}

export const Route = createRootRouteWithContext<MediaRouterContext>()({
  component: () => <RootComponent />,
});

function RootComponent() {
  const [auth] = useAtom(authAtom);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const [opened, { toggle }] = useDisclosure();

  return (
    <>
      <AppShell
        header={{ height: 60 }}
        navbar={{ width: 300, breakpoint: "sm", collapsed: { desktop: true, mobile: !opened } }}
      >
        <AppShell.Header px="lg">
          <Group h="100%" justify="space-between">
            <Group>
              <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
              <Title order={3} style={{ userSelect: "none", cursor: "pointer" }}>
                Media Voyage
              </Title>
            </Group>
            {auth.isLoading ? (
              <Group>
                <Skeleton w={100} h={35} />
                <Skeleton w={100} h={35} />
                <Skeleton w={100} h={35} />
              </Group>
            ) : (
              <Group justify="end" visibleFrom="sm">
                <Link to="/media">
                  <Button variant="light">Home</Button>
                </Link>
                {!auth.isLoggedIn ? (
                  <Link to="/auth/login">
                    <Button variant="light">Login</Button>
                  </Link>
                ) : (
                  <Link to="/media/add">
                    <Button variant="light">Add</Button>
                  </Link>
                )}
                <ActionIcon size="lg" onClick={toggleColorScheme}>
                  {colorScheme === "dark" ? <IconSun /> : <IconMoon />}
                </ActionIcon>

                {auth.isLoggedIn && <HeaderDropdown />}
              </Group>
            )}
          </Group>
        </AppShell.Header>
        <AppShell.Navbar p="md">
          <Stack justify="space-between" h="100%" w="100%">
            <Stack>
              <Link to="/media">
                <Button variant="light">Home</Button>
              </Link>
              <Link to="/media/add">
                <Button variant="light">Add</Button>
              </Link>
              <Link to="/">
                <Button variant="light">Profile</Button>
              </Link>
              <Button variant="outline" onClick={toggleColorScheme}>
                {colorScheme === "dark" ? "Light Mode" : "Dark Mode"}
              </Button>
            </Stack>
            <Button variant="light" color="red">
              Logout
            </Button>
          </Stack>
        </AppShell.Navbar>
        <AppShell.Main>
          <Container py="md" px="xs">
            <Outlet />
            <TanStackRouterDevtools />
          </Container>
        </AppShell.Main>
      </AppShell>
    </>
  );
}
