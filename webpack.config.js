const path = require('path');
// 自动在output的path目录中生成html文件
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 清理指定的文件夹
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
// 把css从build.js中分离出来
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// 压缩css
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// 复制文件
const CopyWebpackPlugin = require('copy-webpack-plugin');
// 压缩图片
const ImageminPlugin = require('imagemin-webpack-plugin').default;

module.exports = {
    entry: './src/index.js',

    output: {
        filename: 'build.js',
        path: path.resolve(__dirname, './dist')
    },

    module: {
        rules: [{
                test: /vue-preview.src.*?js$/,
                use: 'babel-loader'
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: [{
                    loader: 'babel-loader',
                }]
            },
            {
                test: /\.css$/,
                // use: ['style-loader', 'css-loader', 'autoprefixer-loader'] // 执行顺序从右到左
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'autoprefixer-loader']
                })
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'autoprefixer-loader', 'less-loader']
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'autoprefixer-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpg|gif|woff|woff2|eot|ttf|otf|svg)$/,
                // use: ['url-loader']
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10240,
                        // 设置处理的文件的输出目录  - file-loader
                        name: '/statics/fonts/[name].[ext]'
                    }
                }]
            },
            {
                test: /\.vue$/,
                use: ['vue-loader']
            },
        ]
    },

    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: 'Output Management',
            template: 'index.html',
            filename: 'index.html',
            minify: {
                collapseWhitespace: true, //去除换行和空格
                minifyCSS: true, //压缩html内的css
                minifyJS: true, //压缩html内的js
                removeComments: true //删除html注释
            }
        }),
          // UglifyJs 是webpack内置的插件，压缩js,生产环境使用
/*         new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }), */
        new ExtractTextPlugin({
            filename: '/statics/css/style.css'
        }),
        new OptimizeCssAssetsPlugin({
            cssProcessor: require('cssnano'),
            cssProcessorOptions: { discardComments: { removeAll: true } },
            canPrint: true
        }),
        // 复制静态资源
        new CopyWebpackPlugin([{
            from: 'statics/images',
            to: 'statics/images'
        }]),
        new ImageminPlugin({
            test: /\.(jpe?g|png|gif|svg)$/i,
        })
    ]

};