import { TextInput } from "@mantine/core";
import { useFieldContext } from "../form";

export function TextField({ label, placeholder }: { label: string; placeholder?: string }) {
  const field = useFieldContext<string>();

  return (
    <TextInput
      label={label}
      placeholder={placeholder}
      error={field.state.meta.errors[0]?.message}
      value={field.state.value}
      onChange={(e) => field.handleChange(e.target.value)}
      onBlur={field.handleBlur}
    />
  );
}
