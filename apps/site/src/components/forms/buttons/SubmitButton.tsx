import { Button } from "@mantine/core";
import { useFormContext } from "../form";

export function SubmitButton({ label }: { label: string }) {
  const form = useFormContext();

  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <Button type="submit" loading={isSubmitting}>
          {label}
        </Button>
      )}
    </form.Subscribe>
  );
}
