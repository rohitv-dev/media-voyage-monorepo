import { Container, Center, Card, Stack, Title } from "@mantine/core";
import { createFileRoute, Link, Outlet, redirect, useNavigate } from "@tanstack/react-router";
import { useAppForm } from "../../components/forms/form";
import { registerSchema, RegisterSchema } from "@repo/schemas/authSchema";
import { authClient } from "../../services/authClient";
import { showErrorNotification } from "../../utils/notifications";
import { useAtom } from "jotai";
import { authAtom, userAtom } from "../../state/userAtom";
import { LoadingScreen } from "../../components/LoadingScreen";

export const Route = createFileRoute("/auth/register")({
  component: RouteComponent,
  beforeLoad: ({ context }) => {
    if (context.auth.isLoading) return <LoadingScreen />;

    if (context.auth.isLoggedIn)
      throw redirect({
        to: "/media",
      });

    return <Outlet />;
  },
});

function RouteComponent() {
  const [, setAuth] = useAtom(authAtom);
  const [, setUser] = useAtom(userAtom);
  const navigate = useNavigate();

  const { AppForm, AppField, SubmitButton, handleSubmit } = useAppForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    } as RegisterSchema,
    validators: {
      onSubmit: registerSchema,
    },
    onSubmit: async ({ value }) => {
      setAuth((prev) => ({ ...prev, isLoading: true }));

      const { data, error } = await authClient.signUp.email({
        name: value.username,
        email: value.email,
        password: value.password,
      });

      if (data) {
        setAuth((prev) => ({ ...prev, isLoading: false }));
        setUser(data.user);
        navigate({
          to: "/media",
        });
      }

      if (error) {
        setAuth((prev) => ({ ...prev, isLoading: false }));
        showErrorNotification(error.message);
        return;
      }
    },
  });

  return (
    <Container h="100vh">
      <Center h="100%">
        <Card miw={400} shadow="lg" p="xl">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <AppForm>
              <Stack>
                <Title order={3}>Register</Title>
                <AppField
                  name="username"
                  children={({ TextField }) => <TextField label="Username" placeholder="Enter Your Username" />}
                />
                <AppField
                  name="email"
                  children={({ TextField }) => <TextField label="Email" placeholder="Enter Your Email" />}
                />
                <AppField
                  name="password"
                  children={({ PasswordField }) => <PasswordField label="Password" placeholder="Enter Your Password" />}
                />
                <AppField
                  name="confirmPassword"
                  children={({ PasswordField }) => (
                    <PasswordField label="Password" placeholder="Confirm Your Password" />
                  )}
                />
                <SubmitButton>Register</SubmitButton>
                <Link to="/auth/login">Already have an account? Login!</Link>
              </Stack>
            </AppForm>
          </form>
        </Card>
      </Center>
    </Container>
  );
}
