// 拦截器

// 引入axios
import axios from "axios";
import { Message } from 'element-ui';
// 打印当前默认环境
// console.log("当前的vue环境变量为" + process.env.NODE_ENV);
// // 在development环境下自动加载.env.development文件，并且拿到默认定义数据 重启项目
// console.log("获取由.env.development 加载的默认文件定义数据" + process.env.VUE_APP_ABC)

// 手动创建axios,赋值给service
//手把手撸码前端API，地址http://www.web-jshtml.cn/productapi
const BASEURL = process.env.NODE_ENV == 'production' ? "" : "/api";
const service = axios.create({
    // baseURL: 'https://some-domain.com/api/',
    //http://localhost:8081/api/  ==  http://www.web-jshtml.cn/productapi/api/
    // 相当于 http://localhost:8081/api  变成了http://www.web-jshtml.cn/productapi
    baseURL: BASEURL,
    timeout: 15000
});

// Add a request interceptor  请求拦截器
service.interceptors.request.use(function (config) {
    // Do something before request is sent
    // config拿到的是GetSms()全部数据，在数据请求服务器之前进行处理
    // 在请求头，后台需要前端传输什么数据(在请求头添加参数)

    //  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // 在登录token验证完成之后，其他页面请求接口时还可能token验证是否异常，此时需要在请求头传入
    config.headers.tokey = '11111';
    config.headers['username'] = 'toney'

    // console.log(config.headers)
    return config;
}, function (error) {
    // Do something with request error

    return Promise.reject(error);
});

// Add a response interceptor  响应拦截器
service.interceptors.response.use(function (response) {
    // Do something with response data
    // response.data 拿到的是服务器响应的数据，对响应的数据进行处理
    // 一切数据由后台封装response
    let data = response.data;
    if (data.rescode != 0) {
        // 数据有问题
        return Promise.reject(data);
    } else {
        // 数据无误
        Message.error(data.message);
        return Primise.resolve;
    }
    return response;
}, function (error) {
    // Do something with response error
    return Promise.reject(error);
});

// 返回默认暴漏，只能有一个default
export default service;

