import service from "@/utils/request";
// 获取用户省市区关联
export function getCityPicker_api(data) {
    // 返回数据 拿到响应的数据
    return service.request({
        method: "post",
        url: "/user/getCityPicker",
        data
    });
}

// 添加用户信息
export function addUser_api(data) {
    // 返回数据 拿到响应的数据
    return service.request({
        method: "post",
        url: "/user/addUser",
        data
    });
}

// 获取用户角色信息
export function getRole_api(data) {
    // 返回数据 拿到响应的数据
    return service.request({
        method: "post",
        url: "/user/getRole",
        data
    });
}

// 删除用户列表信息
export function delUser_api(data) {
    // 返回数据 拿到响应的数据
    return service.request({
        method: "post",
        url: "/user/delUser",
        data
    });
}
//编辑用户
export function editUser_api(data) {
    // 返回数据 拿到响应的数据
    return service.request({
        method: "post",
        url: "/user/editUser",
        data
    });
}

//搜索用户
export function searchUser_api(data) {
    // 返回数据 拿到响应的数据
    return service.request({
        method: "post",
        url: "/user/searchUser",
        data
    });
}

//更换启用状态用户
export function switchUser_api(data) {
    // 返回数据 拿到响应的数据
    return service.request({
        method: "post",
        url: "/user/switchUser",
        data
    });
}