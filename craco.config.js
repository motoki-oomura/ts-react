const CracoAlias = require('craco-alias');

module.exports = {
    mode: process.env.REACT_APP_ENV,
    output: {
        path: __dirname,
    },
    // craco plugin setting
    plugins: [
        {
            plugin: CracoAlias,
            options: {
                source: 'tsconfig',
                baseUrl: '.',
                tsConfigPath: './tsconfig.paths.json',
            },
        },
    ]
};