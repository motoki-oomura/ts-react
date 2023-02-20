import React from 'react';
import _DemoPageLayout from '@pages/_demo/_DemoPageLayout';
import { Form } from '@libs/Forms';
import { z } from 'zod';
import useApi from "@libs/Api/hooks/useApi";

const schema = z
    .object({
        username: z.string().min(1, { message: 'ユーザー名を入力してください' }).describe('ユーザー名'),
        email: z.string().min(1, { message: 'メールアドレスを入力してください' }).email({ message: 'メールアドレスの形式が違います' }),
        password: z.string().min(1, { message: 'パスワードを入力してください' }),
        passwordConfirm: z.string().min(1, { message: 'パスワード確認を入力してください' }),
        accept: z.boolean().refine((val) => val, '利用規約に同意してください'),
    })
    .refine(({ password, passwordConfirm }) => password === passwordConfirm, {
        message: 'パスワードが一致しません',
        path: ['passwordConfirm'],
    });
type FormData = z.infer<typeof schema>;

const DemoFormSignUpPage: React.FC = () => {
    const { api } = useApi();
    const handleSubmit = async (data: FormData) => {
        console.log('data', data);
        const res = await api.post('/signin', data);
        console.log(res);
    };

    return (
        <_DemoPageLayout>
            <Form<FormData, typeof schema> onSubmit={handleSubmit} schema={schema} id='signup-form' options={{ reValidateMode: 'onSubmit' }}>
                {({ register, formState: { errors } }) => (
                    <>
                        <div>{errors?.username?.message}</div>
                        <div>{errors?.email?.message}</div>
                        <div>{errors?.password?.message}</div>
                        <div>{errors?.passwordConfirm?.message}</div>
                        <div>{errors?.accept?.message}</div>
                        <div>
                            <input type='text' {...register('username')} />
                        </div>
                        <div>
                            <input type='email' {...register('email')} />
                        </div>
                        <div>
                            <input type='password' {...register('password')} />
                        </div>
                        <div>
                            <input type='password' {...register('passwordConfirm')} />
                        </div>
                        <div>
                            <input type='checkbox' {...register('accept')} />
                        </div>
                        <div>
                            <button type='submit'>送信</button>
                        </div>
                    </>
                )}
            </Form>
        </_DemoPageLayout>
    );
};
export default DemoFormSignUpPage;
