import React from 'react';
import { useFormContext } from 'react-hook-form';

type SelectProps = JSX.IntrinsicElements['select'] & {
    name: string;
    children: React.ReactNode;
};

export const Select: React.FC<SelectProps> = (props) => {
    const { name, children, ...selectProps } = props;

    const { register } = useFormContext();

    return (
        <select {...selectProps} {...register(name)}>
            {children}
        </select>
    );
};
