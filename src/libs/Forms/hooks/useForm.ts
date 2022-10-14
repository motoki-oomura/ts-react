import { TypeOf, ZodSchema } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm as useHookForm, UseFormProps } from 'react-hook-form';

type Props<T extends ZodSchema<any>> = UseFormProps<TypeOf<T>> & {
    schema: T;
};

export const useForm = <T extends ZodSchema<any>>(props: Props<T>) => {
    const { schema, ...formOptions } = props;
    return useHookForm({
        resolver: zodResolver(schema),
        ...formOptions,
    });
};
