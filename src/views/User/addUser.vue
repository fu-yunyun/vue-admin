<template>
  <div class="AddUser">
    <el-dialog
      :visible.sync="dialog_User_flag"
      width="580px"
      @open="open"
      @close="close"
    >
      <el-form :model="form" ref="form">
        <!-- ************************************************************************************** -->
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input
            v-model="form.username"
            autocomplete="off"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <!-- ***************************************************************************************** -->
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input
            v-model="form.name"
            autocomplete="off"
            placeholder="请输姓名"
          ></el-input>
        </el-form-item>
        <!-- ***************************************************************************************** -->
        <el-form-item label="手机号" :label-width="formLabelWidth">
          <el-input
            v-model="form.phone"
            autocomplete="off"
            placeholder="请输入手机号"
          ></el-input>
        </el-form-item>
        <!-- ***************************************************************************************** -->
        <el-form-item label="地区" :label-width="formLabelWidth">
          <Citypicker />
        </el-form-item>
        <!-- ***************************************************************************************** -->
        <el-form-item label="是否启用" :label-width="formLabelWidth">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <!-- ***************************************************************************************** -->
        <el-form-item label="角色" :label-width="formLabelWidth">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <!-- ***************************************************************************************** -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button>取消</el-button>
        <el-button type="danger">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { onMounted, reactive, ref, watch } from "@vue/composition-api";
import Citypicker from "../../components/AddUser/cityPicker.vue";
export default {
  name: "AddUser",
  components: { Citypicker },
  props: {
    dialog_info_flag: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { root, emit }) {
    /**
     * label宽度
     */
    const formLabelWidth = ref("80px");
    /**
     *  弹窗是否开启
     */
    const dialog_User_flag = ref(props.dialog_info_flag) || ref(false);
    /**
     * 输入框值
     */
    const form = reactive({
      username: "",
      name: "",
    });
    watch(
      () => props.dialog_info_flag,
      (value) => {
        dialog_User_flag.value = value;
      }
    );
    /**
     * 打开弹窗
     */
    const open = () => {};
    /**
     * 关闭弹窗
     */
    const close = () => {
      dialog_User_flag.value = false;
      emit("update:dialog_info_flag", false);
    };
    return {
      formLabelWidth,
      dialog_User_flag,
      form,
      open,
      close,
    };
  },
};
</script>
<style scoped lang="scss">
</style>