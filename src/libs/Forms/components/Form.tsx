import React from 'react';
import { SubmitHandler, useForm, UseFormProps, UseFormReturn } from 'react-hook-form';
import { ZodType, ZodTypeDef } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

type Props<FormValues, Schema> = {
    className?: string;
    children: (formMethods: UseFormReturn<FormValues>) => React.ReactNode;
    options?: UseFormProps<FormValues>;
    onSubmit: SubmitHandler<FormValues>;
    schema?: Schema;
    id?: string;
};

export const Form = <
    FormValues extends Record<string, unknown> = Record<string, unknown>,
    Schema extends ZodType<unknown, ZodTypeDef, unknown> = ZodType<unknown, ZodTypeDef, unknown>
>(
    props: Props<FormValues, Schema>
) => {
    const { children, options, className, onSubmit, schema, id } = props;

    const formMethods = useForm<FormValues>({
        ...options,
        resolver: schema && zodResolver(schema),
    });

    return (
        <form className={className} onSubmit={formMethods.handleSubmit(onSubmit)} id={id}>
            {children(formMethods)}
        </form>
    );
};
