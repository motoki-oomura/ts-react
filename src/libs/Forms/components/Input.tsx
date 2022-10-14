import React from 'react';
import { useFormContext } from 'react-hook-form';

export type InputProps = JSX.IntrinsicElements['input'] & {
    name: string;
};

export const Input: React.FC<InputProps> = (props) => {
    const { name, ...inputProps } = props;
    const { register } = useFormContext();
    return <input {...inputProps} {...register(name)} />;
};
