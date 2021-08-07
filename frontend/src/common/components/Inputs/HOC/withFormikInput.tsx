import React from 'react';
import { useField } from 'formik';

export const withFormikInput = <InputProps extends { name?: string }>(
  InputComponent: React.ComponentType<InputProps>,
) => {
  const FormikInput = ({
    ...props
  }: InputProps & { name: string; editMode?: boolean }): JSX.Element => {
    const [field] = useField(props);
    if (!(props.editMode ?? false)) return <>{field.value}</>;
    return <InputComponent {...field} {...props} />;
  };

  FormikInput.displayName = 'FormikInput';
  return FormikInput;
};
