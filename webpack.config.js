const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = (env, argv) => ({
    watch: true,
    entry: './resource/js/index.js',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'public/js')
    },
    // 最適化オプションを上書き
    optimization: {
        minimizer: [
            new TerserPlugin({}),
            new OptimizeCssAssetsPlugin({})
        ]
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    argv.mode === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            url: false
                        }
                    },
                    'sass-loader'
                ],
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '../css/style.css'
        }),
    ],
    resolve: {
        extensions: [".js"],
        alias: {
            "@": path.resolve('resource')
        }
    },
});