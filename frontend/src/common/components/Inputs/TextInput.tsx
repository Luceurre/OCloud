import React from 'react';
import { withFormikInput } from 'common/components/Inputs/HOC/withFormikInput';

interface TextInputProps {
  type?: string;
  name?: string;
}
const TextInput = withFormikInput((props: TextInputProps) => <input {...props} />);
export default TextInput;
