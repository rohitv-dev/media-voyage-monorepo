import { createFormHookContexts, createFormHook } from "@tanstack/react-form";
import { TextField } from "./fields/TextField";
import { PasswordField } from "./fields/PasswordField";
import { SubmitButton } from "./buttons/SubmitButton";
import { NumberField } from "./fields/NumberField";

export const { fieldContext, formContext, useFieldContext, useFormContext } = createFormHookContexts();

export const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    TextField,
    PasswordField,
    NumberField,
  },
  formComponents: {
    SubmitButton,
  },
});
