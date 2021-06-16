import { getUserList_api } from "@/api/news";
let loadTableData_mixin = {
    mounted() {
        this.loadTableData();
    },
    methods: {
        // 请求获取用户列表信息
        loadTableData() {
            this.loading = true
            let requestData = this.config.requestJson;
            requestData.requestData.pageSize = this.PageData.pageSize;
            requestData.requestData.pageNumber = this.PageData.currentPage;
            // 获取来自父组件的获取用户列表请求数据
            getUserList_api(requestData)
                .then((response) => {
                    // 取出所有的禁用启用状态
                    // 将响应的数据对tableData进行赋值,进行表格数据的初始化
                    this.tableConfig.tableData = response.data.users;
                    let temp1 = []
                    for (let item of this.tableConfig.tableData) {
                        if (item.region != null) {
                            temp1 = []
                            temp1.push(item.region.provinceName + " ")
                            temp1.push(item.region.cityName + " ")
                            temp1.push(item.region.areaName)
                            item.region = temp1
                        } else {
                            item.region = []
                            continue;
                        }

                    }
                    // 整理role数据
                    let temp = []
                    for (let item of response.data.users) {
                        temp = []
                        for (let items of item.role) {
                            temp.push(items.role)
                        }
                        item.role = temp
                    }
                    this.PageData.pageTotal = response.data.total
                    // 将获取的pageTotal进行赋值传给table组件 
                    this.loading = false
                })
                .catch((error) => {
                    console.log(error);
                    this.loading = false
                });
        },

        // a() {
        //     console.log("mixin")
        // } 值为对象 组件对象覆盖混入对象 不打印mixin  与data相反

    }
}
export default loadTableData_mixin;