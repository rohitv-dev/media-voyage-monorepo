import { ActionIcon, AppShell, Button, Container, Group, Stack, Title, useMantineColorScheme } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconMoon, IconSun } from "@tabler/icons-react";
import { createRootRouteWithContext, Link, Outlet, useNavigate } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { AuthState, User } from "../state/userAtom";
import { HeaderDropdown } from "../components/HeaderDropdown";

interface MediaRouterContext {
  auth: AuthState;
  user: User;
}

export const Route = createRootRouteWithContext<MediaRouterContext>()({
  component: () => <RootComponent />,
});

function RootComponent() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const navigate = useNavigate();
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
              {/* <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" /> */}
              <Title order={3} style={{ userSelect: "none", cursor: "pointer" }}>
                Media Voyage
              </Title>
            </Group>
            <Group justify="end" visibleFrom="sm">
              <Button component={Link} to="" variant="light">
                Home
              </Button>
              <Button component={Link} to="add" variant="light">
                Add
              </Button>
              <ActionIcon size="lg" onClick={toggleColorScheme}>
                {colorScheme === "dark" ? <IconSun /> : <IconMoon />}
              </ActionIcon>

              <HeaderDropdown />
            </Group>
          </Group>
        </AppShell.Header>
        <AppShell.Navbar p="md">
          <Stack justify="space-between" h="100%">
            <Stack>
              <Button variant="light" onClick={() => navigate({ to: "/" })}>
                Home
              </Button>
              <Button component={Link} to="/add" variant="light">
                Add
              </Button>
              <Button component={Link} to="/profile" variant="light">
                Profile
              </Button>
              <Button variant="outline" onClick={toggleColorScheme}>
                {colorScheme === "dark" ? "Light Mode" : "Dark Mode"}
              </Button>
            </Stack>
            <Button component={Link} to="/logout" variant="light" color="red">
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
