<template>
  <div class="content">
    <div class="page404">
      <h1>404 NOT FOUND</h1>
      <p>你所访问的页面不存在，点击 <a @click="home">返回主页</a></p>
    </div>
  </div>
</template>
<script>
export default {
  setup(props, { root }) {
    const home = () => {
      root.$router.push({
        name: "Console",
      });
    };
    return {
      home,
    };
  },
};
</script>
<style scoped lang="scss">
.page404 {
  height: 100%;
  // background: url("./b8.jpg") 100% no-repeat;
  overflow: hidden;
}
h1 {
  color: red;
  text-align: center;
  font-size: 100px;
  margin-top: 150px;
}
p {
  margin-top: 50px;
  color: blue;
  text-align: center;
  font-size: 25px;
  a {
    color: red;
  }
}
p:hover {
  cursor: pointer;
}
</style>