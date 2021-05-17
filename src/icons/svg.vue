<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
import {
  isRef,
  reactive,
  ref,
  toRefs,
  onMounted,
  computed,
} from "@vue/composition-api";
export default {
  name: "svg-Icon",
  //   接收来自父组件的属性值
  //   props: ["iconClass", "className"],
  //   指定传入的数据格式规范
  props: {
    iconClass: {
      type: String,
      //   默认值如果基本数据类型，则直接赋值，如果为数组或者对象类型，则需要函数形式赋值
      //   ES6 :eg：()=> []  or  () => {}
      //   ES5 : function() {}
      default: "",
      //   指定是否为必填项
      required: true,
    },
    className: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    // const msg = ref("全局组件,vue.config.js中的runtimecompiler");
    const iconName = computed(() => `#icon-${props.iconClass}`);
    const svgClass = computed(() => {
      if (props.className) {
        return `svg-icon ${props.className}`;
      } else {
        return "svg-icon";
      }
    });
    // const count = ref(10);
    // 计算属性 vue3.0
    // 监听属性变化，并且对属性进行处理 一般是有 setter 和 getter  vue2.0
    // vue3.0  computed({  set(更改或者设置值): =>{}, get(获得值) : val => {} )}
    // const plusone = computed(() => {
    //   return count.value + 1;
    // });
    // // 更改count属性值，触发计算属性
    // const aaa = () => {
    //   count.value = 20;
    // };
    return {
      // msg,
      //   pluseone,
      iconName,
      svgClass,
    };
  },
};
</script>

<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  font-size: 20px;
}
</style>