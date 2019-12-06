const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const webpack = require('webpack');
const paths = require('./paths');

exports.page = ({
    entry,
    filename,
    template = require.resolve('html-webpack-plugin/default_index.ejs'),
    title,
    chunks,
} = {}) => ({
    entry,
    plugins: [
        new HtmlWebpackPlugin({
            chunks,
            filename,
            template,
            title,
        }),
    ],
});

exports.clean = () => ({
    plugins: [new CleanWebpackPlugin()],
});

exports.loadJavaScript = () => ({
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
            },
        ],
    },
});

exports.loadLess = ({
    isEnvProduction,
    filename = 'static/css/[name].[contenthash:8].css',
    chunkFilename = 'static/css/[name].[contenthash:8].chunk.css',
} = {}) => ({
    module: {
        rules: [
            {
                test: /\.(less|css)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: !isEnvProduction,
                        },
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [require('autoprefixer')],
                        },
                    },
                    'less-loader',
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename,
            chunkFilename,
        }),
    ],
});

exports.loadImage = () => ({
    module: {
        rules: [
            {
                test: /\.(png|jpg|jpeg|gif|mp3)$/i,
                loader: 'url-loader',
                options: {
                    limit: 8192,
                    name: 'asset/image/[name].[hash:8].[ext]',
                    publicPath: '/',
                },
            },
        ],
    },
});
exports.loadFont = () => ({
    module: {
        rules: [
            {
                test: /\.(woff|woff2|eot|otf|webp|ttf)$/i,
                loader: 'file-loader',
                options: {
                    name: 'asset/font/[name].[hash:8].[ext]',
                    publicPath: '/',
                },
            },
        ],
    },
});

exports.minifyJavaScript = () => ({
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                parallel: true,
                sourceMap: true,
                terserOptions: {
                    compress: {
                        warnings: false,
                        comparisons: false,
                        drop_console: true,
                    },
                    output: {
                        comments: false,
                        ascii_only: true,
                    },
                },
            }),
        ],
    },
});

exports.minifyCSS = () => ({
    optimization: {
        minimize: true,
        minimizer: [new OptimizeCSSAssetsPlugin({})],
    },
});

exports.devServer = ({ host, port } = {}) => ({
    devServer: {
        contentBase: paths.appBuild,
        compress: true,
        hot: true,
        // historyApiFallback: {
        //     disableDotRule: true,
        //     rewrites,
        // },
        port: 5000,
        disableHostCheck: true,
        host: '0.0.0.0',
        useLocalIp: true,
    },
});

exports.copy = ({ from, to }) => ({
    plugins: [new CopyPlugin([{ from, to }])],
});

exports.manifest = () => ({
    plugins: [new ManifestPlugin()],
});

exports.setFreeVariable = env => {
    Object.keys(env).forEach(key => {
        env[key] = JSON.stringify(env[key]);
    });
    return {
        plugins: [new webpack.DefinePlugin(env)],
    };
};
