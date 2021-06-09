// User表格业务逻辑的拆分
import { getUserList_api } from "@/api/news";
export function loadTableData_fn() {
    const tableData_loaded = {
        // 表格数据定义
        item: [],
        pageTotal: 100,
    }
    // 请求获取用户列表信息
    const loadTableData = (requestData) => {
        // 获取来自父组件的获取用户列表请求数ju 
        getUserList_api(requestData)
            .then((response) => {
                // 将响应的数据对tableData进行赋值,进行表格数据的初始化
                console.log("success")
                // 将获取的pageTotal直接赋值传给PageData.total组件  两两混入，可以直接拿到分页的数据
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return {
        tableData_loaded,
        loadTableData
    }
}
/**业务说明：
 *
 * 获取UserTableList数据
 *
 * 通过getUserList_api请求获取数据，将数据封装za在tableData中的Item数组中返回，在将请求接口发loadTableData方法返回
 *      loadTableData需要传入requestJson参数对接口数据进行初始化
 *
 */