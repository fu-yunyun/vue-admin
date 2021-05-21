<template>
  <div id="DigInfo">
    <el-dialog
      title="新增"
      :visible.sync="dialog_info_flag"
      @close="close"
      width="580px"
    >
      <el-form :model="form">
        <!-- ********************************************************* -->
        <el-form-item label="类别" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <!-- *************************************************************** -->
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input
            v-model="form.name"
            autocomplete="off"
            placeholder="请输入标题"
          ></el-input>
        </el-form-item>
        <!-- *********************************************************** -->
        <el-form-item label="概述" :label-width="formLabelWidth">
          <el-input
            v-model="form.name"
            autocomplete="off"
            placeholder="请输入内容"
            type="textarea"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="danger" @click="dialogFormVisible = false"
          >确定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  // vue 2.0
  name: "DigInfo",
  data() {
    return {
      dialog_info_flag: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      formLabelWidth: "70px",
    };
  },
  //   父组件传入的数据是单向数据流，不能更改父组件中的数据
  props: {
    flag: {
      type: Boolean,
      default: false,
    },
  },
  // 通过watch监听可以更改父组件的数据 ,当弹窗关闭时，flag的状态会发生改变 触发 close事件
  watch: {
    flag(newdata, olddata) {
      this.dialog_info_flag = newdata;
    },
  },
  methods: {
    close() {
      //   触发调用父组件的close方法 执行逻辑程序 或者 状态更改
      this.dialog_info_flag = false;
      this.$emit("close", false);

      //   含逻辑更改时不易采用
      //   增加修饰器  不需要再调用父组件中方法
      //   this.$emit("upadte:flag", false);
    },
  },
};
</script>

<style>
</style>