import { Card, Center, Container, Stack, Title } from "@mantine/core";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useAppForm } from "../../components/forms/form";
import { loginSchema, LoginSchema } from "@repo/schemas/authSchema";
import { useAtom } from "jotai";
import { authAtom, userAtom } from "../../state/userAtom";
import { authClient } from "../../services/authClient";

export const Route = createFileRoute("/auth/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const [, setAuth] = useAtom(authAtom);
  const [, setUser] = useAtom(userAtom);
  const navigate = useNavigate();

  const { AppForm, AppField, SubmitButton, handleSubmit } = useAppForm({
    defaultValues: {
      email: "",
      password: "",
    } as LoginSchema,
    validators: {
      onSubmit: loginSchema,
    },
    onSubmit: async ({ value }) => {
      setAuth((prev) => ({ ...prev, isLoading: true }));
      const { data, error } = await authClient.signIn.email({
        email: value.email,
        password: value.password,
      });

      if (data) {
        setAuth((prev) => ({ ...prev, isLoading: false }));
        setUser(data.user);
        navigate({ to: "/media" });
      }

      if (error) {
        setAuth((prev) => ({ ...prev, isLoading: false }));
        console.log(error.message);
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
                <Title order={3}>Login</Title>
                <AppField
                  name="email"
                  children={({ TextField }) => <TextField label="Email" placeholder="Enter Your Email ID" />}
                />
                <AppField
                  name="password"
                  children={({ PasswordField }) => <PasswordField label="Password" placeholder="Enter Your Password" />}
                />
                <SubmitButton label="Login" />
                <Link to="/auth/register">Don't have an account? Register!</Link>
              </Stack>
            </AppForm>
          </form>
        </Card>
      </Center>
    </Container>
  );
}
