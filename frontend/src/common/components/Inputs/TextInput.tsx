import React from 'react';
import { FieldInputProps, useField } from 'formik';

type TextInputProps<Value> = FieldInputProps<Value> & {
  className?: string;
};

const TextInput = (props: TextInputProps<string>): JSX.Element => {
  const [field] = useField<string>(props);
  return <input {...field} {...props} />;
};

export default TextInput;
