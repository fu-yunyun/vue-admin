<template>
  <div class="AddUser">
    <el-dialog
      :title="title"
      :visible.sync="dialog_User_flag"
      width="580px"
      @open="open"
      @close="close"
    >
      <el-form :model="data.form" ref="form" :rules="rules" status-icon>
        <!-- ************************************************************************************** -->
        <el-form-item
          label="邮箱地址: "
          :label-width="formLabelWidth"
          prop="username"
        >
          <el-input
            v-model="data.form.username"
            autocomplete="off"
            placeholder="请输入邮箱地址"
          ></el-input>
        </el-form-item>
        <!-- ***************************************************************************************** -->
        <el-form-item label="姓名: " :label-width="formLabelWidth" prop="name">
          <el-input
            v-model="data.form.name"
            autocomplete="off"
            placeholder="请输入真实姓名"
          ></el-input>
        </el-form-item>
        <!-- ***************************************************************************************** -->
        <el-form-item
          label="密码: "
          :label-width="formLabelWidth"
          prop="password"
        >
          <el-input
            v-model="data.form.password"
            type="password"
            autocomplete="off"
            placeholder="请输入6-15位数字和字母的密码"
          ></el-input>
        </el-form-item>
        <!-- ***************************************************************************************** -->
        <el-form-item
          label="手机号: "
          :label-width="formLabelWidth"
          prop="phone"
        >
          <el-input
            v-model="data.form.phone"
            autocomplete="off"
            placeholder="请输入手机号"
          ></el-input>
        </el-form-item>
        <!-- ***************************************************************************************** -->
        <el-form-item
          label="地区: "
          :label-width="formLabelWidth"
          prop="region"
        >
          <Citypicker :cityPickerData.sync="data.form.region" />
        </el-form-item>
        <!-- ***************************************************************************************** -->
        <el-form-item
          label="是否启用: "
          :label-width="formLabelWidth"
          prop="status"
        >
          <el-radio v-model="data.form.status" :label="0">启用</el-radio>
          <el-radio v-model="data.form.status" :label="1">禁用</el-radio>
        </el-form-item>
        <!-- ***************************************************************************************** -->
        <el-form-item label="角色: " :label-width="formLabelWidth" prop="role">
          <el-checkbox-group v-model="data.form.role" @change="handlerCheckbox">
            <el-checkbox
              v-for="items in data.roles"
              :key="items.id"
              :label="items.role"
              >{{ items.role }}
            </el-checkbox>
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
import { onMounted, reactive, ref, watch } from "@vue/composition-api";
import Citypicker from "../../components/AddUser/cityPicker.vue";
import { addUser_api, editUser_api, getRole_api } from "@/api/user.js";
import { stripscript, validatePassword } from "@/utils/validate.js";
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
    editData: {
      type: Object,
      default: () => {},
    },
    // 弹窗类型
    boxStyle: {
      type: String,
      default: () => {},
    },
  },
  setup(props, { root, emit, refs, validate }) {
    /**
     * 弹窗类型
     */
    const title = ref();
    /**
     * label宽度
     */
    const formLabelWidth = ref("85px");
    /**
     *  弹窗是否开启
     */
    const dialog_User_flag = ref(false);
    /**
     * 表单数据
     */

    // 获取地区地址
    const data = reactive({
      form: {
        // 角色选中数据
        username: "",
        password: "",
        phone: "",
        name: "",
        role: [],
        region: {},
        // 是否启用
        status: "",
      },

      // 地区       // 获取地址 对象类型
      roles: [],
      checkBoxData: [],
    });
    var validatePass = (rule, value, callback) => {
      // 判断过滤后的字符和输入字符长度是否相同以判断是否包含特殊字符
      if (stripscript(value).length != value.length) {
        callback(new Error("密码不得包含特殊字符，请重新输入！"));
        // 将过滤的字符赋值给value以便后续校验
        value = stripscript(value);
      }
      if (value === "") {
        callback(new Error("请输入密码"));
        // 判断密码格式，采用正则表达式匹配
      } else if (validatePassword(value)) {
        callback(new Error("密码只允许输入6-20位的字母和数字"));
      } else {
        callback();
      }
    };
    /**
     * 验证规则
     */
    const rules = reactive({
      name: [
        { required: true, message: "请输入姓名", trigger: "blur" },
        { min: 3, max: 8, message: "长度在 3 到 5 个字符", trigger: "blur" },
      ],
      status: [
        { required: true, message: "请选择是否启用", trigger: "change" },
      ],
      region: [
        { required: true, message: "请选择地址区域", trigger: "change" },
      ],
      role: [
        {
          type: "array",
          required: true,
          message: "请至少选择一个用户角色",
          trigger: "change",
        },
      ],
      username: [
        { required: true, message: "请输入邮箱地址", trigger: "blur" },
        {
          type: "email",
          message: "请输入正确的邮箱地址",
          trigger: ["blur", "change"],
        },
      ],
      password: [{ validator: validatePass, trigger: "blur" }],
    });

    /*
     * 表单校验
     
    /**
     * 添加用户信息提交
     */

    const submit = () => {
      data.form.role = data.checkBoxData;
      refs.form.validate((valid) => {
        if (valid) {
          if (title.value == "新增用户") {
            // 将数组转换成字符串
            let requestData = JSON.parse(JSON.stringify(data.form));
            addUser_api(requestData)
              .then((response) => {
                root.$message.success(response.msg);
              })
              .catch((error) => {
                root.$message.error(error.msg);
              });
            close();
          } else if (title.value == "编辑信息") {
            console.log(data.form.role);
            editUser_api(data.form)
              .then((response) => {
                root.$message.success(response.msg);
              })
              .catch((error) => {
                root.$message.error(error.msg);
              });
          }
        } else {
          root.$message.warinig("请输入合法数据");
          return false;
        }
      });
    };

    const handlerCheckbox = (val) => {
      let temp = [];
      for (let items of val) {
        for (let key of data.roles.filter((item) => item.role == items)) {
          temp.push(key.id);
        }
      }
      data.checkBoxData = temp;
    };

    /**
     * 打开弹窗
     */
    const open = () => {
      let data_r = JSON.parse(JSON.stringify(props.editData));
      if (title.value == "编辑信息") {
        data_r.region = {};
        data.form = data_r;
        // console.log(data.form.role);
      } else if ((title.value = "新增用户")) {
        data.form.username = "";
        data.form.password = "";
        data.form.phone = "";
        data.form.name = "";
        data.form.role = [];
        data.form.region = {};
        data.form.status = "";
      }
    };

    /**
     * 关闭弹窗
     */
    const close = () => {
      dialog_User_flag.value = false;
      emit("update:dialog_info_flag", false);
    };
    /**
     * 获取角色 初始化角色
     */
    onMounted(() => {
      getRole_api()
        .then((response) => {
          // data.form.roles = response
          data.roles = response.data;
        })
        .catch((error) => {
          console.log("getRole Fail");
        });
    });
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
      // form,
      title,
      rules,
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