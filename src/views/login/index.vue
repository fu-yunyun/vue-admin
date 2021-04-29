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

        <!--获得注册当前的状态，v-show可以和注册样式状态连用
        使用v-show在提交的时候也会验证确认密码，当验证未通过的时候就会提交失败，所以需要在提交时判断是注册还是登录
        使用v-if时当值为false时会删除整个dom，不会影响
        -->
        <el-form-item
          prop="confirmP"
          class="item-form"
          v-if="menuTab[1].current"
        >
          <!-- v-if = " model === 'reg' "  -->

          <label>重复密码</label>
          <el-input
            type="password"
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
                v-model="ruleForm.code"
                minlength="6"
                maxlength="6"
              ></el-input
            ></el-col>
            <el-col :span="9">
              <el-button
                type="success"
                class="block"
                @click="getSms"
                :disabled="codeButtonStatus.status"
                >{{ codeButtonStatus.text }}
              </el-button>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item>
          <el-button
            type="danger"
            @click="submitForm('ruleForm')"
            class="block login-btn"
            :disabled="loginButtonStatus"
            >{{ model === "login" ? "登录" : "注册" }}</el-button
          >
        </el-form-item>
      </el-form>
      <!-- element end -->
    </div>
  </div>
</template>
<script>
// 引入加密sha1
import sha1 from "js-sha1";
// 引入拦截器 获取默认暴漏，不需要{}
// import service from "@/utils/request";
import { GetSms, Register, Login } from "@/api/login";
// 引入js文件
import {
  stripscript,
  validateEmail,
  validatePassword,
  validateCode,
} from "@/utils/validate";

// 引用reactive
import { isRef, reactive, ref, toRefs, onMounted } from "@vue/composition-api";
export default {
  name: "login",

  /*  
  生命周期：
      注意依赖 Composition-api   
        beforeCreate
        created  
        vue 3.0 被vue 3.0 代替
        beforeMount ---> onBeforeMount
        mounted ---> onMounted
        methods 去除，普通方式写方法
        beforeUpdate ---> onUpdate
        beforeDestory ---> onBeforeUnmount
        destoty ---> onUmounted
        errorCapture ---> onErrorCapture

        */

  /*

function aa(){
  return {
    a:1,
    b:2,
    c:3
  }
}

let {a,b:8,c} = aa();
取值，或 修改

*/

  // 组件实例对象
  setup(props, { refs, root }) {
    // 放值组件信息 例如：data(){},生命周期...

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
      } else if (value != ruleForm.password) {
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

    /***************************************************************************************************** */
    // 数据声明

    // 倒计时
    const timer = ref();
    const ruleForm = reactive({
      username: "",
      password: "",
      code: "",
      confirmP: "",
    });
    const rules = reactive({
      username: [{ validator: validateUsername, trigger: "blur" }],
      password: [{ validator: validatePass, trigger: "blur" }],
      confirmP: [{ validator: validateConfirmP, trigger: "blur" }],
      code: [{ validator: checkCode, trigger: "blur" }],
    });

    // reactive: 声明遇到对象类型，使用reactive处理
    const menuTab = reactive([
      { text: "登录", current: true, type: "login" },
      { text: "注册", current: false, type: "register" },
    ]);
    // console.log(menuTab);

    // 声明基础数据使用ref
    const model = ref("login");

    // 登录按钮禁用状态
    const loginButtonStatus = ref(true);

    // // 验证码按钮状态
    // const codeButtonStatus = ref(false);

    // // 验证码按钮值
    // const codeButtonText = ref("获取验证码");

    // 通过对象的方式处理按钮状态值
    const codeButtonStatus = reactive({
      status: false,
      text: "获取验证码",
    });
    // console.log(model.value);

    // isRef() 检查数据是否为一个基础数据类型 或者对象数据
    // console.log(isRef(model) ? "基础数据" : "是对象数据");

    // toRefs() 将引用数据类型转换为基础数据类型
    // const aa = reactive({
    //   x: 0,
    //   y: 1,
    // });
    // const aaa = toRefs(aa);
    // console.log(aaa.x);

    // const obj = toRefs(menuTab[0]);
    // console.log(obj.text);
    /****************************************************************************************************** */
    // 方法的定义
    // 清除定时器及恢复按钮默认设置

    const clearCountDown = () => {
      // 按钮切换，初始化登录按钮和获取验证码按钮
      loginButtonStatus.value = true;
      // 清除定时器
      clearInterval(timer.value);
      codeButtonStatus.status = false;
      codeButtonStatus.text = "获取验证码";
    };

    // 表单数据清除
    const resetFromatData = () => {
      // 切换form，对form表单进行重置
      refs.ruleForm.resetFields(); //vue 3.0
      // this.$refs[ruleForm].resetFields(); vue 2.0
    };
    const toggleMenu = (data) => {
      // 通过foreach函数循环数组，element直接拿的是元素对象
      menuTab.forEach((element) => {
        // 将所有的数组元素内对象的current直接初始化为false，排他思想
        element.current = false;
      });
      // 将当前的对象中的current初始化为true
      data.current = true;
      model.value = data.type;
      // 清除表单数据
      resetFromatData();
      // 清除定时器
      clearCountDown();
    };
    // 更新按钮状态
    const updateCodeButton = (data) => {
      codeButtonStatus.status = data.status;
      codeButtonStatus.text = data.text;
    };
    // 定时器 倒计时
    const countDown = (number) => {
      // 判断定时器是否存在，存在则清除 防止按钮未disabled 的多次触发
      if (timer.value) {
        clearInterval(timer.value);
      }

      // setTimeout 只执行一次
      // setInterval 不断执行，需要条件终止
      let time = number;
      timer.value = setInterval(() => {
        if (time > 0) {
          time--;
          codeButtonStatus.text = `${time} 秒后获取`;
        } else {
          //更新获取验证码按钮状态
          updateCodeButton({
            status: false,
            text: "再次发送",
          });
          clearInterval(timer.value);
        }
      }, 1000);
    };

    /**************************************************************************************************** */

    //获取验证码
    const getSms = () => {
      // 提示
      if (ruleForm.username == "") {
        root.$message.error("邮箱不能为空");
        return false;
      }
      if (validateEmail(ruleForm.username)) {
        root.$message.error("邮箱格式错误");
        return false;
      }
      // 请求数据封装
      let requestData = {
        username: ruleForm.username,
        module: model.value,
      };
      // 更新获取验证码状态
      updateCodeButton({
        status: true,
        text: "发送中",
      });
      // 请求接口  请求获取验证码
      GetSms(requestData)
        .then((response) => {
          // 执行此处函数的是Promise.resolve
          // 验证码发送成功 信息弹窗
          let data = response.data;
          root.$message({
            message: data.message,
            type: "success",
          });
          // 由于特殊原因，请求成功的操作未能完成，所以请求成功后的操作使请求失败继续进行
          //调定时器 倒计时
          // 启用登录或者注册按钮
          loginButtonStatus.value = false;
        })
        .catch((error) => {
          // 执行catch的是 Promise.reject(objcet);
          // 此处的error是respond.data数据对象
          // 验证码响应失败 信息弹窗
          // 由于特殊原因，请求成功的操作未能完成，所以请求成功后的操作使请求失败继续进行
          //调定时器 倒计时
          // 启用登录或者注册按钮
          loginButtonStatus.value = false;
          countDown(20);
          root.$message.error(error.message);
          console.log("获取验证码失败");
        });

      //   // 启用登录或者注册按钮
      //   loginButtonStatus.value = false;
      //   // 调定定时器，倒计时
      //   countDowm(60);
      // });

      // 请求接口 延时多长时间
    };

    // 提交表单
    const submitForm = (formName) => {
      refs[formName].validate((valid) => {
        if (valid) {
          // 当按钮为注册时  请求注册
          if (model.value == "register") {
            register();
          } // 当按钮为登录时，请求登录接口
          else {
            login();
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    };

    // 请求注册接口 方法封装
    const register = () => {
      // 提交数据校验完成 进行注册接口 请求接口注册
      // 数据格式及数据项
      let requestData = {
        username: ruleForm.username,
        //加密密码
        password: sha1(ruleForm.password),
        code: ruleForm.code,
        module: "register",
      };
      // 请求注册接口
      Register(requestData)
        .then((response) => {
          let data = response.data;
          // 信息弹窗 提示注册成功
          root.$message({
            message: data.message,
            type: "success",
          });
          // 注册成功,自动跳转至登录按钮
          toggleMenu(menuTab[0]);
        })
        .catch((error) => {
          // 信息弹窗，提示注册失败
          root.$message.error(error.message);
          console.log("注册失败");
        });
    };

    // 请求登录接口 方法封装
    const login = () => {
      console.log(requestData);
      let requestData = {
        username: ruleForm.username,
        // sha1密码加密
        password: sha1(ruleForm.password),
        code: ruleForm.code,
      };

      Login(requestData)
        .then((response) => {
          let data = response.data;
          // 信息弹窗 提示登录成功
          root.$message({
            message: data.message,
            type: "success",
          });
        })
        .catch((error) => {
          // 信息弹窗，提示登录失败
          root.$message.error(error.message);
          console.log("登录失败");
        });
    };

    // 生命周期 挂载
    onMounted(() => {});

    // 数据返回
    return {
      menuTab,
      ruleForm,
      rules,
      toggleMenu,
      submitForm,
      model,
      codeButtonStatus,
      loginButtonStatus,
      getSms,
    };
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