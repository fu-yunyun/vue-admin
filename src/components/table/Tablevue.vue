<template>
  <div class="Tablevue">
    <el-table :data="tableConfig.tableData" border style="width: 100%">
      <el-table-column type="selection" v-if="tableConfig.selection">
      </el-table-column>
      <template v-for="items in tableConfig.tHead">
        <!-- v-solt 插槽 -->
        <el-table-column
          :key="items.prop"
          :prop="items.prop"
          :label="items.label"
          v-if="items.columnType == 'solt'"
        >
          <template slot-scope="scope">
            <slot :name="items.slotName" :data="scope.row"> </slot>
          </template>
        </el-table-column>
        <!-- *************************  表头  *********************************** -->
        <el-table-column
          :key="items.prop"
          :prop="items.prop"
          :label="items.label"
          v-else
        >
        </el-table-column>
      </template>
    </el-table>
    <!-- *******************************************分页****************************************** -->
    <el-pagination
      v-if="tableConfig.PaginationShow"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="PageData.currentPage"
      :page-sizes="PageData.pageSizes"
      :page-size="PageData.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="PageData.pageTotal"
    >
    </el-pagination>
  </div>
</template>
<script>
import { onBeforeMount, reactive, watch } from "@vue/composition-api";
import { loadTableData_fn } from "@/components/table/loadTableData.js";
import { Pagination_fn } from "@/components/table/Pagination.js"
export default {
  name: "Tablevue",
  props: {
    config: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    // 声明组件渲染数据
    const tableConfig = reactive({
      // 是否含有多选框
      selection: false,
      // 是否含有分页
      PaginationShow: false,
      // 表头数据
      tHead: [],
      // 表格数据
      tableData: [],
    });
    // 调用逻辑数据获取调用接口方法和返回的tableData
    const { loadTableData, tableData_loaded } = loadTableData_fn();
    // 调用分页逻辑获取页码数据
    const { PageData, handleSizeChange, handleCurrentChange, toTotal } =
      Pagination_fn();

    // 初始化数据
    const initTable = () => {
      tableConfig.PaginationShow = props.config.PaginationShow;
      tableConfig.selection = props.config.selection;
      tableConfig.tHead = props.config.tHead;
      tableConfig.tableData = props.config.tableData;
      /*
       for(let key in props.config){
         if(tableConfig[key]){
           key = value
           tableConfig[key] = props.config[key]
         }
       }
      */
    };

    // 挂载前初始化组件数据
    onBeforeMount(() => {
      // 加载数据
      loadTableData(props.config.requestJson);
      // 渲染数据
      initTable();
    });
    // watch监听来自逻辑的数据进行赋值 单个监听
    // watch(
    //   () => tableData_loaded.item,
    //   (newData, oldData) => {
    //     // 对通过loadTableData加载的接口数据进行监听，将获取的数据赋值给组件进行渲染的数组中
    //     tableConfig.tableData = newData;
    //   }
    // );
    // 多数据监听   初始化表格数据和总条数
    watch(
      [() => tableData_loaded.item, () => tableData_loaded.pageTotal],
      ([tableData, Total]) => {
        tableConfig.tableData = tableData;
        toTotal(Total); //更改PageData数据中的total
      }
    );

    watch(
      //页码监听
      [() => PageData.currentPage, () => PageData.pageSize],
      ([currentPage, pageSize]) => {
        // 传入更改的页码数据进行分页请求
        props.config.requestJson.requestData.pageSize = pageSize;
        props.config.requestJson.requestData.pageNumber = currentPage;
        // 接口请求进行分页处理
        loadTableData(props.config.requestJson);
      }
    );
    // 数据返回
    return {
      tableConfig,
      PageData,
      handleSizeChange,
      handleCurrentChange,
      toTotal,
      initTable,
    };
  },
};
</script>
<style scoped lange="scss">
div.el-table th {
  color: black !important;
}
</style>
  /* 
      组件配置数据:  tableConfig{
      selection: boolean 配置表格是否含有选框 默认 false,
      PaginationShow: boolean 配置表格是否含有分页 默认为false
      tHead:[
          prop:"",
          label:""
      ],   表头数据 ，数组类型 ，内含prop属性和label值
            prop配置表头属性值，label配置表头显示值
      tableData:[
          tableConfig.tHead.prop:""
      ]         表格数据内容 ,内含prop键值对，prop属性必须和tHead中的属性值对应
  }
   */