import React from 'react';
import { useFormContext } from 'react-hook-form';

type FieldErrorProps = { name?: string; className?: string };

export const FieldError: React.FC<FieldErrorProps> = (props) => {
    const { name = '', className } = props;
    const {
        formState: { errors },
    } = useFormContext();
    const error = errors[name];
    if (!error) return null;
    return <span className={className}>{error.message as string}</span>;
};
