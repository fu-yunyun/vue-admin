<template>
  <div class="AddUser">
    <el-dialog
      :title="title"
      :visible.sync="dialog_User_flag"
      width="580px"
      @open="open"
      @close="close"
    >
      <el-form :model="data.form" ref="data">
        <!-- ************************************************************************************** -->
        <el-form-item label="邮箱地址: " :label-width="formLabelWidth">
          <el-input
            v-model="data.form.email"
            autocomplete="off"
            placeholder="请输入邮箱地址"
            prop="email"
          ></el-input>
        </el-form-item>
        <!-- ***************************************************************************************** -->
        <el-form-item label="姓名: " :label-width="formLabelWidth">
          <el-input
            v-model="data.form.name"
            autocomplete="off"
            placeholder="请输入真实姓名"
            prop="name"
          ></el-input>
        </el-form-item>
        <!-- ***************************************************************************************** -->
        <el-form-item label="密码: " :label-width="formLabelWidth">
          <el-input
            v-model="data.form.password"
            type="password"
            autocomplete="off"
            placeholder="请输入6-15位数字和字母的密码"
            prop="password"
          ></el-input>
        </el-form-item>
        <!-- ***************************************************************************************** -->
        <el-form-item label="手机号: " :label-width="formLabelWidth">
          <el-input
            v-model="data.form.phone"
            autocomplete="off"
            placeholder="请输入手机号"
            prop="phone"
          ></el-input>
        </el-form-item>
        <!-- ***************************************************************************************** -->
        <el-form-item label="地区: " :label-width="formLabelWidth">
          <Citypicker :cityPickerData.sync="data.form.region" />
        </el-form-item>
        <!-- ***************************************************************************************** -->
        <el-form-item label="是否启用: " :label-width="formLabelWidth">
          <el-radio v-model="data.form.radioValue" label="1">启用</el-radio>
          <el-radio v-model="data.form.radioValue" label="2">禁用</el-radio>
        </el-form-item>
        <!-- ***************************************************************************************** -->
        <el-form-item label="角色: " :label-width="formLabelWidth">
          <el-checkbox-group v-model="data.form.role" @change="handlerCheckbox">
            <el-checkbox
              v-for="items in data.form.roles"
              :key="items.role"
              :label="items.value"
              >{{ items.role }}</el-checkbox
            >
          </el-checkbox-group>
        </el-form-item>
        <!-- ***************************************************************************************** -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="danger" @click="submit">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { reactive, ref, watch } from "@vue/composition-api";
import Citypicker from "../../components/AddUser/cityPicker.vue";
import { addUser_api, getRole_api, editUser_api } from "@/api/user.js";
export default {
  name: "AddUser",
  components: { Citypicker },
  props: {
    // 弹窗开启标识
    dialog_info_flag: {
      type: Boolean,
      default: false,
    },
    // 多选框数据
    checkBoxData: {
      type: Object,
      default: () => [],
    },
    // 弹窗类型
    boxStyle: {
      type: String,
      default: () => {},
    },
  },
  setup(props, { root, emit, refs }) {
    /**
     * 弹窗类型
     */
    const title = ref();
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

    const data = reactive({
      form: {
        email: "",
        password: "",
        phone: "",
        name: "",
        // 地区       // 获取地址 对象类型
        region: {},
        // 是否启用
        radioValue: "1",
        // 角色选中值
        role: [],
        // 角色选项
        roles: [
          {
            id: 1,
            role: "信息管理员",
            value: "InfoAdmin",
          },
          {
            id: 2,
            role: "用户管理员",
            value: "UserAdmin",
          },
          {
            id: 3,
            role: "系统管理员",
            value: "SystemAdmin",
          },
        ],
      },
    });
    const handlerCheckbox = (val) => {
      console.log(val);
    };
    /**
     * 添加用户信息提交
     */
    const submit = () => {
      if (title.value == "新增用户") {
        // 将数组转换成字符串
        let requestData = JSON.parse(JSON.stringify(data.form));
        console.log(requestData);
        addUser_api(data.form)
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log("add user fail");
          });
        close();
      } else if (title.value == "编辑信息") {
        editUser_api(data.form)
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    };
    /**
     * 打开弹窗
     */
    const open = () => {
      if (title.value == "编辑信息") {
        if (props.checkBoxData) {
          data.form = props.checkBoxData;
        }
      } else {
        data.form = {};
      }
      // 获取用户角色 拿到数据 循环遍历 roleItem: role , name ,id
      getRole_api()
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log("get role fail");
        });
    };
    /**
     * 关闭弹窗
     */
    const close = () => {
      dialog_User_flag.value = false;
      emit("update:dialog_info_flag", false);
    };

    /**
     * 弹窗开启表示 数据监听
     */
    watch(
      () => props.dialog_info_flag,
      (value) => {
        dialog_User_flag.value = value;
      }
    );
    watch(
      () => props.boxStyle,
      (val) => {
        title.value = val;
      }
    );

    /**
     * 数据返回
     */
    return {
      formLabelWidth,
      dialog_User_flag,
      data,
      title,
      open,
      close,
      submit,
      handlerCheckbox,
    };
  },
};
</script>
<style scoped lang="scss">
</style>