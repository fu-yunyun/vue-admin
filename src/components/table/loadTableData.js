// User表格业务逻辑的拆分
import { getUserList_api } from "@/api/news";
export function loadTableData_fn() {
    const tableData_l = {
        // 表格数据定义
        item: []
    }
    // 请求获取用户列表信息
    const loadTableData = (requestData) => {
        // 获取来自父组件的获取用户列表请求数据
        getUserList_api(requestData)
            .then((response) => {
                // 将响应的数据对tableData进行赋值,进行表格数据的初始化
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return {
        tableData_l,
        loadTableData
    }
}
/**
 * 获取UserTableList数据
 * 通过getUserList_api请求获取数据，将数据封装za在tableData中的Item数组中返回，在将请求接口发loadTableData方法返回
 *      loadTableData需要传入requestJson参数对接口数据进行初始化
 *
 */