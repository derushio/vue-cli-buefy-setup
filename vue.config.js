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
        },

        module: {
            rules: [
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
                                includePaths: [ './src/assets/styles/entry' ]
                            }
                        }
                    ]
                },
                {
                    test: /\.(jp(e?)g|png|gif|svg|bmp)(\?v=\d+\.\d+\.\d+)?$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: { name: 'img/[name].[ext]' }
                        }
                    ]
                },
                {
                    test: /\.(ttf|otf|eot|woff(2)?)(\?v=\d+\.\d+\.\d+)?$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: { name: 'font/[name].[ext]' },
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
                            warnings: false
                        },
                    },
                }),
            ],
        },

        devtool: isProduct ? false : '#source-map',
    }
};
