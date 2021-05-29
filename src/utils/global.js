import { MessageBox } from 'element-ui';
// 全局方法注册  
export default {
    install(Vue, options) {
        Vue.prototype.confirm = (data) => {
            MessageBox.confirm(data.content, data.trip || "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
                center: true,
            })
                .then(() => {
                    data.fn && data.fn(data.msg || "");
                    // if (data.fn) {
                    //     data.fn(data.msg || "");
                    // }
                })
                .catch(() => {
                    data.catchfn && data.catchfn();
                    console.log("取消删除")
                });
        }
    }
    // ************************************************************************************************************
    // 定义全局方法
    // Vue.prototype.confirm = (data) => { }
}