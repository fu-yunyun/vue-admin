<template>
  <div id="login">
    <div class="login-warp">
      <ul class="menuTab">
        <li
          v-for="item in menuTab"
          :key="item.id"
          :class="{ current: item.current }"
          @click="toggleMenu(item)"
        >
          {{ item.text }}
        </li>
      </ul>

      <!-- element 框架 -->
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        class="login-form"
      >
        <el-form-item prop="username" class="item-form">
          <label> 邮箱</label>
          <el-input
            type="text"
            v-model="ruleForm.username"
            autocomplete="off"
            size="medium"
          ></el-input>
        </el-form-item>

        <el-form-item prop="password" class="item-form">
          <label>密码</label>
          <el-input
            type="text"
            v-model="ruleForm.password"
            autocomplete="off"
            maxlength="20"
            minlength="6"
          ></el-input>
        </el-form-item>

        <!--获得注册当前的状态，v-show可以和注册样式状态连用
        使用v-show在提交的时候也会验证确认密码，当验证未通过的时候就会提交失败，所以需要在提交时判断是注册还是登录
        使用v-if时当值为false时会删除整个dom，不会影响
        -->
        <el-form-item
          prop="confirmP"
          class="item-form"
          v-if="menuTab[1].current"
        >
          <label>重复密码</label>
          <el-input
            type="text"
            v-model="ruleForm.confirmP"
            autocomplete="off"
            maxlength="20"
            minlength="6"
          ></el-input>
        </el-form-item>

        <el-form-item prop="code" class="item-form">
          <label> 验证码</label>
          <el-row :gutter="11">
            <el-col :span="15"
              ><el-input
                v-model.number="ruleForm.code"
                minlength="6"
                maxlength="6"
              ></el-input
            ></el-col>
            <el-col :span="9"
              ><el-button type="success" class="block"
                >获取验证码</el-button
              ></el-col
            >
          </el-row>
        </el-form-item>

        <el-form-item>
          <el-button
            type="danger"
            @click="submitForm('ruleForm')"
            class="block login-btn"
            >提交</el-button
          >
        </el-form-item>
      </el-form>
      <!-- element end -->
    </div>
  </div>
</template>
<script>
// 引入js文件
import {
  stripscript,
  validateEmail,
  validatePassword,
  validateCode,
} from "@/utils/validate";

export default {
  name: "login",
  data() {
    // 验证用户名
    var validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
        // 判断邮箱格式，采用正则表达式匹配
      } else if (validateEmail(value)) {
        callback(new Error("用户名格式有误"));
      } else {
        callback();
      }
    };

    // 验证密码
    var validatePass = (rule, value, callback) => {
      // 判断过滤后的字符和输入字符长度是否相同以判断是否包含特殊字符
      if (stripscript(value).length != value.length) {
        callback(new Error("密码不得包含特殊字符，请重新输入！"));
        // 将过滤的字符赋值给value以便后续校验
        value = stripscript(value);
      }
      if (value === "") {
        callback(new Error("请再次输入密码"));
        // 判断密码格式，采用正则表达式匹配
      } else if (validatePassword(value)) {
        callback(new Error("密码只允许输入6-20位的字母和数字"));
      } else {
        callback();
      }
    };

    // 验证重复密码
    var validateConfirmP = (rule, value, callback) => {
      // 判断是注册还是登录，以便判断是否需要验证通过

      if (!value) {
        return callback(new Error("输入确认密码"));
      } else if (value != this.ruleForm.password) {
        callback(new Error("确认密码与密码不一致"));
      } else {
        callback();
      }
    };
    // 验证验证码
    var checkCode = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("输入验证码"));
      } else if (validateCode(value)) {
        callback(new Error("验证码格式错误"));
      } else {
        callback();
      }
    };

    return {
      menuTab: [
        { text: "登录", current: true },
        { text: "注册", current: false },
      ],

      ruleForm: {
        username: "",
        password: "",
        code: "",
        confirmP: "",
      },
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
        confirmP: [{ validator: validateConfirmP, trigger: "blur" }],
        code: [{ validator: checkCode, trigger: "blur" }],
      },
    };
  },
  // 创建
  create() {},
  // 挂载
  mount() {},
  methods: {
    toggleMenu(data) {
      // 通过foreach函数循环数组，element直接拿的是元素对象
      this.menuTab.forEach((element) => {
        // 将所有的数组元素内对象的current直接初始化为false，排他思想
        element.current = false;
      });
      // 将当前的对象中的current初始化为true
      data.current = true;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
#login {
  // vh:基于可视区的百分比
  height: 100vh;
  background-color: #373e70;
}
.login-warp {
  width: 330px;
  margin: auto;
}
.menuTab {
  text-align: center;
  li {
    width: 80px;
    display: inline-block;
    line-height: 36px;
    font-size: 14px;
    color: #fff;
    border-radius: 2px;
    cursor: pointer;
  }
}
.current {
  background-color: rgba(0, 0, 0, 0.1);
}
.login-form {
  label {
    display: block;
    color: #fff;
    size: 14px;
    margin-bottom: 3px;
  }
  .item-form {
    margin-bottom: 13px;
  }
  .block {
    display: block;
    width: 100%;
  }
  .login-btn {
    margin-top: 19px;
  }
}
</style>