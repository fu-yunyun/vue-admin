<template>
  <div id="nav-wrap">
    <h1 class="logo"><img src="../../../assets/logo.png" alt="" /></h1>
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      background-color="transparent"
      text-color="#fff"
      router
    >
      <!-- 在循环的时候，template是不能够被解析的 -->
      <template v-for="(item, index) in routers">
        <!-- item.hidden 隐藏非console的页面选项 -->
        <el-submenu :index="index + ''" :key="item.id" v-if="!item.hidden">
          <!-- 一级菜单 star-->
          <template slot="title">
            <!-- 全局图标 -->
            <svg-icon
              :iconClass="item.meta.iconName"
              :className="item.meta.iconName"
            />
            <span slot="title">{{ item.meta.name }}</span>
          </template>
          <!-- 一级菜单 end -->

          <!-- 一级子菜单 star-->
          <el-menu-item-group>
            <!-- <span slot="title">分组一</span> -->
            <el-menu-item
              :index="subItem.path"
              v-for="subItem in item.children"
              :key="subItem.id"
              >{{ subItem.meta.name }}</el-menu-item
            >
          </el-menu-item-group>
          <!-- 一级子菜单 end -->
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { reactive, computed } from "@vue/composition-api";
export default {
  name: "nav-warp",
  setup(props, { root }) {
    /********************************data 对象数据 star ************************************************ */

    // 获取三个路由并保存
    const routers = reactive(root.$router.options.routes);

    /********************************data对象数据 end ************************************************* */

    /********************************data数据 star **************************************************** */

    // const isCollapse = ref(false);
    // 拿到通过header点击之后更改的isCollpase值，通过此值来决定是否显示或者折叠导航栏
    const isCollapse = computed(() => root.$store.state.isCollapse);

    /********************************data数据 end **************************************************** */

    /********************************方法的定义 star ************************************************** */

    /********************************方法的定义 end ************************************************** */

    // 取出strore中存储的数据
    // console.log(root.$store.state.isCollapse);
    // console.log(root.$store.getters.count);
    // 调用store中的函数更改state中的值
    // root.$store.commit("SET_COUNT", 100);
    return {
      isCollapse,
      routers,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../../../styles/config.scss";
#nav-wrap {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  background-color: #344a5f;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  -ms-transition: all 0.3s;
  transition: all 0.3s;
  .el-menu {
    border: 0;
  }
  .logo {
    text-align: center;
    img {
      margin: 28px auto 25px;
      width: 92px;
      margin-top: 28px;
      -webkit-transition: all 0.3s ease 0s;
    }
  }
  svg {
    font-size: 20px;
    margin-right: 10px;
    fill: currentColor;
    color: #fff;
  }
}
.open {
  #nav-wrap {
    width: $navMenu;
  }
}
.close {
  #nav-wrap {
    width: $floatWidth;
  }
  .logo img {
    width: 70% !important;
  }
}
.el-menu--vertical {
  .el-menu-item:hover {
    background-color: #f56c6c !important;
  }
}
</style>