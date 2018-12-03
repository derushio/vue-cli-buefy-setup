require('dotenv').config();

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const isProduct = process.env.NODE_ENV == 'production';

module.exports = {
    css: {
        sourceMap: !isProduct,
        loaderOptions: {
            sass: {
                includePaths: ['./src/assets/styles/entry'],
            },
        },
    },
    configureWebpack: {
        devServer: {
            host: '0.0.0.0',
            disableHostCheck: true,
        },

        resolve: {
            alias: {
                'vue$': 'vue/dist/vue.esm.js',
            },
            mainFields: ['browser', 'main', 'module'],
        },

        module: {
            rules: [
                {
                    test: /\.rsass$/,
                    use: [
                        { loader: 'vue-style-loader', options: { sourceMap: !isProduct } },
                        { loader: 'css-loader', options: { sourceMap: !isProduct } },
                        { loader: 'resolve-url-loader', options: { sourceMap: !isProduct } },
                        {
                            loader: 'sass-loader',
                            options: {
                                indentedSyntax: false,
                                sourceMap: true,
                                includePaths: [ './src/assets/styles/entry' ],
                            },
                        },
                    ],
                },
                {
                    test: /\.rscss$/,
                    use: [
                        { loader: 'vue-style-loader', options: { sourceMap: !isProduct } },
                        { loader: 'css-loader', options: { sourceMap: !isProduct } },
                        { loader: 'resolve-url-loader', options: { sourceMap: !isProduct } },
                        {
                            loader: 'sass-loader',
                            options: {
                                indentedSyntax: false,
                                sourceMap: true,
                                includePaths: [ './src/assets/styles/entry' ],
                            },
                        },
                    ],
                },
            ],
        },

        optimization: {
            minimizer: [
                new UglifyJsPlugin({
                    sourceMap: !isProduct,
                    uglifyOptions: {
                        ecma: 8,
                        compress: {
                            warnings: false,
                        },
                    },
                }),
            ],
        },

        devtool: isProduct ? false : '#source-map',
    }
};
