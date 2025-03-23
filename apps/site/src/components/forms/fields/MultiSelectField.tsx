import { MultiSelect, MultiSelectProps } from "@mantine/core";
import { useFieldContext } from "../form";

export function MultiSelectField(props: MultiSelectProps) {
  const field = useFieldContext<string[]>();

  console.log(field.state.value);

  return (
    <MultiSelect
      {...props}
      value={field.state.value ?? []}
      onChange={(v) => {
        if (v) field.handleChange(v);
      }}
    />
  );
}
