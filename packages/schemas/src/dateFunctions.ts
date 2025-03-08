import dayjs, { Dayjs } from "dayjs";

export function formatDate(date: Date | Dayjs, withTime: boolean = false): string {
  return dayjs(date).format(withTime ? "DD/MM/YYYY hh:mm a" : "DD/MM/YYYY");
}
