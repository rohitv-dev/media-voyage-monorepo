import { createFormHookContexts, createFormHook } from "@tanstack/react-form";
import { TextField } from "./fields/TextField";
import { PasswordField } from "./fields/PasswordField";
import { SubmitButton } from "./buttons/SubmitButton";
import { NumberField } from "./fields/NumberField";
import { SelectField } from "./fields/SelectField";
import { DateField } from "./fields/DateField";
import { EditorField } from "./fields/EditorField";
import { RatingField } from "./fields/RatingField";
import { MultiSelectField } from "./fields/MultiSelectField";

export const { fieldContext, formContext, useFieldContext, useFormContext } = createFormHookContexts();

export const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    TextField,
    PasswordField,
    NumberField,
    SelectField,
    DateField,
    EditorField,
    RatingField,
    MultiSelectField,
  },
  formComponents: {
    SubmitButton,
  },
});
