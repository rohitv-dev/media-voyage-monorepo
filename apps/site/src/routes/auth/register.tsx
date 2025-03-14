import { Container, Center, Card, Stack, Title } from "@mantine/core";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useAppForm } from "../../components/forms/form";
import { registerSchema, RegisterSchema } from "@repo/schemas/authSchema";
import { authClient } from "../../services/authClient";

export const Route = createFileRoute("/auth/register")({
  component: RouteComponent,
});

function RouteComponent() {
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
      const { data, error } = await authClient.signUp.email(
        {
          name: value.username,
          email: value.email,
          password: value.password,
        },
        {
          onSuccess: () => {
            navigate({
              to: "/media",
            });
          },
          onError: (ctx) => {
            console.log(ctx.error.message);
          },
        }
      );
      console.log(data, error);
      // try {
      //   const res = await fetch("/api/auth/register", {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify(values.value),
      //   });
      //   const json = await res.json();
      // } catch (error) {
      //   console.error("Error during register:", error);
      // }
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
                <SubmitButton label="Register" />
                <Link to="/auth/login">Already have an account? Login!</Link>
              </Stack>
            </AppForm>
          </form>
        </Card>
      </Center>
    </Container>
  );
}
