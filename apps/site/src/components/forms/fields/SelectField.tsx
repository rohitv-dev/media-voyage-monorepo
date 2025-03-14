import { Select, SelectProps } from "@mantine/core";
import { useFieldContext } from "../form";

export function SelectField(props: SelectProps) {
  const field = useFieldContext<string>();

  return (
    <Select
      {...props}
      error={field.state.meta.errors[0]?.message}
      value={field.state.value}
      onChange={(val) => {
        if (val) field.handleChange(val);
      }}
      onBlur={field.handleBlur}
    />
  );
}
