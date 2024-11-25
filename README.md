# vue3_interview

### 想要实现同一局域网下通话的话，需要改变请求接口

---

#### 改变方式

##### 一、克隆代码

##### 二、在代码当前目录下的文件.env.production

###### 修改以下配置中的localhost改成当前你的局域网ip

`VITE_APP_BASE_API = 'https://localhost:444'`

`VITE_APP_SOCKET_URL = 'https://localhost:3000'`

##### 三、打包文件

```sh
pnpm build
```

###### 打包成功后将新生成的dist目录下的全部东西替换之前的前端服务器目录中的public下的全部东西
