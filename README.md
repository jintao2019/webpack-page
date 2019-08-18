

## Build Setup

``` bash
# 安装依赖
npm install

# 开发的时候在本地启localhost:8080，并开始热加载
npm run dev

# production的发布时打包
npm run build

```


## 目录结构

```
└─static                                   // static 放不需要webpack做处理的静态资源         
└─src                                      // src 文件夹
│    ├─pages                               // 页面文件夹
│    │  ├─about
│    │  │      about.html
│    │  │      about.js
│    │  │      about.less
│    │  │
│    │  │
│    │  │
│    │  │
│    │  │
│    │  │
│    │  └─index
│    │          index.html
│    │          index.js
│    │          index.less
│    │
│    └─assets                          // 公共js,css,img文件夹
│
│
│  .babelrc                         // babel的配置文件
│  .eslintignore
│  .gitignore
│  package.json
│  README.md
│  webpack.config.dev.js            // 开发环境的webpack配置文件
│  webpack.config.prod.js           // 生成环境的webpack配置文件
         

```

## 开发流程

如果增加新页面，需要在pages下增加一个文件夹，html,css,js的文件命名需与文件夹保持一致
