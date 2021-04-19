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
            type="password"
            v-model="ruleForm.password"
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
export default {
  name: "login",
  data() {
    // 验证用户名
    var validateUsername = (rule, value, callback) => {
      var regTest = /^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*\.[a-z]{2,}$/;
      if (value === "") {
        callback(new Error("请输入用户名"));
        // 判断邮箱格式，采用正则表达式匹配
      } else if (!regTest.test(value)) {
        callback(new Error("用户名格式有误"));
      } else {
        callback();
      }
    };

    // 验证密码
    var validatePass = (rule, value, callback) => {
      var passTest = /(?!^\d+$)(?!^[a-zA-Z]+$)[0-9a-zA-Z]{6,20}/;
      if (value === "") {
        callback(new Error("请输入密码"));
        // 判断密码格式，采用正则表达式匹配
      } else if (!passTest.test(value)) {
        callback(new Error("密码只允许输入6-20位的字母和数字"));
      } else {
        callback();
      }
    };

    // 验证验证码
    var checkCode = (rule, value, callback) => {
      var codeTest = /^[a-z0-9]{6}$/;
      if (!value) {
        return callback(new Error("输入验证码"));
      } else if (!codeTest.test(value)) {
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
      },
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
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