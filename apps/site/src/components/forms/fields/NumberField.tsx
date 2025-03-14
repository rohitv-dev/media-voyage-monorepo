import { NumberInput, NumberInputProps } from "@mantine/core";
import { useFieldContext } from "../form";

export function NumberField(props: NumberInputProps) {
  const field = useFieldContext<number>();

  return (
    <NumberInput
      {...props}
      error={field.state.meta.errors[0]?.message}
      value={field.state.value}
      onChange={(v) => {
        if (typeof v === "string") {
          field.handleChange(parseInt(v));
        } else {
          field.handleChange(v);
        }
      }}
    />
  );
}
