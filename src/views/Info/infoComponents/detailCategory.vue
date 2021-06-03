<template>
  <el-form :model="form" ref="form">
    <el-form-item label="类别: " :label-width="formLabelWidth">
      <el-select v-model="form.region" placeholder="请选择">
        <el-option
          v-for="item in form.category"
          :key="item.id"
          :label="item.categoryName"
          :value="item.categoryName"
        ></el-option>
      </el-select>
      <!-- *********************************************************************************** -->
    </el-form-item>
    <el-form-item label="新闻标题: " :label-width="formLabelWidth">
      <el-input v-model="form.title" aria-placeholder="请输入标题"></el-input>
    </el-form-item>
    <!-- *************************************************************************************** -->
    <el-form-item label="缩略图: " :label-width="formLabelWidth">
      <el-upload
        class="avatar-uploader"
        action="http://192.168.1.105/upload"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-form-item>
    <!-- *************************************************************************************** -->
    <el-form-item label="发布日期: " :label-width="formLabelWidth">
      <el-date-picker
        v-model="form.createTime"
        type="date"
        placeholder="选择日期"
        disabled
      >
      </el-date-picker>
    </el-form-item>
    <!-- ***************************************************************************************** -->
    <el-form-item label="详细内容" :label-width="formLabelWidth">
      <quillEditor v-model="form.content" ref="myQuillEditor" class="space" />
    </el-form-item>
    <!-- ***************************************************************************************** -->
    <el-form-item label="" :label-width="formLabelWidth">
      <el-button type="danger" @click="submit">确定</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { onMounted, reactive, ref, watch } from "@vue/composition-api";
import { common } from "@/api/common.js";
import { getList_api, editInfo_api } from "@/api/news";
import { quillEditor } from "vue-quill-editor";
// 导入富文本编辑器样式
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
export default {
  name: "detail",
  components: { quillEditor },
  setup(props, { root }) {
    const detailId = ref("" || root.$store.state.detailCategory.id);
    const formLabelWidth = ref("120px");
    const form = reactive({
      category: [],
      title: "",
      content: "",
      region: "",
      createTime: "",
      categoryId: "",
      imageUrl: "",
    });
    const { category, getInfoCategory } = common();
    /*****************************获取需要详细编辑的整条数据******************************************* */
    const getList = () => {
      let requestData = {
        pageNumber: 1,
        pageSize: 1,
        id: detailId.value,
      };
      getList_api(requestData)
        .then((response) => {
          let data = response.data.item[0];
          //   初始化编辑框内容
          form.categoryId = data.categoryId;
          form.region = toCategory();
          form.title = data.title;
          form.createTime = data.createTime;
          form.content = data.content;
        })
        .catch((error) => {
          console.log("getList error");
        });
    };
    /************************************************************************************ */
    const toCategory = () => {
      let newData = form.category.filter(
        (category) => category.id == form.categoryId
      )[0];
      if (newData) return newData.categoryName;
    };
    /***********************************编辑接口********************************************* */
    const editInfo = () => {
      // 拿到categoryId
      let newData = form.category.filter(
        (category) => category.categoryName == form.region
      )[0];

      // 定义编辑请求数据
      let requestData = {
        id: detailId.value,
        categoryId: newData.id,
        title: form.title,
        content: form.content,
      };
      // 调用编辑接口
      editInfo_api(requestData)
        .then((response) => {
          root.$message.success(response.msg);
        })
        .catch((error) => {
          root.$message.error(error.msg);
        });
    };
    /***************************************详细编辑提交************************************ */
    const submit = () => {
      editInfo();
    };
    /*********************************缩略图方法 ************************************************ */
    const handleAvatarSuccess = (res, file) => {
      this.imageUrl = URL.createObjectURL(file.raw);
    };
    // 上传之前
    const beforeAvatarUpload = (file) => {
      console.log(file);
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        root.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        root.$message.error("上传头像图片大小不能超过 2MB!");
      }

      return isJPG && isLt2M;
    };

    /**************************************挂载********************************************* */
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
      detailId,
      formLabelWidth,
      form,
      getList,
      submit,
      toCategory,
      handleAvatarSuccess,
      beforeAvatarUpload,
      editInfo,
    };
  },
};
</script>
<style lang="scss" scoped>
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
.space {
  height: 200px !important;
  margin-bottom: 50px !important;
}
</style>