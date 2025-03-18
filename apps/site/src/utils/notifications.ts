import { notifications } from "@mantine/notifications";
import { ReactNode } from "react";

export const showErrorNotification = (message?: ReactNode) =>
  notifications.show({
    title: "Error",
    message: message ?? "An Error Has Occurred",
    color: "red",
    autoClose: 4000,
  });

export const showSuccessNotification = (message?: ReactNode) =>
  notifications.show({
    title: "Success",
    message: message ?? "Success",
    color: "green",
    autoClose: 4000,
  });

export const showWarningNotification = (message?: ReactNode) =>
  notifications.show({
    title: "Warning",
    message: message ?? "Warning",
    color: "yellow",
    autoClose: 4000,
  });
