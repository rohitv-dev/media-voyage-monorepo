import { Stack, Text, rem } from "@mantine/core";
import { formatDate } from "@repo/schemas/dateFunctions";
import { isNullish, isDate, isBoolean } from "remeda";

export const DataColumn = ({ title, value }: { title: string; value?: string | Date | boolean | null }) => {
  if (isNullish(value)) return null;

  const getValue = () => {
    if (isDate(value)) return formatDate(value);
    if (isBoolean(value)) return value ? "Yes" : "No";
    return value;
  };

  return (
    <Stack gap="5px">
      <Text fw="bold" fz={rem(16)}>
        {title}
      </Text>
      <Text fz={rem(14)}>{getValue()}</Text>
    </Stack>
  );
};
