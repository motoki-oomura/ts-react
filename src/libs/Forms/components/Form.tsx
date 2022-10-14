import React from 'react';
import { SubmitHandler, useForm, UseFormProps, UseFormReturn, FormProvider } from 'react-hook-form';
import { ZodType, ZodTypeDef } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

type Props<FormValues, Schema> = {
    className?: string;
    children: ((formMethods: UseFormReturn<FormValues>) => React.ReactNode) | React.ReactNode;
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

    const form = useForm<FormValues>({
        ...options,
        resolver: schema && zodResolver(schema),
    });

    return (
        <FormProvider {...form}>
            <form className={className} onSubmit={form.handleSubmit(onSubmit)} id={id} noValidate>
                {typeof children === 'function' ? children(form) : children}
            </form>
        </FormProvider>
    );
};
