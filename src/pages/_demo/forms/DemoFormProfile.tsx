import React, { useState } from 'react';
import _DemoPageLayout from '@pages/_demo/_DemoPageLayout';
import { FieldError, Form, Input, InputFile, Select } from '@libs/Forms';
import { z } from 'zod';
import useEffectOnce from '@hooks/useEffectOnce';
import { wait } from '@utils/misc';

const BLOOD_TYPES = [
    { key: 'A', name: 'A型' },
    { key: 'B', name: 'B型' },
    { key: 'O', name: 'O型' },
    { key: 'AB', name: 'AB型' },
    { key: 'null', name: '不明' },
];

const schema = z
    .object({
        nickname: z.string().min(1, { message: 'ニックネームを入力してください' }).describe('ニックネーム'),
        blood: z.string().min(1, { message: '血液型を入力してください' }).describe('血液型'),
        birthday: z
            .preprocess((arg) => {
                if (typeof arg === 'string' || arg instanceof Date) return new Date(arg);
                return arg;
            }, z.date())
            .describe('誕生日'),
        url: z.string().url({ message: 'URLの形式で入力してください' }).optional(),
        icon: z
            .nullable(z.instanceof(FileList))
            .or(z.string())
            .refine((v) => !v || v.length !== 0, 'ファイルを選択してください')
            .describe('プロフィール画像'),
        // icon: z.string().default('').describe("プロフィール画像URL")
    })
    .strict();
type FormData = z.infer<typeof schema>;

const DemoFormProfilePage: React.FC = () => {
    const [defaultValues, setDefaultValues] = useState<FormData>({
        nickname: '',
        blood: '',
        birthday: new Date('1990-01-01'),
        url: '',
        icon: null,
    });
    const handleSubmit = (data: FormData) => {
        console.log('data', data);
    };

    useEffectOnce(() => {
        (async () => {
            // fetch simulated.
            await wait(1000);
            setDefaultValues({
                nickname: 'もっくん Part2',
                blood: 'B',
                birthday: new Date('1990-05-24'),
                url: 'https://hoge.com',
                icon: 'https://www.asahicom.jp/and/w/wp-content/uploads/2019/07/IMG_4509_re.jpg',
            });
        })();
    });

    return (
        <_DemoPageLayout>
            {
                <Form<FormData, typeof schema>
                    onSubmit={handleSubmit}
                    schema={schema}
                    id='profile-form'
                    options={{ reValidateMode: 'onSubmit', defaultValues }}>
                    {({ preview }) => (
                        <>
                            <div>
                                <FieldError name='nickname' />
                            </div>
                            <div>
                                <FieldError name='blood' />
                            </div>
                            <div>
                                <FieldError name='birthday' />
                            </div>
                            <div>
                                <FieldError name='url' />
                            </div>
                            <div>
                                <FieldError name='icon' />
                            </div>
                            <div>
                                ニックネーム：
                                <Input type='text' name='nickname' />
                            </div>
                            <div>
                                血液型：
                                <Select name='blood' defaultValue={''}>
                                    <option value='' disabled>
                                        選択してください
                                    </option>
                                    {BLOOD_TYPES.map((b) => (
                                        <option value={b.key} key={b.key}>
                                            {b.name}
                                        </option>
                                    ))}
                                </Select>
                            </div>
                            <div>
                                誕生日：
                                <Input type='date' name='birthday' />
                            </div>
                            <div>
                                URL：
                                <Input type='text' name='url' />
                            </div>
                            <div>
                                アイコン：
                                <InputFile name='icon' />
                            </div>
                            <div>
                                画像：
                                <img src={preview('icon')} alt='' style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                            </div>
                            <div>
                                <button type='submit'>送信</button>
                            </div>
                        </>
                    )}
                </Form>
            }
        </_DemoPageLayout>
    );
};
export default DemoFormProfilePage;
