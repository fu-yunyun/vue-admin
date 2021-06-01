import { MessageBox } from 'element-ui';
import { ref, } from "@vue/composition-api";
// 使用时引入该文件 golbal文件  const {str, confirm} = global()
export function global() {
    const str = ref("");
    const confirm = (data) => {
        MessageBox.confirm(data.content, data.trip || "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
            center: true,
        }).then(() => {
            // data.fn && data.fn();
            if (data.fn) {
                data.fn(data.msg);
            }
        }).catch(() => {
            // root.$message({
            //     type: "info",
            //     message: "已经取消删除"
            // })
        });
    }
    return {
        str,
        confirm
    }
}