#gallery-by-react

根据慕课网React实战课程-《打造画廊应用》，一步一步摸爬滚打写下来的项目，其中无数次想放弃学习，因为环境配置、编译器各种报错，完全摸不着头脑，简直崩溃，但是看到很多和我一样的小伙伴都坚持过来了，所以我重新学习起来，最终完成了。


----------


话不多说，直接说下我在项目中遇到的一些问题，和最终的解决方式，希望对其他刚刚学习的小伙伴有所帮助，少走弯路少填坑。

### 问题1：json-loader的加载
由于loader版本的问题，视频中引用是：

```
var imageDatas = require('../data/imageDatas.json');
```
但是更新后的 json-loader 引入需要这样写，需要加“json!”才能读取json文件哦，不明白的同学可以在github中搜索查看下 json-loader ，API里有写怎么使用。

```
var imageDatas = require('json!../data/imageDatas.json');
```
### 问题2：sass的配置
视频中更改样式文件，只要把css改为scss，然后在main.js中同样把引入的css文件改为相应的scss文件即可，并没有需要安装什么。但是，我们实践的时候，就会报错，首先检查下自己的**package.json** 文件中是否在 **devDependencies** 中有sass-loader 和 node-sass , 如果没有请自行安装

安装 **sass-loader** 并更新 **package.json**文件

```
npm install sass-loader --save-dev
```

接着安装**node-sass** 并更新 **package.json**文件
```
npm install node-sass --save-dev
```
由于国内网络的原因，一般安装这个会很慢，最终还可能失败，如果失败的话，你可以选择通过淘宝的npm镜像安装node-sass

第一步：安装cnpm
```
npm install -g cnpm --registry=https://registry.npm.taobao.org
```
第二步：安装node-sass

```
cnpm install node-sass  
```
你会明显发现这个安装快很多，这样就解决了sass的配置

### 问题3：启动项目

这里我们启动项目使用`npm start` 或者 `npm run serve`

打包dist文件夹使用：`npm run dist`

跑dist使用：`npm run serve:dist`

----------
感谢Materliu，一名很酷的老师，果断已经路转粉。

