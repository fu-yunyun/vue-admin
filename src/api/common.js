// 也可以封装在store中
// 抽取公共的获取分类标题作为全局方法  vue 3.0写法
import { getCategory } from "../api/news"
import { reactive } from "@vue/composition-api";
export function common() {
    // 定义数据类型接收
    const category = reactive({
        item: []
    })
    const getInfoCategory = () => {
        getCategory().then(response => {
            let data = response.data.allCtg;
            category.item = data;
        }).catch(error => {
            // root.$message.error("目的：获取一级分类请求失败");
        })
    }
    return {
        category,
        getInfoCategory
    }
}