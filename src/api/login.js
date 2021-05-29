// api接口

import service from "@/utils/request";

// 获取验证码
// 触发调用
export function GetSms(data) {
    // 返回数据 拿到响应的数据
    return service.request({
        method: "post",
        url: "/getSms/",
        data
    });
}

// 获取用户角色p

// 登录

export function Login(data) {
    // 返回数据 拿到响应的数据
    return service.request({
        method: "post",
        url: "/login/",
        data
    });
}

// 注册
export function Register(data) {
    // 返回数据 拿到响应的数据
    return service.request({
        method: "post",
        url: "/register/",
        data
    });
}
