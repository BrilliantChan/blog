const {defineConfig} = require('@vue/cli-service');

module.exports = defineConfig({
    outputDir: 'docs',

    publicPath: process.env.NODE_ENV === 'production' ? '/blog/' : '/',

    transpileDependencies: true,

    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'less',
            patterns: []
        }
    }
});
