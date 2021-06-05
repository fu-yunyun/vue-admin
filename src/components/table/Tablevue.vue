<template>
  <div class="Tablevue">
    <el-table
      :data="tableConfig.tableData"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange"
      ref="multipleTable"
    >
      <el-table-column type="selection" v-if="tableConfig.selection">
      </el-table-column>
      <template v-for="items in tableConfig.tHead">
        <!-- v-solt  -->
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
        <!-- ************************************************************************* -->
        <el-table-column
          :key="items.prop"
          :prop="items.prop"
          :label="items.label"
          v-else
        >
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>
<script>
import { onBeforeMount, reactive, watch } from "@vue/composition-api";
import {
  loadTableData_fn,
  tableData_l,
} from "@/components/table/loadTableData.js";

export default {
  name: "Tablevue",
  props: {
    config: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    const tableConfig = reactive({
      selection: false,
      tHead: [],
      tableData: [],
    });
    const { loadTableData, tableData_l } = loadTableData_fn();
    const handleSelectionChange = (selection) => {
      // 直接映射拿出id
      deleteInfoId.value = selection.map((item) => item.id);
      console.log(deleteInfoId.value);
    };
    const initTable = () => {
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
    watch(
      () => tableData_l.item,
      (newData, oldData) => {
        // 对通过loadTableData加载的接口数据进行监听，将获取的数据赋值给组件进行渲染的数组中
        tableConfig.tableData = newData;
      }
    );
    return {
      tableConfig,
      handleSelectionChange,
      initTable,
    };
  },
  /* 
      组件配置数据:  tableConfig{
      selection: boolean 配置表格是否含有选框,
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
};
</script>
<style scoped lange="scss">
div.el-table th {
  color: black !important;
}
</style>

