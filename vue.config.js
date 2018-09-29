const path = require('path');

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const isProduct = process.env.NODE_ENV == 'production';

module.exports = {
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
                { test: /\.(jp(e?)g|png|gif|svg|bmp)(\?v=\d+\.\d+\.\d+)?$/,
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

        plugins: [
            new CopyWebpackPlugin([
                {
                    from: path.resolve(__dirname, './node_modules', '@fortawesome'),
                    to: path.resolve(__dirname, './dist', 'css/@fortawesome'),
                },
                {
                    from: path.resolve(__dirname, './node_modules', '@mdi'),
                    to: path.resolve(__dirname, './dist', 'css/@mdi'),
                },
            ]),
        ],

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
