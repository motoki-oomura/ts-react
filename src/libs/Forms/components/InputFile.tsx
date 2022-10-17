import React from 'react';
import { useFormContext } from 'react-hook-form';

export type InputFileProps = JSX.IntrinsicElements['input'] & {
    name: string;
};

export const InputFile: React.FC<InputFileProps> = (props) => {
    const { name, ...inputProps } = props;
    const { register } = useFormContext();
    const inputFile = register(name);
    return <input {...inputProps} type='file' {...inputFile} />;
};
