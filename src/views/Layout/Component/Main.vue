<template>
  <div id="main-wrap">
    <div class="main-content">
      <div class="content">
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive" />
        </keep-alive>
        <!-- 不需要缓存 -->
        <router-view v-if="!$route.meta.keepAlive" />
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "../../../styles/config.scss";
#main-wrap {
  // 此处不用百分比是因为 百分比基于父元素显示，没有指定高度的时候由内容撑起高度
  height: 115vh; //可视区被缩减至90%
  // position: fixed;
  // top: 75px;
  // left: $navMenu;
  // right: 0;
  // bottom: 0;
  // border: 30px solid #f7f7f7;
  // border-bottom: 0;
}
.main-content {
  width: 100%;
  height: 100%;
  padding-top: $layoutHeader + 30;
  padding-right: 30px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  background-color: #f7f7f7;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  -ms-transition: all 0.3s;
  transition: all 0.3s;
}
.content {
  width: 100%;
  height: 100%;
  padding: 30px 30px 0px 30px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  background-color: #fff;
}
.open {
  .main-content {
    padding-left: $navMenu + 30;
  }
}
.close {
  .main-content {
    padding-left: $floatWidth + 30;
  }
}
</style>