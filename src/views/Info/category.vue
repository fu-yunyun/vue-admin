<template>
  <div id="category-warp">
    <el-row :gutter="14">
      <el-col :span="4">
        <div class="label-warp category">
          <label for=""> 类型:</label>
          <div class="warp-content">
            <el-select v-model="value" placeholder="请选择" style="width: 100%">
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
              v-model="value1"
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
        <el-button type="danger" style="width: 100%" class="pull-right"
          >新增</el-button
        >
      </el-col>
      <!-- ******************************************************************************************** -->
    </el-row>
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
          <el-button type="danger" size="mini"> 删除</el-button>
          <el-button type="success" size="mini">编辑</el-button></template
        >
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { reactive, ref } from "@vue/composition-api";
export default {
  setup(props, {}) {
    const value = ref("");
    const value1 = ref("");
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
    return {
      options,
      value,
      value1,
      input,
      formInline,
      tableData,
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
</style>