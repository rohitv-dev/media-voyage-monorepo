import { TextInput, TextInputProps } from "@mantine/core";
import { useFieldContext } from "../form";

export function TextField(props: TextInputProps) {
  const field = useFieldContext<string>();

  return (
    <TextInput
      {...props}
      error={field.state.meta.errors[0]?.message}
      value={field.state.value}
      onChange={(e) => field.handleChange(e.target.value)}
      onBlur={field.handleBlur}
    />
  );
}
