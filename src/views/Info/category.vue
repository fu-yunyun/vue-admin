<template>
  <div id="category">
    <el-button
      type="danger"
      @click="CancleTwoCate({ button_type: 'category_first_add' })"
      >添加一级分类</el-button
    >
    <div class="hr"><hr /></div>
    <el-row :gutter="30">
      <el-col :span="8">
        <div class="category-warp">
          <div
            class="category"
            v-for="(item, index) in category.item"
            :key="index"
          >
            <!-- 一级分类 -->
            <h4>
              <svg-icon iconClass="add" className="add" />{{
                item.categoryName
              }}
              <div class="button-group">
                <el-button
                  size="mini"
                  type="danger"
                  round
                  @click="
                    editCategory({
                      categoryName: item.categoryName,
                      id: item.id,
                      button_type: 'category_first_modify',
                    })
                  "
                >
                  编辑
                </el-button>
                <el-button
                  size="mini"
                  type="success"
                  round
                  @click="
                    addChildrenCategory_status({
                      button_type: 'addChildrenCategory',
                      data: item,
                    })
                  "
                >
                  添加子级
                </el-button>
                <el-button size="mini" round @click="deleteCategory(item.id)">
                  删除
                </el-button>
              </div>
            </h4>
            <!-- 二级分类 -->
            <ul v-if="item.children">
              <li v-for="(childrenItem, index) in item.children" :key="index">
                {{ childrenItem.categoryName }}
                <div class="button-group">
                  <el-button
                    size="mini"
                    type="danger"
                    round
                    @click="
                      editChilrenCategory_status({
                        data: childrenItem,
                        button_type: 'category_chilren_edit',
                      })
                    "
                  >
                    编辑
                  </el-button>
                  <el-button
                    size="mini"
                    round
                    @click="delateChildenCategory(childrenItem)"
                  >
                    删除
                  </el-button>
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
              <el-input
                v-model="form.categoryName"
                :disabled="categoty_first_disabled"
              ></el-input>
            </el-form-item>
            <el-form-item label="二级分类名称:" v-if="TwoCateStatus">
              <el-input
                v-model="form.setcategoryName"
                :disabled="categoty_childred_disabled"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="danger"
                size="mini"
                @click="submit"
                :loading="isLoading"
                :disabled="submit_button_disabled"
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
import {
  addCategory,
  delteCategory_api,
  EditCategory,
  addChilrenCategory,
  deleteChilrenCategory_api,
  editChilrenCategory_api,
} from "../../api/news";
import { onMounted, reactive, ref, watch } from "@vue/composition-api";
import { common } from "@/api/common.js";
export default {
  setup(props, { root }) {
    // 基本数据类型
    const TwoCateStatus = ref(true);
    const isLoading = ref(false);
    const categoty_first_disabled = ref(true);
    const categoty_childred_disabled = ref(true);
    const submit_button_disabled = ref(true);
    const deleteId = ref();
    const submit_button_type = ref();
    const currentId_modify = ref();
    // 对象数据类型 ********************************************************************************************
    // input 框中内容
    const form = reactive({
      categoryName: "",
      setcategoryName: "",
    });
    // 加载自定义初始数据
    // const MyCategory = reactive({
    //   id: "0",
    //   categoryName: "默认一级标题",
    //   children: [],
    // });
    // 响应数据 结构
    const category = reactive({
      item: [],
      // current: [
      //   {
      //     categoryName: "sad",
      //     id: 1,
      //     children: [
      //       {
      //         categoryName: "sa",
      //         id: 1,
      //       },
      //     ],
      //   },
      // ],
    });
    // 定义子级数据请求
    const requestData_ChildrenCategory = reactive({
      categoryName: "",
      parentId: undefined,
      id: undefined,
    });
    // const arr = reactive({
    //   ii: [],
    // });
    // function ************************************************************************************************
    const { category: categoryItem, getInfoCategory } = common();
    // 生命周期 元素加载完成 接口请求未能完成
    onMounted(() => {
      // 获取服务器响应分类数据 其实就是将数据以正确的格式封住响应过来  == 自定义数据
      getInfoCategory();
      // 自定义数据类型 + 数据  本地存储实现
      // category.item.push(MyCategory);
      // if (cookie.get("data")) {
      //   const temp_data = JSON.parse(cookie.get("data")).ii;
      //   temp.value = temp_data.length;
      //   for (let i = 0; i < temp_data.length; i++) {
      //     arr.ii.push(temp_data[i]);
      //   }
      //   for (let j = 0; j < temp_data.length; j++) {
      //     category.item.push(JSON.parse(cookie.get("" + temp_data[j])));
      //   }
      // }
    });
    // 监听 获取分类中的信息
    watch(
      () => categoryItem.item,
      (value) => {
        category.item = value;
      }
    );
    //添加一级分类  修改输入框的可输入状态;
    const CancleTwoCate = (data) => {
      // 更改输入框及提交按钮状态
      categoty_first_disabled.value = false;
      submit_button_disabled.value = false;
      // 二级输入框隐藏
      TwoCateStatus.value = false;
      submit_button_type.value = data.button_type;
    };
    /*********************************请求添加一级分类标题+编辑************************************************ */
    const category_first_add = () => {
      if (form.categoryName == "") {
        root.$message.warning("一级分类不能为空");
        return false;
      }
      // 更改按钮状态
      isLoading.value = true;
      // 自定义temp数据充当临时 id
      // temp.value = temp.value + 1;
      // 定义数据类型;
      // const item = {
      //   id: "",
      //   categoryName: form.categoryName,
      //   children: [],
      // };
      // category.item.push(item);
      /***************************************** */
      // 本地存储实现数据的保存
      // 将存入数据的id存入数组当中;
      // arr.ii.push(item.id);
      // 将数组存入cookie中

      /* 选取对象中的数组的重要性
         !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
         因为在cookie中存入数据是会自动转换成字符串，字符串会带有存入数据的原本样式，更改极为麻烦
         对象中的数组的好处原因是 ： JSON有将字符串型的对象转化成对象 ，所以在cookie中存入数据后可以通过转换拿到对象，对象中就可以直接拿到数组
       */
      // cookie.set("data", JSON.stringify(arr));
      //自定义数据的存储,实现  数据的多存储，分类存储 会占用浏览器大量内存，但是关闭浏览器就会清除 cookie本地存储
      // cookie.set("" + item.id, JSON.stringify(item));
      /***************************************** */
      // 调用接口

      addCategory({ categoryName: form.categoryName })
        .then((response) => {
          let data = response.data;
          // 将返回的对象放入数组中
          category.item.push(data);

          if (response.code === 200) {
            root.$message({
              message: "一级分类请求成功,信息添加成功",
              type: "success",
            });
            // 在此处重新请求接口 ，实时更新数据 确定：多次请求服务器，消耗资源
            // getCategory();
            // 实时更新优化：在输入数据时将数据放入获取的数据格式中
            isLoading.value = false;
            // 重置表单
            form.categoryName = "";
          }
        })
        .catch((error) => {
          root.$message.error(error.msg);
          isLoading.value = false;
          // 重置表单
          form.categoryName = "";
        });
    };
    /**************************************删除子级标题******************************************** */
    const delateChildenCategory = (data) => {
      requestData_ChildrenCategory.id = data.id;
      requestData_ChildrenCategory.parentId = data.parentId;
      root.confirm({
        content: "确定删除当前信息，确认后将无法恢复!",
        trip: "警告",
        fn: confirmDelChildrenCategory, //回调确定删除方法
        catchfn: catchfn,
        // 给回调函数传入参数
        // msg: category_id,
      });
    };
    const confirmDelChildrenCategory = () => {
      deleteChilrenCategory_api(requestData_ChildrenCategory)
        .then((response) => {
          root.$message.success(response.msg);
          getInfoCategory();
        })
        .catch((error) => {
          root.$message.error(error.msg);
        });
    };
    /*************************************编辑子级分类 状态变更******************************************** */
    const editChilrenCategory_status = (data) => {
      requestData_ChildrenCategory.id = data.data.id;
      requestData_ChildrenCategory.parentId = data.data.parentId;
      // 填充编辑输入框内容
      form.setcategoryName = data.data.categoryName;
      // 更改输入框状态和提交按钮状态
      categoty_childred_disabled.value = false;
      submit_button_disabled.value = false;
      submit_button_type.value = data.button_type;
    };
    /***********************************编辑子级分类 接口调用 */
    const editChilrenCategory = () => {
      requestData_ChildrenCategory.categoryName = form.setcategoryName;
      console.o;
      if (form.setcategoryName == "") {
        root.$message.warning("输入内容不能为空");
        return false;
      } else {
        editChilrenCategory_api(requestData_ChildrenCategory)
          .then((response) => {
            root.$message.success(response.msg);
            getInfoCategory();
          })
          .catch((error) => {
            root.$message.warning(error.msg);
          });
      }
    };
    /*************************************添加子级分类 输入框状态更改******************************* */
    const addChildrenCategory_status = (data) => {
      // 更改输入框状态
      categoty_first_disabled.value = true;
      categoty_childred_disabled.value = false;
      submit_button_disabled.value = false;
      TwoCateStatus.value = true;
      form.categoryName = data.data.categoryName;
      // 设置按钮执行类型
      submit_button_type.value = data.button_type;
      // 获取一级目录id
      requestData_ChildrenCategory.parentId = data.data.id;
    };
    /*************************************添加子级接口请求***************************************** */
    const addChildrenCategory = () => {
      if (form.setcategoryName == "") {
        root.$message({
          message: "子级输入不能为空",
          type: "warning",
        });
      } else {
        // 填充子级目录
        requestData_ChildrenCategory.categoryName = form.setcategoryName;
        addChilrenCategory(requestData_ChildrenCategory)
          .then((response) => {
            root.$message({
              message: response.msg,
              type: "success",
            });
            // 重新请求页面
            getInfoCategory();
            // 清空输入框
            form.setcategoryName = "";
          })
          .catch((error) => {
            root.$message.error(error.msg);
            form.setcategoryName = "";
          });
      }
    };
    /***********************************  一级分类标题编辑    ************************************************ */
    const category_first_modify = () => {
      isLoading.value = true;
      if (form.categoryName == "") {
        root.$message({
          message: "未选择分类",
          type: "warning",
        });
        currentId_modify.value = "";
      } else if (currentId_modify.value == "") {
        root.$message({
          message: "请选中分类并单击编辑进行修改",
          type: "warning",
        });
      } else {
        // console.log(currentId_modify.value + " ---------" + form.categoryName);
        let requestData = {
          id: currentId_modify.value,
          categoryName: form.categoryName,
        };
        EditCategory(requestData)
          .then((response) => {
            root.$message({
              message: "修改成功",
              type: "success",
            });
            let data = category.item.filter(
              (item) => item.id == currentId_modify.value
            );
            data[0].categoryName = response.data.categoryName;
            // 清空输入框
            form.categoryName = "";
            isLoading.value = false;
          })
          .catch((error) => {
            root.$message.error("修改失败");
            // 清空输入框
            form.categoryName = "";
            currentId_modify.value = "";
            isLoading.value = false;
          });
      }
      isLoading.value = false;
    };
    /*************************submit*************************************** */
    const submit = () => {
      if (submit_button_type.value == "category_first_add") {
        category_first_add();
      } else if (submit_button_type.value == "category_first_modify") {
        category_first_modify();
      } else if (submit_button_type.value == "addChildrenCategory") {
        addChildrenCategory();
      } else if (submit_button_type.value == "category_chilren_edit") {
        editChilrenCategory();
      }
    };
    /**************************一级标题删除 start ************************************************************* */
    // 触发删除 提示
    const deleteCategory = (category_id) => {
      deleteId.value = category_id;
      // 引用全局方法 确定是否删除
      root.confirm({
        content: "确定删除当前信息，确认后将无法恢复!",
        trip: "警告",
        fn: confirmDel, //回调确定删除方法
        catchfn: catchfn,
        // 给回调函数传入参数
        // msg: category_id,
      });
    };

    /********************* 取消删除回调函数********************************* */
    const catchfn = () => {
      // 取消删除，清除id
      deleteId.value = "";
    };
    /************************确定删除 回调函数************************** */
    const confirmDel = () => {
      // 请求删除一级分类接口   通过id删除数据 自定义删除id，无需传入参数
      delteCategory_api({ id: deleteId.value })
        .then((response) => {
          // 方法一 ：
          // 数组操作实时渲染页面
          //splice(指定起始位置，删除个数，替换的数据):
          // 两个参数的时候是删除
          // 三个参数的时候是替换、插入

          // 通过删除的id查找元素在数组中的位置下标
          let index = category.item.findIndex(
            (item) => item.id == deleteId.value
          );
          category.item.splice(index, 1);
          // 过滤数组 过滤掉删除的id和数组内数据id相同的数据，即得到删除id之外的数据组成一个新的数组
          // let newData = category.item.filter((item) => item.id != deleteId.value);
          // category.item = newData;

          // 方法二 ；  重新调用getCategory()渲染页面  重新请求服务，占用资源
          console.log(response.msg);
          root.$message({
            message: response.msg,
            type: "success",
          });
        })
        .catch((error) => {
          let index = category.item.findIndex(
            (item) => item.id == deleteId.value
          );
          category.item.splice(index, 1);
          root.$message.error(error.msg);
        });
    };
    //*************************************一级标题删除请求  end  ******************************************** */
    /***************************************修改一级标题  start ********************************************* */
    // 修改一级分类   输入框的可输入状态 ，确定按钮的执行类型
    const editCategory = (data) => {
      categoty_childred_disabled.value = true;
      categoty_first_disabled.value = false;
      submit_button_disabled.value = false;
      // 二级输入框隐藏
      TwoCateStatus.value = false;
      // 填入输入框默认值
      form.categoryName = data.categoryName;
      // 修改提交操作的类型
      submit_button_type.value = data.button_type;
      // 导出id
      currentId_modify.value = data.id;
    };
    return {
      // 基本数据
      TwoCateStatus,
      isLoading,
      currentId_modify,
      // temp,
      deleteId,
      submit_button_type,
      // 输入框及提交按钮状态
      categoty_first_disabled,
      categoty_childred_disabled,
      submit_button_disabled,
      // 对象数据
      form,
      category,
      requestData_ChildrenCategory,
      // function
      CancleTwoCate,
      submit,
      deleteCategory,
      confirmDel,
      editCategory,
      addChildrenCategory,
      addChildrenCategory_status,
      delateChildenCategory,
      editChilrenCategory_status,
      editChilrenCategory,
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