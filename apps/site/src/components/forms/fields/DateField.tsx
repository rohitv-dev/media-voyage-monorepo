import { useFieldContext } from "../form";
import { DateInput, DateInputProps } from "@mantine/dates";

export function DateField(props: DateInputProps) {
  const field = useFieldContext<Date>();

  return (
    <DateInput
      {...props}
      clearable
      error={field.state.meta.errors[0]?.message}
      value={field.state.value}
      onChange={(v) => {
        if (v) field.handleChange(v);
      }}
    />
  );
}
