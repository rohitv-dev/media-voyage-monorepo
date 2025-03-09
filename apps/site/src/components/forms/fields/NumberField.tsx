import { NumberInput } from "@mantine/core";
import { useFieldContext } from "../form";

export function NumberField({ label }: { label: string }) {
  const field = useFieldContext<number>();

  return (
    <NumberInput
      label={label}
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
