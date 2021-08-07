import React from 'react';
import { FieldInputProps, useField } from 'formik';

export function withFormikInput<
  InputProps extends { name?: string } & Partial<FieldInputProps<T>>,
  T extends string | number | readonly string[]
>(InputComponent: React.ComponentType<InputProps>) {
  const FormikInput = ({
    editMode,
    ...props
  }: InputProps & { name: string; editMode?: boolean }): JSX.Element => {
    const [field] = useField<T>(props);
    if (!(editMode ?? false)) return <>{field.value}</>;
    return <InputComponent {...(field as InputProps)} {...props} />;
  };

  FormikInput.displayName = 'FormikInput';
  return FormikInput;
}
