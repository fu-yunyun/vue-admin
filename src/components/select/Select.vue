<template>
  <div class="select_key">
    <div class="label-warp key">
      <label for=""> 关键字: </label>
      <div class="warp-content">
        <el-select v-model="selectConfig.item.value">
          <el-option
            v-for="items in selectConfig.item"
            :key="items.value"
            :label="items.label"
            :value="items.value"
          ></el-option>
        </el-select>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive } from "@vue/composition-api";
export default {
  name: "select_key",
  props: {
    config: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    const selectConfig = reactive({
      item: [],
    });
    selectConfig.item = props.config;
    return {
      selectConfig,
    };
  },
  /**
   *
   * 组件数据配置：selectConfig:{
   *    item:[
   *     {
   *        key:"",
   *        value:""
   *        }
   *  ]   item中配置下拉菜单选项值,数组类型,内含key和value属性
   *      key配置下拉选项属性值，value配置下拉选项显示值
   * }
   *
   */
};
</script>
<style scoped lang="scss">
label-warp {
  &.key {
    @include labelDom(right, 70, 40);
  }
  .warp-content {
    padding-left: 15px !important;
  }
}
.pull-right {
  float: right;
}
</style>