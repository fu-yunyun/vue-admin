import service from "@/utils/request";
// 获取列表
export function getList_api(data) {
    // 返回数据 拿到响应的数据
    return service.request({
        method: "post",
        url: "/news/getList",
        data
    });
}
// 新增
export function addCategory_api(data) {
    // 返回数据 拿到响应的数据
    return service.request({
        method: "post",
        url: "/news/addCategory",
        data
    });
}
// 编辑

// 删除分类 
export function delteCategory_api(data) {
    // 返回数据 拿到响应的数据
    return service.request({
        method: "post",
        url: "/news/deleteFirstCategory",
        data
    });
}

// 添加一级分类 
export function addCategory(data) {
    // 返回数据 拿到响应的数据
    return service.request({
        method: "post",
        url: "/news/addFirstCategory",
        data
    });
}

// 获取一级分类数据
export function getCategory() {
    // 返回数据 拿到响应的数据
    return service.request({
        method: "post",
        url: "/news/getCategory",
    });
}

// 修改一级分类
// 获取一级分类数据
export function EditCategory(data) {
    // 返回数据 拿到响应的数据
    return service.request({
        method: "post",
        url: "/news/editCategory",
        data
    });
}