const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require("vue-loader");
module.exports = {
    entry: './src/index.js',
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    mode: "development",
    devtool: 'inline-source-map',
    devServer: {
        static: './dist',
    },
    optimization: {
        runtimeChunk: 'single',
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.vue$/,
                loader: "vue-loader"
            },
            {
                test: /\.js$/,
                //排除mode_modules、bower_components文件夹
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            //当加载的图片大小 小于limit时，会将图片编译成base64字符串形式
                            //如果大于limit时，会需要一个file-loader，直接安装file-loader就行，不需要配置
                            limit: 8192
                        }
                    }
                ]
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: '管理输出',
            template: './public/index.html'
        }),
        new VueLoaderPlugin()
    ],
    resolve: {
        // alias :配置别名
        alias: {
            "vue":"vue/dist/vue.esm-browser.js"
        }
    }
};
