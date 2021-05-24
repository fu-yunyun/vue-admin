import service from "@/utils/request";
// 列表

// 新增新闻

// 编辑

// 删除

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