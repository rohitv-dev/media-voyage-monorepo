import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./utils/trpc";
import { useEffect } from "react";
import { MantineProvider } from "@mantine/core";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { useAtom } from "jotai";
import { authAtom, initialUser, userAtom } from "./state/userAtom";

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
  const [user, setUser] = useAtom(userAtom);
  const [auth, setAuth] = useAtom(authAtom);

  useEffect(() => {
    async function run() {
      try {
        setAuth((prev) => ({ ...prev, isLoading: true }));
        const res = await fetch("/api/auth/status");
        const json = await res.json();
        if (json.ok) {
          setUser(json.data);
          setAuth((prev) => ({ ...prev, isLoggedIn: true }));
        }
      } catch (err) {
        console.log(err);
      }
      setAuth((prev) => ({ ...prev, isLoading: false }));
    }
    run();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider>
        <RouterProvider router={router} context={{ auth, user }} />
      </MantineProvider>
    </QueryClientProvider>
  );
}

export default App;
