tinyphp-bootstrap
====

+ 本项目作为tinyphp for PHP Frameworks的开箱即用DEMO
+ 后端框架: tinyphp 
+ 前端框架: 以webpack5为编译工具，集成了bootstrap4即一系列开源组件
    + bootstrap4
       + jQuery: JavaScript框架
       + pppoer@core: popup定位引擎
       + font-awesome: 图标字体库和CSS框架
       + sweetalert2： 漂亮、响应式、可定制、易用的JavaScript 弹窗
    + echarts: 基于JavaScript的数据可视化图表库

项目适合做什么
----
+ 熟练掌握bootstrap前端框架,jquery
+ 具备JS全栈技能的PHP爱好者和PHP工程师。
+ 普遍适应于PHP框架的开发和生产环境。
+ 无需前端UI交互设计，依赖bootstrap，可快速进行以下开发
    + API接口开发
    + 后台管理应用开发
    + bootstrap通用风格的WEB应用开发


从0开始一键安装运行环境
---
+  推荐使用[tinycn/lnmp-utils](https://github.com/tinycn/lnmp-utils.git)搭建开发/生产环境
	+ Linux(CentOS7X_64) +openresty(nginx)+Mysql+PHP+Redis一键安装包，服务于TinyPHP的生产环境。
	
```shell
   git clone https://github.com/tinycn/lnmp-utils.git
   cd lnmp-utils
      
   #一键安装tinyphp-bootstrap的运行环境
   git clone https://github.com/tinycn/lnmp-utils.git
   cd lnmp-utils
   ./install.sh -m lnmp
```

componser安装方式
----
```shell
 composer create tinycn/tinyphp-bootstrap ./ master-dev
```

npm安装方式
---
```shell
npm i tinyphp-bootstrap
mv node_modules/tinyphp-bootstrap ./
cd tinyphp-bootstrap
npm i
```

docker一键安装运行环境
---
```shell
   docker pull tinycn/centos7-tinyphp
```
