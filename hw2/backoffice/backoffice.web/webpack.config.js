const path = require('path');
const TsConfigPathsPlugin = require('awesome-typescript-loader').TsConfigPathsPlugin;
const LiveReloadPlugin = require('webpack-livereload-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const webpackConfig = {
    entry: {
        '/bundle.js': './main.ts',
        '/style.css': './styles/main.scss'
    },
    target: 'web',
    node: {
        __dirname: false,
        __filename: false,
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(s*)css$/,
                use: ExtractTextPlugin.extract([
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            includePaths: ['./src/components', './src/pages']
                        }
                    }
                ]),
                exclude: /node_modules/
            },
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader'
                }
            }
        ]
    },
    resolve: {
        plugins: [
            new TsConfigPathsPlugin(),
        ],
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        filename: '[name]',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new LiveReloadPlugin(),
        new ExtractTextPlugin('[name]'),
        new HtmlWebpackPlugin({
            hash: true,
            title: 'TReX',
            template: './index.html',
            filename: './index.html' //relative to root of the application
        })
    ],
    node: {
        fs: "empty"
    }
};


function buildConfig(env) {
    if (env === 'dev' || env === 'prod') {
        const customOptions = require(`./webpack.${env}.config`);
        webpackConfig.mode = customOptions.mode;
        webpackConfig.devtool = customOptions.devtool;
        return webpackConfig;
    } else {
        console.log('Wrong webpack parameter build. Accepted environments: `dev` or `prod`.');
        process.exit();
    }
}


module.exports = buildConfig;