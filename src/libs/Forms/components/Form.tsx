import React, { useCallback, useEffect } from 'react';
import { SubmitHandler, useForm, UseFormProps, UseFormReturn, FormProvider, Path } from 'react-hook-form';
import { ZodType, ZodTypeDef } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

type FormMethods<FormValues> = UseFormReturn<FormValues> & {
    preview: (name: Path<FormValues>, index?: number) => string;
};

type Props<FormValues, Schema> = {
    className?: string;
    children: ((formMethods: FormMethods<FormValues>) => React.ReactNode) | React.ReactNode;
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
    const { watch, reset } = form;

    const formMethods: FormMethods<FormValues> = {
        ...form,
        preview: useCallback(
            (name, index = 0) => {
                const files = watch(name);
                if (typeof files === 'string') return files;
                if (!(files instanceof FileList)) return '';
                if (files.length === 0) return '';
                if (files.length - 1 < index) return '';

                return URL.createObjectURL(files[index]);
            },
            [watch]
        ),
    };

    useEffect(() => {
        reset(options?.defaultValues);
    }, [options?.defaultValues]);

    return (
        <FormProvider {...form}>
            <form className={className} onSubmit={form.handleSubmit(onSubmit)} id={id} noValidate>
                {typeof children === 'function' ? children(formMethods) : children}
            </form>
        </FormProvider>
    );
};
