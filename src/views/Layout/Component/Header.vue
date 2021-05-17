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
      <div class="user-info pull-left">管理员</div>
      <!-- 右 -->
      <div class="header-icon pull-left">
        <svg-icon iconClass="exit" className="exit" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "header-wrap",
  setup(props, { root }) {
    const navMenuState = () => {
      root.$store.commit("SET_COLLAPSE");
    };
    return {
      navMenuState,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../../../styles/config.scss";
#header-wrap {
  position: fixed;
  left: $navMenu;
  right: 0;
  top: 0;
  height: $layoutHeader;
  background-color: #fff;
  -webkit-box-shadow: 0 3px 16px 0 rgba(0, 0, 0, 0.1);
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
      margin-right: -10px;
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
</style>