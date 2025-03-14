import { useEffect } from "react";
import { MantineProvider, Modal, Rating } from "@mantine/core";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { useAtom } from "jotai";
import { authAtom, initialUser, userAtom } from "./state/userAtom";
import { authClient } from "./services/authClient";

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const router = createRouter({
  routeTree,
  context: { auth: { isLoading: false, isLoggedIn: false }, user: initialUser },
});

function App() {
  const { data, error, isPending } = authClient.useSession();

  const [user, setUser] = useAtom(userAtom);
  const [auth, setAuth] = useAtom(authAtom);

  useEffect(() => {
    if (isPending) {
      setAuth((prev) => ({ ...prev, isLoading: true }));
    }

    if (error) {
      setAuth((prev) => ({ ...prev, isLoading: false, isLoggedIn: false }));
      setUser(initialUser);
      return;
    }

    if (data) {
      setAuth((prev) => ({ ...prev, isLoading: false, isLoggedIn: true }));
      setUser(data.user);
    }

    setAuth((prev) => ({ ...prev, isLoading: false }));
  }, [data, error, isPending, setAuth, setUser]);

  return (
    <MantineProvider
      theme={{
        primaryColor: "teal",
        white: "#f4f3ef",
        components: {
          Rating: Rating.extend({
            defaultProps: {
              fractions: 2,
            },
          }),
          Modal: Modal.extend({
            styles: {
              title: {
                fontSize: 18,
                fontWeight: "bold",
              },
            },
          }),
        },
      }}
    >
      <RouterProvider router={router} context={{ auth, user }} />
    </MantineProvider>
  );
}

export default App;
