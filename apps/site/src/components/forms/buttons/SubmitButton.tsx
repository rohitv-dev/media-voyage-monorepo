import { Button, ButtonProps } from "@mantine/core";
import { useFormContext } from "../form";

export function SubmitButton(props: ButtonProps) {
  const form = useFormContext();

  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <Button type="submit" loading={isSubmitting}>
          {props.children}
        </Button>
      )}
    </form.Subscribe>
  );
}
