
const path = require('path')  
const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin');  
const CleanWebpackPlugin = require('clean-webpack-plugin');

const resolve = dir => path.resolve(__dirname, dir);

let webpackConfig = {
  mode: 'none',
  // 配置入口  
  entry: {},
  // 配置出口  
  output: {
    path: path.join(__dirname, "./dist/"),  
    filename: 'static/js/[name].[hash:7].js',  
    publicPath: '/',  
  },
  resolve: {
      // 设置别名
      alias: {
          '@': resolve('src')// 这样配置后 @ 可以指向 src 目录
      }
  },
  module: {
    rules: [
      // html中的img标签
      {
        test: /\.html$/,
        loader:'html-withimg-loader',
        include: [path.join(__dirname, "./src")],
        options: {
          limit: 10000,
          name: 'static/img/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [path.join(__dirname, "./src")]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/img/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/media/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/fonts/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },      
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ],
      },
    ]
  },
  plugins:[
    //设置每一次build之前先删除dist  
    new CleanWebpackPlugin(  
      ['dist/*',],　     //匹配删除的文件  
      {  
          root: __dirname,   //根目录  
          verbose: true,    //开启在控制台输出信息  
          dry: false     //启用删除文件  
      }  
    )
  ],
  // 起本地服务
  devServer: {  
    contentBase: "./dist/",  
    historyApiFallback: true,  
    inline: true,  
    // hot: true,   // 不能添加hot
    host: '127.0.0.1',
  }  
};


function getEntry () {
  let globPath = './src/pages/**/*.html'
  // (\/|\\\\) 这种写法是为了兼容 windows和 mac系统目录路径的不同写法
  let pathDir = 'src(\/|\\\\)(.*?)(\/|\\\\)html'
  let files = glob.sync(globPath)
  let dirname, entries = []
  for (let i = 0; i < files.length; i++) {
    dirname = path.dirname(files[i])
    var name = dirname.replace(new RegExp('^' + pathDir), '$2').slice(12);
    var obj = {
      name,
      html: `./src/pages/${name}/${name}.html`,
      jsEntry: `./src/pages/${name}/${name}.js`,
    }
    entries.push(obj)
  }
  return entries
}

const pageConfig = getEntry();

if(pageConfig && Array.isArray(pageConfig)){
  pageConfig.map(page => {
    webpackConfig.entry[page.name] = page.jsEntry;
    webpackConfig.plugins.push(new HtmlWebpackPlugin({
      filename: path.join(__dirname,`/dist/${page.name}.html`),
      template: path.join(__dirname,`/src/pages/${page.name}/${page.name}.html`),
      inject: true,
      chunks: [page.name],  
      inlineSource: '.(js|css)$',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      chunksSortMode: 'dependency'
    }))
  })
}


module.exports = webpackConfig;