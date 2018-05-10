Demos 项目构建流程
------

### 创建项目
```bash
npm init

```

### 创建demos模板
```bash
// 前端模板
touch index.html
// 前端入口
touch app.js
// webpack 配置文件
touch webpack.config.js
// babel 文件
touch .babelrc
```

### 安装 react 依赖包
```bash
npm i react --save
npm i react-dom --save

```



### 添加 react 和 es6 语法支持
1. 安装依赖包
```bash
// babel 命令支持
npm i babel-cli --save-dev

// babel es6 语法支持集
npm i babel-preset-es2015 --save-dev

// babel react（jsx） 语法支持集
npm i babel-preset-react --save-dev

```

2. 配置 .babelrc
```json
{
  "presets": ["react", "es2015"]
}

```


### 配置 webpack.config.js
1. 安装必要的npm 包
```bash
// 安装 webpack
npm i webpack --save-dev

// 支持 webpack 4+ 的版本
npm i webpack-cli --save-dev

// 安装编译 es6 和 react 的 loader
npm i babel-loader --save-dev

```

2. 配置 webpack.config.js
```js
const path = require('path')

module.exports = {
    entry:'./app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename:'app.bundle.js'
    },
    module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /(node_modules)/,
            use: {
              loader: 'babel-loader',
            //   // babel 的配置交给 .babelrc
            //   options: {
            //     presets: ['@babel/preset-env']
            //   }
            }
          }
        ]
    }
}

```


### 编写测试代码
如下列文件
1. demos/helloworld/HelloWorld.js
2. app.js
3. 编写 前端模板 index.html
4. 配置 npm start

执行命令 `npm start` 之后使用浏览器打开 `index.html` 查看运行结果

### 配置 sourcemap 和 开启 mode
1. 为了开发调试，需要配置sourcemap
2. 配置 mode 为 development，可以开启 webpack 内置的优化

配置webpack.config.js
```js
mode:'development',
devtool: 'inline-source-map',

```

### 添加 webpackDevServer 支持
1. webpackDevServer 可以监听文件变化，实时编译加载文件
安装
```
npm install --save-dev webpack-dev-server

```

2. 配置 webpack.config.js
```
devServer: {
     contentBase: './'  
},
```

修改 `npm start` 的命令内容，调整如下：
```
 "start": "webpack-dev-server --open"
```

现在 在终端执行 `npm start ` 就会看到根据修改实时刷新的页面了


### 优化
###### 问题
1. 前端的模板 `index.html` 是我们手动编写的，一旦打包输出的名称发生改变就需要手动变更 app.bundle.js 的路径和名称，实在不方便
2. 我们现在只是写demo,如果是在做项目，一般都会在编译后，把整个 `dist` 目录上传到服务器，里面应该包含所有静态资源（包括index.html）,所以现在是不合理的

###### 进行优化
1. 删除 `index.html` ,使用 webpack 插件进行自动生成 html

首先，安装插件
```bash 
npm install html-webpack-plugin --save-dev
npm install clean-webpack-plugin --save-dev
```

修改 webpack.config.js, 
```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 每次构建之前都先清理 dist 目录
const CleanWebpackPlugin = require('clean-webpack-plugin');
...
plugins: [
    // 清理dist目录
    new CleanWebpackPlugin(['dist']),

    // 根据template.html 模板，在dist目录下面生成 index.html
    new HtmlWebpackPlugin({
        filename: 'index.html',
        title: 'React Demos',
        template: './template.html'
    })
],
// 修改 devServer 的静态资源目录为dist
devServer: {
    contentBase: './dist'  
},

```


### 结束
使用 `npm start` 进行测试。