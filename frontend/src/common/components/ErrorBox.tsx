import React from 'react';

interface ErrorBoxProps {
  errorMessage: string;
}

const ErrorBox = ({ errorMessage }: ErrorBoxProps): JSX.Element => {
  return <p>{errorMessage}</p>;
};

export default ErrorBox;
