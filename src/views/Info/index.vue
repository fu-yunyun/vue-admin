<template>
  <div id="category-warp">
    <el-row :gutter="14">
      <el-col :span="4">
        <div class="label-warp category">
          <label for=""> 类别:</label>
          <div class="warp-content">
            <el-select
              v-model="categoryId"
              placeholder="请选择"
              style="width: 100%"
            >
              <el-option
                v-for="items in options.item"
                :key="items.id"
                :label="items.categoryName"
                :value="items.id"
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
              value-format="yyyy-MM-dd hh:mm:ss"
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
            <el-select v-model="formInline.key" style="width: 80%">
              <el-option label="id" value="id"></el-option>
              <el-option label="标题" value="title"></el-option>
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
        <el-button type="danger" style="width: 100%" @click="search"
          >搜索</el-button
        >
      </el-col>
      <!-- ******************************************************************************************** -->
      <el-col :span="2"> <p></p> </el-col>
      <!-- ******************************************************************************************** -->
      <el-col :span="2">
        <el-button
          type="danger"
          style="width: 100%"
          class="pull-right"
          @click="addInfo"
          >新增</el-button
        >
      </el-col>
      <!-- ******************************************************************************************** -->
    </el-row>
    <div class="space-30"></div>
    <!-- *************************************表格数据********************************************** -->
    <el-table
      :data="tableData.item"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange"
      ref="multipleTable"
    >
      <el-table-column type="selection" width="50"> </el-table-column>
      <el-table-column prop="title" label="标题" width="600"> </el-table-column>
      <el-table-column
        prop="categoryId"
        :formatter="toCategory"
        label="类别"
        width="100"
      >
      </el-table-column>
      <el-table-column prop="createTime" label="日期" width="200">
      </el-table-column>
      <el-table-column prop="admin" label="管理员" width="115">
      </el-table-column>
      <el-table-column label="操作">
        <!-- 表格中生成新的html需要template -->
        <template slot-scope="scope">
          <el-button type="danger" @click="del(scope.row)" size="mini">
            删除</el-button
          >
          <el-button type="success" size="mini" @click="editInfo(scope.row)"
            >编辑</el-button
          >
          <el-button
            type="success"
            size="mini"
            @click="detailCategory(scope.row)"
            >详细编辑</el-button
          ></template
        >
      </el-table-column>
    </el-table>
    <div class="space-30"></div>
    <!-- ****************************************************底部分页*********************************** -->
    <el-row>
      <el-col :span="12">
        <el-button size="medium" @click="delAll">批量操作</el-button>
      </el-col>
      <el-col :span="12">
        <el-pagination
          background
          @size-change="sizeChange"
          @current-change="currentChange"
          layout="total,sizes,prev, pager, next"
          :total="total"
          :page-size="page.pageSize"
          :page-sizes="[5, 10, 20, 50]"
        >
        </el-pagination>
      </el-col>
    </el-row>
    <!-- ***********************************************新增弹窗***************************************** -->
    <!-- 含逻辑更改时不易采用  -->
    <!-- 增加修饰器 :flag.sync="dialog_info"  不需要再调用close方法 -->
    <Diginfo
      :flag="dialog_info"
      @close="close"
      :category="options.item"
      :type="infoType"
      :id="infoId"
      @getList="getList"
    />
  </div>
  <!-- @getList相当于子组件中的属性，自组件中使用emit("属性值")，getList方法指调用父组件中的方法 -->
</template>

<script>
import { onMounted, reactive, ref, watch } from "@vue/composition-api";
import Diginfo from "./infoComponents/index.vue";
import { common } from "../../api/common";
import { getList_api, deleteInfo_api } from "@/api/news";
export default {
  name: "infoIndex",
  // 注册组件
  components: { Diginfo },
  setup(props, { root, refs }) {
    /*****************************基本数据定义********************************************** */
    const dialog_info = ref(false);
    const categoryId = ref("");
    const data_value = ref("");
    const input = ref("");
    const total = ref(100);
    const deleteInfoId = ref();
    const infoType = ref();
    const infoId = ref();
    const { getInfoCategory, category } = common();

    /* *******************************************对象数据定义 ******************************/
    const options = reactive({
      item: [],
    });
    const tableData = reactive({
      item: [
        // {
        //   title: "纽约市市长白思豪宣布退出总统竞选 特朗普发推特回应",
        //   category: "国内信息",
        //   date: "2016-05-02 12:00:00",
        //   user: "管理员",
        // },
      ],
    });
    const formInline = reactive({
      user: "",
      key: "id",
    });
    // 页面显示初始数据
    const page = reactive({
      pageNumber: 1,
      pageSize: 5,
    });
    /********************************** 转换表格数据类型 *********************************** */
    const toCategory = (row) => {
      let categorydata = options.item.filter(
        (item) => item.id == row.categoryId
      )[0];
      if (categorydata) return categorydata.categoryName;
    };
    /*******************************详细编辑************************************************* */
    const detailCategory = (row) => {
      console.log(row.id);
      // 提交数据至vuex
      root.$store.commit("SET_DETAILID", row.id);
      root.$router.push({
        name: "detailCategory",
      });
    };
    /**********************************搜索 *********************************************** */
    const search = () => {
      // console.log(categoryId.value);
      // console.log(data_value.value);
      // console.log(formInline.key);
      // console.log(input.value);
      // let requestData = formatData();
      getList();
    };
    /**********************************格式化请求数据 ************************************** */
    const formatData = () => {
      let requestData = {
        pageNumber: page.pageNumber, // 当前位置
        pageSize: page.pageSize, // 当前页面显示条数
      };
      if (categoryId.value) {
        requestData.categoryId = categoryId.value;
      }
      if (data_value.value.length > 0) {
        requestData.startTime = data_value.value[0];
        requestData.endTime = data_value.value[1];
      }
      // console.log(requestData[formInline.key] + " ------------" + input.value);
      // 关键字
      if (input.value) {
        requestData[formInline.key] = input.value;
      }
      // 类似于 requestData.id  || requestData.keyword = input.value
      return requestData;
    };

    /**********************************  获取列表数据  ************************************** */
    const getList = () => {
      // 获取格式化请求数据
      let requestData = formatData();
      getList_api(requestData)
        .then((response) => {
          // 将数据库中信息赋值给本地
          tableData.item = response.data.item;
          // 更新总页码
          total.value = response.data.total;
          // console.log(response.data.total);
        })
        .catch((error) => {
          root.$message.error(error.msg);
        });
    };
    /******************************  打开弹窗  ******************************************** */
    //编辑数据
    const editInfo = (row) => {
      dialog_info.value = true;
      // 获取需要编辑的id，获取该行数据渲染到弹窗页面
      infoId.value = row.id;
      // 设置弹窗执行类型
      infoType.value = "编辑";
    };
    //新增数据
    const addInfo = () => {
      dialog_info.value = true;
      infoType.value = "新增";
    };
    /*****************************  关闭弹窗   ******************************************* */
    const close = () => {
      dialog_info.value = false;
    };
    /************************* 删除信息提示 ************************************************ */
    const del = (row) => {
      deleteInfoId.value = [row.id];
      // console.log(row);  获取渲染表格列表的数组对象
      // console.log(index);  获取当前函数
      root.confirm({
        content: "确定当前删除",
        trip: "警告",
        fn: confirmDel,
      });
    };
    /************************** 删除全部信息提示 ************************************************** */

    const delAll = () => {
      if (!deleteInfoId.value || deleteInfoId.value.length == 0) {
        root.$message.error("所选数据不能为空");
        return false;
      } else {
        root.confirm({
          content: "确定删除所选信息",
          trip: "警告",
          fn: confirmDel,
        });
      }
    };
    /******************************批量删除 获得删除id************************************************* */
    const handleSelectionChange = (selection) => {
      // 直接映射拿出id
      deleteInfoId.value = selection.map((item) => item.id);
      console.log(deleteInfoId.value);
    };
    /*****************************************确认删除数据 执行删除接口*************************** */
    const confirmDel = () => {
      deleteInfo_api({ id: deleteInfoId.value })
        .then((response) => {
          deleteInfoId.value = "";
          refs.multipleTable.clearSelection();
          getList();
          root.$message({
            message: response.msg,
            type: "success",
          });
        })
        .catch((error) => {
          refs.multipleTable.clearSelection();
          deleteInfoId.value = "";
          root.$message.error(response.msg);
        });
    };
    /************************************页码更改function********************************* */
    // 每页显示条数改变
    const sizeChange = (val) => {
      page.pageSize = val;
      getList();
    };
    // 页码发生改变时
    const currentChange = (val) => {
      page.pageNumber = val;
      getList();
    };
    /*********************************生命周期 onmount *********************************** */
    onMounted(() => {
      // 获取分类标题
      getInfoCategory();
      // 获取列表信息
      getList();
    });
    /******************************function 定义 ***************************************** */
    //监听数据 获取分类
    watch(
      () => category.item,
      (value) => {
        options.item = value;
      }
    );
    /*******************************************数据返回******************************** */
    return {
      // ref
      categoryId,
      data_value,
      input,
      dialog_info,
      total,
      deleteInfoId,
      infoId,
      infoType,
      //   reactive
      options,
      formInline,
      tableData,
      page,
      // function
      editInfo,
      addInfo,
      close,
      del,
      delAll,
      confirmDel,
      sizeChange,
      currentChange,
      handleSelectionChange,
      search,
      formatData,
      toCategory,
      getList,
      detailCategory,
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