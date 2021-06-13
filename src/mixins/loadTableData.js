import { getUserList_api } from "@/api/news";
let loadTableData_mixin = {
    mounted() {
        this.loadTableData();
    },
    methods: {
        // 请求获取用户列表信息
        loadTableData() {
            let requestData = this.config.requestJson;
            requestData.requestData.pageSize = this.PageData.pageSize;
            requestData.requestData.pageNumber = this.PageData.currentPage;
            // 获取来自父组件的获取用户列表请求数据
            getUserList_api(requestData)
                .then((response) => {
                    // 取出所有的禁用启用状态
                    // 将响应的数据对tableData进行赋值,进行表格数据的初始化
                    this.tableConfig.tableData = response.data.users;
                    this.PageData.pageTotal = response.data.total
                    // 将获取的pageTotal进行赋值传给table组件 

                })
                .catch((error) => {
                    console.log(error);
                });
        },

        // a() {
        //     console.log("mixin")
        // } 值为对象 组件对象覆盖混入对象 不打印mixin  与data相反

    }
}
export default loadTableData_mixin;