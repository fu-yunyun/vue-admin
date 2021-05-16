import Vue from 'vue'
import svg from './svg.vue'
// 自定义全局组件
Vue.component('svg-icon', svg)

// require.context： 读取指定目录所有文件
/* 第一个参数： 目录
第二个参数：是否遍历子级目录
第三个参数：定义遍历文件规则 */

const req = require.context("./svg", false, /\.svg/)   //正则中表示结尾，读取结尾为.svg的文件
const requireAll = requireContext => {
    //解析 拿到的是文件名称 console.svg
    return requireContext.keys().map(requireContext)
}
requireAll(req)