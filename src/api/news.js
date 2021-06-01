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

// 删除列表信息
export function deleteInfo_api(data) {
    // 返回数据 拿到响应的数据
    return service.request({
        method: "post",
        url: "/news/deleteInfo",
        data
    });
}
// 编辑
export function editInfo_api(data) {
    // 返回数据 拿到响应的数据
    return service.request({
        method: "post",
        url: "/news/editInfo",
        data
    });
}
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

// 获取全部分类 （包含子级)
export function getCategoryAll(data) {
    // 返回数据 拿到响应的数据
    return service.request({
        method: "post",
        url: "/news/getCategoryAll",
        data
    });
}

// 修改一级分类
export function EditCategory(data) {
    // 返回数据 拿到响应的数据
    return service.request({
        method: "post",
        url: "/news/editCategory",
        data
    });
}

// 添加一级标题
export function addChilrenCategory(data) {
    // 返回数据 拿到响应的数据
    return service.request({
        method: "post",
        url: "/news/addChildrenCategory",
        data
    });
}
// 删除子级分类
export function deleteChilrenCategory_api(data) {
    // 返回数据 拿到响应的数据
    return service.request({
        method: "post",
        url: "/news/deleteChildrenCategory",
        data
    });
}
// 编辑子级分类
export function editChilrenCategory_api(data) {
    // 返回数据 拿到响应的数据
    return service.request({
        method: "post",
        url: "/news/editChildrenCategory",
        data
    });
}