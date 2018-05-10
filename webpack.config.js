const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry:'./app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename:'app.bundle.js'
    },
    // 配置开发模式，可以开启webpack对应的内置优化
    mode:'development',
    devtool: 'inline-source-map',
    
    plugins: [
        new CleanWebpackPlugin(['dist']),
        // 根据template.html 模板，在dist目录下面生成 index.html
        new HtmlWebpackPlugin({
            filename: 'index.html',
            title: 'React Demos',
            template: './template.html'
        })
    ],
    devServer: {
        contentBase: './dist'  
    },

    module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /(node_modules)/,
            use: {
              loader: 'babel-loader',
            //   options: {
            //     presets: ['@babel/preset-env']
            //   }
            }
          },
          {
            test: /\.css$/,
            exclude: path.resolve(__dirname, 'global/styles'), // 排除全局样式
            use: [
              {
                loader:'style-loader'
              },
              {
                loader: 'css-loader',
                options: {
                  modules: true,  // 开启css moudle
                  localIdentName: '[path][name]__[local]--[hash:base64:5]',
                  sourceMap:true
                }
              },
              {
                loader: 'postcss-loader',
              }
            ]
           },
           {
            test: /\.css$/,
            include: path.resolve(__dirname, 'global/styles'), // 只对全局样式生效
            loader:'style!css!postcss'
           }
        ]
    }
}