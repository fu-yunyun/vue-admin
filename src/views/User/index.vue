<template>
  <div class="user-warp">
    <el-row :gutter="16">
      <el-col :span="5">
        <Selectvue :config="selectConfig.item"></Selectvue>
      </el-col>
      <el-col :span="5">
        <el-input
          v-model="input"
          placeholder="请输入内容"
          class="pull-left"
        ></el-input>
      </el-col>
      <el-col :span="2">
        <el-button type="danger" style="width: 100%">搜索</el-button>
      </el-col>
      <el-col :span="12">
        <el-button type="danger" class="pull-right">添加用户</el-button>
      </el-col>
    </el-row>
    <div class="space-30"></div>
    <Tablevue :config="tableConfig">
      <template v-slot:status="slotData">
        <el-switch
          v-model="slotData.data.name"
          active-color="#13ce66"
          inactive-color="#ff4949"
        >
        </el-switch
      ></template>
      <template v-slot:operation="slotData">
        <el-button size="mini" type="danger" @click="operation(slotData.data)">
          删除
        </el-button>
        <el-button size="mini" type="success" @click="operation(slotData.data)">
          编辑
        </el-button>
      </template>
    </Tablevue>
  </div>
</template>

<script>
import { reactive, ref } from "@vue/composition-api";
import Selectvue from "@/components/select/Select.vue";
import Tablevue from "@/components/table/Tablevue.vue";
import requestUrl_api from "@/api/requestUrl.js";
export default {
  name: "userIndex",
  components: { Selectvue, Tablevue },
  setup(props, { root }) {
    const input = ref();
    const selectConfig = reactive({
      item: [
        {
          label: "姓名",
          value: "name",
        },
        {
          label: "手机号",
          value: "phone",
        },
        {
          label: "邮箱",
          value: "eamil",
        },
      ],
    });
    /*****************************************表格配置数据********************************************** */
    const tableConfig = reactive({
      selection: true,
      PaginationShow: true,
      // 配置获取用户列表信息接口数据
      requestJson: {
        // 配置接口请求方法
        requestMethod: "post",
        // 配置接口请求url
        requestUrl: requestUrl_api.getUserList,
        // 配置接口请求数据
        requestData: {
          pageSize: 5,
          pageNumber: 1,
        },
      },
      // 配置表头数据
      tHead: [
        {
          prop: "email",
          label: "用户名/邮箱",
        },
        {
          prop: "name",
          label: "真实姓名",
        },
        {
          prop: "phone",
          label: "手机号",
        },
        {
          prop: "address",
          label: "地址",
        },
        {
          prop: "role",
          label: "角色",
        },
        {
          prop: "status",
          label: "启用/禁用",
          slotName: "status",
          columnType: "solt",
        },
        {
          label: "操作",
          slotName: "operation",
          columnType: "solt",
        },
      ],
      // tableData数据可以从组件中进行接口调用获取，则不必再此页面进行数据的初始化，但是获取的tableData属性值需要和tHead中的属性值对应以便表格数据的渲染
      tableData: [
        {
          email: "233@qq.com",
          name: "张三",
          phone: "13828182912",
          address: "西安",
          role: "超管",
        },
        {
          email: "233@qq.com",
          name: "张三",
          phone: "13828182912",
          address: "西安",
          role: "超管",
        },
      ],
    });
    /*************************************************删除编辑******************************************* */
    const operation = (value) => {
      console.log(value);
    };
    return {
      input,
      selectConfig,
      tableConfig,
      operation,
    };
  },
};
</script>

<style scope lang="scss">
.label-warp {
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
.pull-left {
  float: left;
}
.space-30 {
  height: 30px;
}
</style>