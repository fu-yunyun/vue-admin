<template>
  <div class="user-warp">
    <el-row :gutter="16">
      <el-col :span="5">
        <Selectvue
          :config="selectConfig.item"
          :selectValue.sync="selectConfig.selectValue"
        ></Selectvue>
      </el-col>
      <el-col :span="5">
        <el-input
          v-model="input"
          placeholder="请输入内容"
          class="pull-left"
        ></el-input>
      </el-col>
      <el-col :span="2">
        <el-button type="danger" style="width: 100%" @click="search"
          >搜索</el-button
        >
      </el-col>
      <el-col :span="12">
        <el-button type="danger" class="pull-right" @click="addUser"
          >添加用户</el-button
        >
      </el-col>
    </el-row>
    <div class="space-30"></div>
    <!-- table组件是包含分页的整个组件 -->
    <Tablevue :config="tableConfig" :TableList.sync="tableListData">
      <!-- 插槽 -->
      <template v-slot:status="slotData">
        <el-switch
          v-model="slotData.data.status"
          active-color="#13ce66"
          inactive-color="#ff4949"
          @change="handlerSwitch(slotData.data)"
          active-value="1"
          inactive-value="2"
        >
        </el-switch>
      </template>
      <template v-slot:operation="slotData">
        <el-button size="mini" type="danger" @click="del(slotData.data)">
          删除
        </el-button>
        <el-button size="mini" type="success" @click="edit(slotData.data)">
          编辑
        </el-button>
      </template>
      <!-- 批量删除 插槽  直接放在table组件中，将数据绑定在table组件上，通过触发方法来传回数据 -->
      <template v-slot:tableFooterLeft>
        <el-button size="medium" @click="delAll">批量操作</el-button>
      </template>
    </Tablevue>
    <!-- ****************************************************************************************** -->
    <AddUservue
      :dialog_info_flag.sync="addUserFlag"
      :checkBoxData.sync="tableConfig.checkBoxData"
      :boxStyle="title"
    />
  </div>
</template>

<script>
import { reactive, ref } from "@vue/composition-api";
import { delUser_api, searchUser_api, switchUser_api } from "@/api/user.js";
import Selectvue from "@/components/select/Select.vue";
import Tablevue from "@/components/table/Tablevue2.0+mixin.vue";
import requestUrl_api from "@/api/requestUrl.js";
import AddUservue from "./addUser.vue";
export default {
  name: "userIndex",
  components: { Selectvue, Tablevue, AddUservue },
  setup(props, { root }) {
    const input = ref();
    const addUserFlag = ref(false);
    const tableListData = ref();
    const deleteInfoId = ref();
    const title = ref();
    const selectConfig = reactive({
      selectValue: "",
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
          id: 2,
          email: "233@qq.com",
          name: "张三",
          phone: "13828182912",
          address: "西安",
          role: "UserAdmin",
          status: "1",
        },
        {
          id: 1,
          email: "233@qq.com",
          name: "张三",
          phone: "13828182912",
          address: "西安",
          role: "InfoAdmin",
          status: "2",
        },
      ],
      checkBoxData: {},
    });
    /**
     * 新增用户
     */
    const addUser = () => {
      console.log("add User excute");
      title.value = "新增用户";
      addUserFlag.value = true;
    };
    const edit = (row) => {
      console.log(row);
      title.value = "编辑信息";
      tableConfig.checkBoxData = row;
      addUserFlag.value = true;
    };
    /*************************************************删除编辑******************************************* */
    const del = (value) => {
      console.log(value.id);
      // 获取删除id
      deleteInfoId.value = [value.id];
      root.confirm({
        content: "确定删除当前信息",
        trip: "警告",
        fn: confirmDel,
      });
    };
    const delAll = () => {
      // console.log(tableListData.value);

      // console.log(deleteInfoId.value)
      if (!tableListData.value || tableListData.value.length == 0) {
        root.$message.error("所选数据不能为空");
        return false;
      } else {
        root.confirm({
          content: "确定删除所选信息",
          trip: "警告",
          fn: confirmDel,
        });
        // 获取删除数组的id
        deleteInfoId.value = tableListData.value.map((item) => item.id);
      }
    };
    /**
     * 删除执行
     */
    const confirmDel = () => {
      delUser_api({ id: deleteInfoId.value })
        .then((response) => {
          deleteInfoId.value = "";
          root.$message({
            message: response.msg,
            type: "success",
          });
        })
        .catch((error) => {
          deleteInfoId.value = "";
          root.$message.error(response.msg);
        });
    };
    /**
     * 启用禁用
     */
    const handlerSwitch = (val) => {
      let requestData = {
        status: val.status,
        id: val.id,
      };
      switchUser_api(requestData)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log("switch fail");
        });
    };
    /**
     * 搜索数据
     */
    const search = () => {
      let requestData = {
        searchType: selectConfig.selectValue,
        searchContent: input.value,
      };
      searchUser_api(requestData)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log("search fail");
        });
    };
    /**
     * 数据返回
     */
    return {
      input,
      title,
      addUserFlag,
      selectConfig,
      tableConfig,
      tableListData,
      confirmDel,
      del,
      addUser,
      delAll,
      handlerSwitch,
      edit,
      search,
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