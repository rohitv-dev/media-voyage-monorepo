import { PasswordInput, PasswordInputProps } from "@mantine/core";
import { useFieldContext } from "../form";

export function PasswordField(props: PasswordInputProps) {
  const field = useFieldContext<string>();

  return (
    <PasswordInput
      {...props}
      error={field.state.meta.errors[0]?.message}
      value={field.state.value}
      onChange={(e) => field.handleChange(e.target.value)}
      onBlur={field.handleBlur}
    />
  );
}
