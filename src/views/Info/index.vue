<template>
  <div id="category-warp">
    <el-row :gutter="14">
      <el-col :span="4">
        <div class="label-warp category">
          <label for=""> 类型:</label>
          <div class="warp-content">
            <el-select
              v-model="category_data"
              placeholder="请选择"
              style="width: 100%"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
      </el-col>

      <!-- ******************************************************************************************** -->
      <el-col :span="7">
        <div class="label-warp data">
          <label for=""> 日期: </label>
          <div class="warp-content">
            <el-date-picker
              v-model="data_value"
              type="datetimerange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['12:00:00']"
              style="width: 100%"
            >
            </el-date-picker>
          </div>
        </div>
      </el-col>
      <!-- ********************************************************************************************* -->
      <el-col :span="4">
        <div class="label-warp key">
          <label for=""> 关键字: </label>
          <div class="warp-content">
            <el-select
              v-model="formInline.region"
              placeholder="ID"
              style="width: 80%"
            >
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </div>
        </div>
      </el-col>
      <!-- ********************************************************************************************* -->
      <el-col :span="3">
        <el-input
          v-model="input"
          placeholder="请输入内容"
          style="width: 110%; margin-left: -10px"
        ></el-input>
      </el-col>
      <!-- ******************************************************************************************* -->
      <el-col :span="2">
        <el-button type="danger" style="width: 100%">搜索</el-button>
      </el-col>
      <!-- ******************************************************************************************** -->
      <el-col :span="2"> <p></p> </el-col>
      <!-- ******************************************************************************************** -->
      <el-col :span="2">
        <el-button
          type="danger"
          style="width: 100%"
          class="pull-right"
          @click="change_dialog_info"
          >新增</el-button
        >
      </el-col>
      <!-- ******************************************************************************************** -->
    </el-row>
    <div class="space-30"></div>
    <!-- *************************************表格数据********************************************** -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="selection" width="50"> </el-table-column>
      <el-table-column prop="title" label="标题" width="620"> </el-table-column>
      <el-table-column prop="category" label="类别" width="100">
      </el-table-column>
      <el-table-column prop="date" label="日期" width="120"> </el-table-column>
      <el-table-column prop="user" label="管理员" width="115">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="danger" @click="del" size="mini"> 删除</el-button>
          <el-button type="success" size="mini" @click="change_dialog_info"
            >编辑</el-button
          ></template
        >
      </el-table-column>
    </el-table>
    <div class="space-30"></div>
    <!-- ****************************************************底部分页*********************************** -->
    <el-row>
      <el-col :span="12">
        <el-button size="medium">批量操作</el-button>
      </el-col>
      <el-col :span="12">
        <el-pagination
          background
          layout="total,prev, pager, next"
          :total="1000"
        >
        </el-pagination>
      </el-col>
    </el-row>
    <!-- ***********************************************新增弹窗***************************************** -->
    <!-- 含逻辑更改时不易采用  -->
    <!-- 增加修饰器 :flag.sync="dialog_info"  不需要再调用close方法 -->
    <Diginfo :flag="dialog_info" @close="close" />
  </div>
</template>

<script>
import { reactive, ref } from "@vue/composition-api";
import Diginfo from "./infoComponents/index.vue";
export default {
  name: "infoIndex",
  // 注册组件
  components: { Diginfo },
  setup(props, { root }) {
    const dialog_info = ref(false);
    const category_data = ref("");
    const data_value = ref("");
    const input = ref("");
    const options = reactive([
      {
        value: "选项1",
        label: "黄金糕",
      },
      {
        value: "选项2",
        label: "双皮奶",
      },
      {
        value: "选项3",
        label: "蚵仔煎",
      },
    ]);
    const tableData = reactive([
      {
        title: "纽约市市长白思豪宣布退出总统竞选 特朗普发推特回应",
        category: "国内信息",
        date: "2016-05-02",
        user: "管理员",
      },
      {
        title: "纽约市市长白思豪宣布退出总统竞选 特朗普发推特回应",
        category: "国内信息",
        date: "2016-05-02",
        user: "管理员",
      },
      {
        title: "纽约市市长白思豪宣布退出总统竞选 特朗普发推特回应",
        category: "国内信息",
        date: "2016-05-02",
        user: "管理员",
      },
      {
        title: "纽约市市长白思豪宣布退出总统竞选 特朗普发推特回应",
        category: "国内信息",
        date: "2016-05-02",
        user: "管理员",
      },
    ]);
    const formInline = reactive({
      user: "",
      region: "",
    });
    const change_dialog_info = () => {
      dialog_info.value = true;
    };
    const close = () => {
      dialog_info.value = false;
    };
    const del = () => {
      root
        .$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          center: true,
        })
        .then(() => {
          root.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          root.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    };
    return {
      // ref
      category_data,
      data_value,
      input,
      dialog_info,
      //   reactive
      options,
      formInline,
      tableData,
      // function
      change_dialog_info,
      close,
      del,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../../styles/config.scss";
.label-warp {
  &.category {
    @include labelDom(left, 40, 40);
  }
  &.data {
    @include labelDom(right, 60, 40);
  }
  &.key {
    @include labelDom(right, 70, 40);
  }
}
.label-warp.data .warp-content {
  margin-left: 75px;
}
.label-warp.key .el-select {
  margin-left: 10px;
}
.space-30 {
  height: 30px;
}
.el-pagination.is-background {
  float: right !important;
}
</style>