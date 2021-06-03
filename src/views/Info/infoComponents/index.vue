<template>
  <div id="DigInfo">
    <el-dialog
      :title="title"
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
import { addCategory_api, getList_api, editInfo_api } from "../../../api/news";
import { onMounted, reactive, ref, watch } from "@vue/composition-api";
import categoryVue from "../category.vue";
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
    type: {
      type: String,
      default: "",
    },
    id: {
      type: Number,
      default: 1,
    },
  },

  setup(props, { emit, root }) {
    const title = ref();
    const formLabelWidth = ref("70px");
    const dialog_info_flag = ref(false);
    const editCategoryId = ref();
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
      // 设置弹窗标题执行类型
      title.value = props.type;
      form.category = props.category;
      // 格式化编辑界面数据
      /******************************************************************************************************* */
      if (title.value == "编辑") {
        let requestData = {
          pageNumber: 1,
          pageSize: 1,
          id: props.id,
        };
        getList_api(requestData)
          .then((response) => {
            let data = response.data.item[0];
            // 获取编辑数据的分类id 为请求编辑数据准备
            editCategoryId.value = data.categoryId;
            // form中的category数组中的id技术categoryId
            let categorydata = form.category.filter(
              (category) => category.id == data.categoryId
            )[0];
            form.region = categorydata.categoryName;
            form.title = data.title;
            form.content = data.content;
            console.log("编辑请求");
          })
          .catch((error) => {
            console.log("edit error");
          });
      }
      /********************************************************************************************************* */
    };

    // 清除新增表单数据
    const resetFields = () => {
      form.title = "";
      form.content = "";
      form.region = "";
    };
    /****************************************数据接口提交******************************************** */
    const submit = () => {
      if (title.value == "新增") {
        AddInfo();
      } else {
        editInfo();
      }
    };
    /****************************************新增数据****************************************************** */
    const AddInfo = () => {
      if (form.title && form.region && form.content) {
        // 定义新增请求数据
        let requestData = {
          category: form.region,
          title: form.title,
          content: form.content,
        };
        //调用新增接口
        addCategory_api(requestData)
          .then((response) => {
            root.$message({
              message: response.msg,
              type: "success",
            });
            // 调用父组件方法
            emit("getList");
            dialog_info_flag.value = false;
            resetFields();
          })
          .catch((error) => {
            root.$message({
              message: error.msg,
              type: "error",
            });
            resetFields();
          });
      } else {
        root.$message.warning("表单数据不能有空");
      }
    };
    /**************************************************编辑数据**************************************** */
    const editInfo = () => {
      // 拿到categoryId
      let newData = form.category.filter(
        (category) => category.categoryName == form.region
      )[0];

      // 定义编辑请求数据
      let requestData = {
        id: props.id,
        categoryId: newData.id,
        title: form.title,
        content: form.content,
      };
      // 调用编辑接口
      editInfo_api(requestData)
        .then((response) => {
          dialog_info_flag.value = false;
          console.log("数据编辑成功");
          // 渲染数据
          /**
           * 两种方式： 1、直接接口刷新
           *           2、返回列表，手动修改数据
           */
          // 调用父组件方法
          emit("getList");

          // 调用父组件方法
          // emit("name", { function: "getList", data: 111 });

          resetFields();
        })
        .catch((error) => {
          console.log("数据编辑失败");
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
      title,
      editCategoryId,
      // object
      form,
      //function
      close,
      openDialog,
      submit,
      resetFields,
      editInfo,
    };
  },
};
</script>

<style>
</style>