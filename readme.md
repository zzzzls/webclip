# WebClip

基于 Node.js 的轻量级云剪切板

> 仅支持 api 方式使用，暂无页面



依赖：

- node v17.0.1
- sqlite



## 安装

该项目使用 node 和 npm，请事先安装

```shell
# 1. 下载项目源码
git clone https://github.com/zzzzls/webclip.git
cd webclip/webclip

# 2. 安装依赖
npm i

# 3. 启动项目
npm start
```



快速安装

```shell
docker run -d -p 8080:80 -v zzzzls-webclip:/home/webclip/db zzzzls/webclip
```



测试

```
curl http://127.0.0.1:8080/get
```



## 使用

### 获取剪切板内容

```shell
GET /get?user=xxx
```



**请求参数**

| 参数 |    说明    |
| :--: | :--------: |
| user | 指定用户名 |



**返回参数**

|  参数   | 是否必须 |    说明    |
| :-----: | :------: | :--------: |
|   msg   |    /     |    状态    |
| content |    /     | 剪切板内容 |



### 设置剪切板内容

```shell
POST /set		 
```



**请求头**
|     参数      |        值        |
| :----------: | :--------------: |
| Content-Type | application/json |



**请求参数**
|  参数   | 是否必须 |    说明    |
| :-----: | :------: | :--------: |
|  user   |    /     |   用户名   |
| content |    /     | 剪切板内容 |



**返回参数**
|  参数   | 是否必须 |    说明    |
| :-----: | :------: | :--------: |
|   msg   |    /     |    状态    |



```shell
# 示例
curl -X POST -H "Content-Type:application/json" -d '{"user": "zzzzls", "content": "9*9=81"}' "http://127.0.0.1:8080/set"
```





