import React from 'react';
import TextareaAutosize, { TextareaAutosizeProps } from 'react-textarea-autosize';
import { withFormikInput } from 'common/components/Inputs/HOC/withFormikInput';

const TextAreaInput = withFormikInput<TextareaAutosizeProps>(TextareaAutosize);

export default TextAreaInput;
