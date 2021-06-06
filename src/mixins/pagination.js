let pagination_mixin = {
    data() {
        return {
            PageData: {
                currentPage: 1,
                pageSize: 5,
                pageSizes: [5, 10, 20, 50],
                pageTotal: 100
            }
        }
    },
    methods: {
        handleSizeChange(val) {
            this.PageData.pageSize = val
            this.loadTableData();
        },
        handleCurrentChange(val) {
            this.PageData.currentPage = val
            this.loadTableData();
        },
    }
}
export default pagination_mixin;