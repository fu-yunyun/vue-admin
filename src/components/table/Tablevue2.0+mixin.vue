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
    <div class="space-30"></div>
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
import loadTableData_mixin from "@/mixins/loadTableData.js";
import pagination_mixin from "@/mixins/pagination.js";
export default {
  name: "Tablevue2.0",
  props: {
    config: {
      type: Object,
      default: () => {},
    },
  },
  mixins: [loadTableData_mixin, pagination_mixin],
  data() {
    return {
      tableConfig: {
        // 是否含有多选框
        selection: false,
        // 是否含有分页
        PaginationShow: false,
        // 表头数据
        tHead: [],
        // 表格数据
        tableData: [],
      },
    };
  },
  beforeMount() {
    this.initTable();
    // this.a();
  },
  methods: {
    initTable() {
      this.tableConfig.PaginationShow = this.config.PaginationShow;
      this.tableConfig.selection = this.config.selection;
      this.tableConfig.tHead = this.config.tHead;
      this.tableConfig.tableData = this.config.tableData;
    },
    // aa() {
    //   console.log("comp");
    // }, 值为对象 组件对象覆盖混入对象 只打印comp   与data相反
  },
};
</script>
<style scoped lange="scss">
div.el-table th {
  color: black !important;
}
.space-30 {
  height: 30px;
}
</style>
  