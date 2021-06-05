// 分页逻辑
import { reactive } from "@vue/composition-api";
export function Pagination_fn() {
    const PageData = reactive({
        currentPage: 1,
        pageSize: 5,
        pageSizes: [5, 10, 20, 50],
        pageTotal: 100
    })
    const handleSizeChange = (val) => {
        PageData.pageSize = val
    }
    const handleCurrentChange = (val) => {
        PageData.currentPage = val
    }
    const toTotal = (value) => {
        PageData.pageTotal = value;
    }
    return {
        PageData,
        handleSizeChange,
        handleCurrentChange,
        toTotal
    }
}
/**
 *
 * 分页逻辑：
 *  PageData:页码数据 对象类型
 *
 *  currentPage: 当前页码
 *  pageSiez：当前显示页数
 *  pageSizes：可选显示页数  数组类型
 *  pageTotal:总条数
 *
 */