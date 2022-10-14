import React from 'react';
import _DemoPageLayout from '@pages/_demo/_DemoPageLayout';
import { FieldError, Form, Input, Select } from '@libs/Forms';
import { z } from 'zod';

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
        icon: z.nullable(z.instanceof(FileList)),
    })
    .strict();
type FormData = z.infer<typeof schema>;

const DemoFormProfilePage: React.FC = () => {
    const handleSubmit = (data: FormData) => {
        console.log('data', data);
    };

    console.log('schema', Object.keys(schema));

    return (
        <_DemoPageLayout>
            <Form<FormData, typeof schema> onSubmit={handleSubmit} schema={schema} id='profile-form' options={{ reValidateMode: 'onSubmit' }}>
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
                    <Input type='file' name='icon' />
                </div>
                <div>
                    アイコン：
                    <input type='file' />
                </div>
                <div>
                    <button type='submit'>送信</button>
                </div>
            </Form>
        </_DemoPageLayout>
    );
};
export default DemoFormProfilePage;
