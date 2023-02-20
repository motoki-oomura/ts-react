import { rest } from 'msw';

export const handlers = [
    rest.post('/signin', (req, res, ctx) => {
        console.log('mock, signin', req);
        return res(ctx.status(400), ctx.json({ message: '400 error.'}));
    }),
];
