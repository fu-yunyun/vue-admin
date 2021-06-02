<template>
  <div class="detaileCategory">
    <el-form :model="form" ref="form">
      <el-form-item label="信息类别: " :label-width="formLabelWidth">
        <el-select v-model="form.region" placeholder="请选择">
          <el-option
            v-for="item in form.category"
            :key="item.id"
            :label="item.categoryName"
            :value="item.categoryName"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属标题: " :label-width="formLabelWidth">
        <el-input
          type="text"
          v-model="form.title"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="缩略图: " :label-width="formLabelWidth">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="创建日期: " :label-width="formLabelWidth">
        <el-date-picker
          v-model="form.createTime"
          type="date"
          placeholder="选择日期"
          disabled
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="详细内容: " :label-width="formLabelWidth">
        <quillEditor v-model="form.content" ref="myQuillEditor" />
      </el-form-item>
      <el-form-item label="" :label-width="formLabelWidth">
        <el-button type="primary" @click="submit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { onMounted, reactive, ref, watch } from "@vue/composition-api";
import { common } from "@/api/common.js";
import { getList_api, editInfo_api } from "@/api/news";
// 引入富文本编辑器
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
export default {
  name: "detail",
  components: { quillEditor },
  setup(props, { root }) {
    const tableListId = ref(root.$store.state.detailCategory.id);
    const formLabelWidth = ref("120px");
    const form = reactive({
      category: [],
      title: "",
      content: "",
      region: "",
      categoyId: "",
      createTime: "",
      imageUrl: "",
    });

    const { getInfoCategory, category } = common();
    form.category = category.item;
    const getList = () => {
      let requestData = {
        pageNumber: 1,
        pageSize: 1,
        id: tableListId.value,
      };
      getList_api(requestData)
        .then((response) => {
          console.log(response);
          let data = response.data.item[0];
          form.categoryId = data.categoryId;
          // form中的category数组中的id技术categoryId
          let categorydata = form.category.filter(
            (category) => category.id == data.categoryId
          )[0];
          if (categorydata) {
            form.region = categorydata.categoryName;
          }
          form.title = data.title;
          form.createTime = data.createTime;
          form.content = data.content;
        })
        .catch((error) => {
          root.$message.error(error.msg);
        });
    };
    /********************************** 文件上传*****start*************************************************** */
    const handleAvatarSuccess = (res, file) => {
      this.imageUrl = URL.createObjectURL(file.raw);
    };
    const beforeAvatarUpload = (file) => {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      let suffix = file.name;
      let key = encodeURI(`${suffix}`);
      return isJPG && isLt2M;
    };
    /*************************************文件上传 end ********************************************************* */
    const submit = () => {
      editChilrenCategory();
    };
    /***********************************编辑接口**************************************************************** */
    // const editInfo = () => {
    //   // 定义编辑请求数据
    //   let requestData = {
    //     id: props.id,
    //     categoryId: editCategoryId.value,
    //     title: form.title,
    //     content: form.content,
    //   };
    //   // 调用编辑接口
    //   editInfo_api(requestData)
    //     .then((response) => {
    //       dialog_info_flag.value = false;
    //       console.log(response.msg);
    //       // 渲染数据
    //       /**
    //        * 两种方式： 1、直接接口刷新
    //        *           2、返回列表，手动修改数据
    //        */
    //       // 调用父组件方法
    //       emit("getList");

    //       // 调用父组件方法
    //       // emit("name", { function: "getList", data: 111 });

    //       resetFields();
    //     })
    //     .catch((error) => {
    //       console.log("数据编辑失败");
    //       resetFields();
    //     });
    // };
    const editChilrenCategory = () => {
      let requestData = {
        id: tableListId.value,
        categoryId: form.categoryId,
        title: form.title,
        content: form.content,
      };
      editInfo_api(requestData)
        .then((response) => {
          root.$message.success(response.msg);
          getInfoCategory();
        })
        .catch((error) => {
          root.$message.warning(error.msg);
        });
    };
    /**********************************生命周期*************************************************************** */
    onMounted(() => {
      getInfoCategory();
      getList();
    });
    watch(
      () => category.item,
      (value) => {
        form.category = value;
      }
    );
    return {
      tableListId,
      form,
      getList,
      formLabelWidth,
      submit,
      handleAvatarSuccess,
      beforeAvatarUpload,
      editChilrenCategory,
    };
  },
};
</script>
<style scoped lang="scss">
.avatar-uploader .el-upload {
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader-icon:hover {
  border-color: #409eff !important;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  border: 1px dashed #d9d9d9 !important;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.quill-editor {
  height: 200px !important;
  margin-bottom: 50px;
}
</style>