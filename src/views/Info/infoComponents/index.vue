<template>
  <div id="DigInfo">
    <el-dialog
      title="新增"
      :visible.sync="dialog_info_flag"
      @close="close"
      @open="openDialog"
      width="580px"
    >
      <el-form :model="form" ref="form">
        <!-- ********************************************************* -->
        <el-form-item label="类别" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择">
            <el-option
              v-for="item in form.category"
              :key="item.id"
              :label="item.categoryName"
              :value="item.categoryName"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- *************************************************************** -->
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input
            v-model="form.title"
            autocomplete="off"
            placeholder="请输入标题"
          ></el-input>
        </el-form-item>
        <!-- *********************************************************** -->
        <el-form-item label="概述" :label-width="formLabelWidth">
          <el-input
            v-model="form.content"
            autocomplete="off"
            placeholder="请输入内容"
            type="textarea"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="danger" @click="submit()">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addCategory_api } from "../../../api/news";
import { onMounted, reactive, ref, watch } from "@vue/composition-api";
export default {
  name: "DigInfo",

  props: {
    flag: {
      type: Boolean,
      default: false,
    },
    category: {
      type: Array,
      default: () => [],
    },
  },

  setup(props, { emit, root }) {
    const formLabelWidth = ref("70px");
    const dialog_info_flag = ref(false);
    const form = reactive({
      category: [],
      title: "",
      content: "",
      region: "",
    });
    /********************************function********************************************************* */
    // 子传父是单项数据流
    const close = () => {
      dialog_info_flag.value = false;
      emit("close", false);
      //   触发调用父组件的close方法 执行逻辑程序 或者 状态更改
      //   含逻辑更改时不易采用
      //   增加修饰器  不需要再调用父组件中方法
      //   this.$emit("upadte:flag", false);
    };
    //  因为执行顺序的原因 页面初始加载不能直接拿到数据 可以等页面打开之后再获取数据
    const openDialog = () => {
      form.category = props.category;
    };

    // 清除新增表单数据
    const resetFields = () => {
      form.title = "";
      form.content = "";
      form.region = "";
    };
    const submit = () => {
      if (form.title && form.region && form.content) {
        console.log("submit方法提交");
        // 定义新增请求数据
        let requestData = {
          category: form.region,
          title: form.title,
          content: form.content,
        };
        AddInfo(requestData);
      } else {
        root.$message.warning("表单数据不能有空");
      }
    };
    const AddInfo = (requestData) => {
      addCategory_api(requestData)
        .then((response) => {
          console.log("数据请求添加成功");
          resetFields();
        })
        .catch((error) => {
          console.log("数据请求添加失败");
          resetFields();
        });
    };

    /***********************function************************************************************** */
    // 生命周期，  挂载
    onMounted(() => {});
    watch(
      // 尽量将监听的数据写明 ，否则可能会报错
      () => props.flag,
      (value) => {
        dialog_info_flag.value = value;
      }
    );
    return {
      formLabelWidth,
      dialog_info_flag,
      // object
      form,
      //function
      close,
      openDialog,
      submit,
      resetFields,
    };
  },
};
</script>

<style>
</style>