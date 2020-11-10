// eslint-disable-next-line
import React from 'react';

type ErrorMessageContainerProps = {
    children?: React.ReactNode;
};

const ErrorMessageContainer: React.FC = ({ children }: ErrorMessageContainerProps) => (
    <span className="error">{children}</span>
);

export default ErrorMessageContainer;
