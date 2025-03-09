import { PasswordInput } from "@mantine/core";
import { useFieldContext } from "../form";

export function PasswordField({ label, placeholder }: { label: string; placeholder?: string }) {
  const field = useFieldContext<string>();

  return (
    <PasswordInput
      label={label}
      placeholder={placeholder}
      error={field.state.meta.errors[0]?.message}
      value={field.state.value}
      onChange={(e) => field.handleChange(e.target.value)}
      onBlur={field.handleBlur}
    />
  );
}
