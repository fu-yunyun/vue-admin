<template>
  <div id="header-wrap">
    <!-- 左 -->
    <div class="pull-left header-icon" @click="navMenuState">
      <svg-icon iconClass="menu" className="menu" />
    </div>
    <div class="pull-right">
      <!-- 中 -->
      <div class="header-icon pull-left haiker">
        <svg-icon iconClass="haiker" className="haiker" />
      </div>
      <div class="user-info pull-left">{{ username }}</div>
      <!-- 右 -->
      <div class="header-icon pull-left" @click="exit">
        <svg-icon iconClass="exit" className="exit" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "@vue/composition-api";
export default {
  name: "header-wrap",
  setup(props, { root }) {
    const navMenuState = () => {
      root.$store.commit("SET_COLLAPSE");
    };
    const username = computed(() => {
      return root.$store.state.login.username;
    });
    const exit = () => {
      // 为了回调 转换页面 在vuex中返回promise可以链式调用
      root.$store.dispatch("exit").then(() => {
        root.$router.push({
          name: "Login",
        });
      });
    };
    return {
      navMenuState,
      username,
      exit,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../../../styles/config.scss";
#header-wrap {
  position: fixed;
  right: 0;
  top: 0;
  height: $layoutHeader;
  background-color: #fff;
  -webkit-box-shadow: 0 3px 16px 0 rgba(0, 0, 0, 0.1);
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  -ms-transition: all 0.3s;
  transition: all 0.3s;
  .header-icon {
    padding: 0 32px;
    svg {
      margin-bottom: -34px !important;
      font-size: 25px;
      cursor: pointer;
    }
  }
  .pull-left {
    float: left;
  }
  .pull-right {
    float: right;
    svg {
      font-size: 22px !important;
    }
    .haiker {
      margin-right: -20px;
      margin-top: 3px;
    }
  }
  .user-info {
    height: 100%;
    padding: 32px 32px;
    font-size: 14px;
    border-right: 1px solid #ededed;
  }
}
.open {
  #header-wrap {
    left: $navMenu;
  }
}
.close {
  #header-wrap {
    left: $floatWidth;
  }
}
</style>