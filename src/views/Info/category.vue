<template>
  <div id="category">
    <el-button type="danger" @click="CancleTwoCate">添加一级分类</el-button>
    <div class="hr"><hr /></div>
    <el-row :gutter="30">
      <el-col :span="8">
        <div class="category-warp">
          <div
            class="category"
            v-for="(item, index) in category.item"
            :key="index"
          >
            <h4>
              <svg-icon iconClass="add" className="add" />{{
                item.category_Name
              }}
              <div class="button-group">
                <el-button size="mini" type="danger" round> 编辑 </el-button>
                <el-button size="mini" type="success" round>
                  添加子级
                </el-button>
                <el-button size="mini" round> 删除 </el-button>
              </div>
            </h4>
            <ul v-if="item.children">
              <li v-for="(childrenItem, index) in item.children" :key="index">
                {{ childrenItem.category_Name }}
                <div class="button-group">
                  <el-button size="mini" type="danger" round> 编辑 </el-button>
                  <el-button size="mini" round> 删除 </el-button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </el-col>
      <el-col :span="16">
        <div class="category-right">
          <h4>一级分类编辑</h4>
          <el-form label-width="142px" class="w410">
            <el-form-item label="一级分类名称:">
              <el-input v-model="form.category_Name"></el-input>
            </el-form-item>
            <el-form-item label="二级分类名称:" v-if="TwoCateStatus">
              <el-input v-model="form.setcategory_Name"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="danger"
                size="mini"
                @click="submit"
                :loading="isLoading"
                >确定</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { addCategory, getCategory } from "../../api/news";
import { onMounted, reactive, ref } from "@vue/composition-api";
export default {
  setup(props, { root, refs }) {
    // 基本数据类型
    const TwoCateStatus = ref(true);
    const isLoading = ref(false);
    // 对象数据类型 ********************************************************************************************
    // input 框中内容
    const form = reactive({
      category_Name: "",
      setcategory_Name: "",
    });
    // 加载自定义初始数据
    const MyCategory = reactive({
      id: "0",
      category_Name: "默认初始一级标题",
      children: [
        {
          id: "0",
          category_Name: "默认初始二级标题,暂无数据",
        },
      ],
    });
    // 响应数据 结构
    const category = reactive({
      item: [],
    });
    // function ************************************************************************************************

    // 生命周期 元素加载完成 接口请求未能完成
    onMounted(() => {
      // 获取服务器响应分类数据 其实就是将数据以正确的格式封住响应过来  == 自定义数据
      getCategory()
        .then((response) => {
          let data = response.data.data;
          category.item = data;
        })
        .catch((error) => {
          root.$message.error("目的：获取一级分类请求失败");
        });
      // 自定义数据类型 + 数据
      category.item.push(MyCategory);
    });

    const CancleTwoCate = () => {
      TwoCateStatus.value = false;
    };

    // 提交一级分类请求 接口请求未能完成
    const submit = () => {
      if (form.category_Name == "") {
        root.$message.warning("一级分类不能为空");
        return false;
      }
      // 更改按钮状态
      isLoading.value = true;
      // 渲染增添数据 自定义 start ***********************************************************************************
      const item = {
        id: "0",
        category_Name: form.category_Name,
        children: [],
      };
      category.item.push(item);
      // 重置表单
      form.category_Name = "";
      // end  ****************************************************************************************************
      addCategory({ category_Name: "admin" })
        .then((response) => {
          let data = response.data.data;
          if (data.resCode === 0) {
            root.$message({
              message: "一级分类请求成功,信息添加成功",
              type: "success",
            });
            // 在此处重新请求接口 ，实时更新数据 确定：多次请求服务器，消耗资源
            // getCategory();
            // 实时更新优化：在输入数据时将数据放入获取的数据格式中
          }
        })
        .catch((error) => {
          root.$message.error("一级分类请求失败");
          isLoading.value = false;
        });
    };
    //********************************************************************************************************* */
    return {
      // 基本数据
      TwoCateStatus,
      isLoading,
      // 对象数据
      form,
      category,
      // function
      CancleTwoCate,
      submit,
    };
  },
};
</script>
 
<style lang="scss" scoped>
.category-right {
  line-height: 44px;
  padding-left: 22px;
  h4 {
    background-color: #f3f3f3;
    padding-left: 11px;
  }
  .w410 {
    width: 410px;
  }
  .el-form {
    margin-top: 22px;
  }
}
.category-warp {
  div:last-child {
    &::before {
      bottom: 23px;
    }
  }
}
.category {
  position: relative;
  line-height: 44px;
  &::before {
    content: "";
    position: absolute;
    top: 31px;
    bottom: -18px;
    left: 24px;
    width: 32px;
    border-left: 1px dotted black;
  }
  .button-group {
    display: none;
    float: right;
    font-size: 12px;
  }
  h4 {
    padding-left: 40px;
    svg {
      position: relative;
      top: 4px;
      left: -23px;
      font-size: 15px;
    }
  }

  ul li {
    padding-left: 40px;
    position: relative;
    margin-left: 25px;
    &:before {
      content: "";
      position: absolute;
      width: 32px;
      border-bottom: 1px dotted black;
      top: 20px;
      left: 0;
    }
  }
  li,
  h4 {
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    -ms-transition: all 0.3s;
    transition: all 0.3s;
    &:hover {
      background-color: #f7f7ff;
      .button-group {
        display: block;
      }
    }
  }
}
.hr {
  margin-top: 30px;
  margin-bottom: 30px;
  hr {
    box-sizing: border-box;
    margin-left: -30px;
    margin-right: -30px;
    background-color: #e9e9e9;
    height: 2px;
    border: 0;
  }
}
</style>