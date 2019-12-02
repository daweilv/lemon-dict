const webpack = require('webpack');

const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin');
const parts = require('./webpack.parts');
const paths = require('./paths');

const isEnvProduction = process.env.NODE_ENV === 'production';
const isChrome = process.env.NODE_DEVICE === 'chrome';

const commonConfig = merge([
    {
        output: {
            filename: isEnvProduction
                ? 'static/js/[name].[contenthash:8].js'
                : 'static/js/[name].[hash:8].js',
            path: paths.appBuild,
            publicPath: '/',
        },
        optimization: {
            // Automatically split vendor and commons
            // https://twitter.com/wSokra/status/969633336732905474
            // https://medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366
            // splitChunks: {
            //     chunks: 'all',
            //     name: false,
            // },
            // Keep the runtime chunk separated to enable long term caching
            // https://twitter.com/wSokra/status/969679223278505985
            // https://github.com/facebook/create-react-app/issues/5358
            // runtimeChunk: {
            //     name: entrypoint => `runtime-${entrypoint.name}`,
            // },
        },
        resolve: {
            modules: [paths.appSrc, 'node_modules'],
            alias: {
                '@': paths.appSrc,
            },
        },
    },
    parts.loadJavaScript(),

    parts.loadImage(),
    parts.loadFont(),
]);

const productionConfig = merge([
    {
        mode: 'production',
        devtool: 'source-map',
        cache: false,
        output: {
            filename: 'static/js/[name].js',
        },
    },
    parts.clean(),
    parts.minifyJavaScript(),
    parts.minifyCSS(),
]);

const developmentConfig = merge([
    {
        mode: 'development',
        devtool: 'cheap-module-source-map',
        output: {
            filename: 'static/js/[name].[hash:8].js',
        },
        plugins: [new webpack.HotModuleReplacementPlugin()],
    },
    parts.devServer(),
]);

const chromeConfig = merge([
    {
        mode: 'development',
        devtool: 'cheap-module-source-map',
        cache: false,
        output: {
            filename: 'static/js/[name].js',
        },
    },
    parts.clean(),
    // parts.minifyJavaScript(),
    // parts.minifyCSS(),
    parts.loadLess({
        isEnvProduction,
        filename: 'static/css/[name].css',
        chunkFilename: 'static/css/[name].chunk.css',
    }),
    parts.copy({ from: paths.appPublic, to: paths.appBuild }),
    // parts.manifest(),
]);

const pages = [
    parts.page({
        title: 'lookup',
        entry: { lookup: ['@babel/polyfill', './src/lookup.js'] },
        template: paths.appHtml,
        chunks: ['lookup'],
        filename: 'lookup.html',
    }),
    parts.page({
        title: 'background',
        entry: { background: ['@babel/polyfill', './src/background.js'] },
        template: paths.appHtml,
        chunks: ['background'],
        filename: 'background.html',
    }),
];

// const config = isEnvProduction
//     ? productionConfig
//     : isChrome
//     ? chromeConfig
//     : developmentConfig;

module.exports = merge([...pages, commonConfig, chromeConfig]);
