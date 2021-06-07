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