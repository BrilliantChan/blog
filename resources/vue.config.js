const {defineConfig} = require('@vue/cli-service');
const css = require('./config/css');
const path = require('path');

module.exports = defineConfig({
    outputDir: '../docs',

    publicPath: process.env.NODE_ENV === 'production' ? '/blog/' : '/',

    transpileDependencies: true,

    css,

    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'less',
            patterns: [
                path.resolve(__dirname, './src/assets/less/variables.less'),
	            path.resolve(__dirname, './src/assets/less/func.less')
            ]
        }
    }
});
