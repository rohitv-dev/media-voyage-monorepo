import { Rating, RatingProps } from "@mantine/core";
import { useFieldContext } from "../form";

export function RatingField(props: RatingProps) {
  const field = useFieldContext<number>();

  return (
    <Rating
      {...props}
      value={field.state.value}
      onChange={(v) => {
        if (v) field.handleChange(v);
      }}
    />
  );
}
