<template>
  <div class="AddUser">
    <el-dialog
      title="新增用户"
      :visible.sync="dialog_User_flag"
      width="580px"
      @open="open"
      @close="close"
    >
      <el-form :model="form" ref="form">
        <!-- ************************************************************************************** -->
        <el-form-item label="邮箱地址: " :label-width="formLabelWidth">
          <el-input
            v-model="form.username"
            autocomplete="off"
            placeholder="请输入邮箱地址"
            prop="username"
          ></el-input>
        </el-form-item>
        <!-- ***************************************************************************************** -->
        <el-form-item label="姓名: " :label-width="formLabelWidth">
          <el-input
            v-model="form.name"
            autocomplete="off"
            placeholder="请输入真实姓名"
            prop="name"
          ></el-input>
        </el-form-item>
        <!-- ***************************************************************************************** -->
        <el-form-item label="密码: " :label-width="formLabelWidth">
          <el-input
            v-model="form.password"
            type="password"
            autocomplete="off"
            placeholder="请输入6-15位数字和字母的密码"
            prop="password"
          ></el-input>
        </el-form-item>
        <!-- ***************************************************************************************** -->
        <el-form-item label="手机号: " :label-width="formLabelWidth">
          <el-input
            v-model="form.phone"
            autocomplete="off"
            placeholder="请输入手机号"
            prop="phone"
          ></el-input>
        </el-form-item>
        <!-- ***************************************************************************************** -->
        <el-form-item label="地区: " :label-width="formLabelWidth">
          <Citypicker :cityPickerData.sync="form.cityPickerData" />
        </el-form-item>
        <!-- ***************************************************************************************** -->
        <el-form-item label="是否启用: " :label-width="formLabelWidth">
          <el-radio v-model="form.radioValue" label="1">启用</el-radio>
          <el-radio v-model="form.radioValue" label="2">禁用</el-radio>
        </el-form-item>
        <!-- ***************************************************************************************** -->
        <el-form-item label="角色: " :label-width="formLabelWidth">
          <el-checkbox-group v-model="form.checkList">
            <el-checkbox label="A"></el-checkbox>
            <el-checkbox label="B"></el-checkbox>
            <el-checkbox label="C"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <!-- ***************************************************************************************** -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="danger" @click="close">确定</el-button>
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
    const dialog_User_flag = ref(false);
    /**
     * 输入框值
     */
    // 获取地区地址

    const form = reactive({
      // 获取地址 对象类型
      cityPickerData: {},
      username: "",
      password: "",
      name: "",
      // 地区
      region: "",
      // 是否启用
      radioValue: "1",
      // 角色
      checkList: ["A", "B"],
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