import React from 'react';
import TextareaAutosize, { TextareaAutosizeProps } from 'react-textarea-autosize';
import { withFormikInput } from 'common/components/Inputs/HOC/withFormikInput';

const TextAreaInput = withFormikInput<TextareaAutosizeProps, string | number | readonly string[]>(
  TextareaAutosize,
);

export default TextAreaInput;
