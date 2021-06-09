<template>
  <div>
    <el-row :gutter="5" class="overflow">
      <el-col :span="8">
        <el-select v-model="cityData.provinceId" @change="handlerProvince">
          <el-option
            v-for="item in cityData.provinceData"
            :key="item.provinceCode"
            :value="item.provinceCode"
            :label="item.provinceName"
          ></el-option
        ></el-select>
      </el-col>
      <!-- ****************************************************************** -->
      <el-col :span="8"
        ><el-select v-model="cityData.cityId" @change="handlerCity">
          <el-option
            v-for="item in cityData.cityData"
            :key="item.cityCode"
            :value="item.cityCode"
            :label="item.cityName"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="8">
        <el-select v-model="cityData.areaId" @change="handlerArea">
          <el-option
            v-for="item in cityData.areaData"
            :key="item.areaCode"
            :value="item.areaCode"
            :label="item.areaName"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { onMounted, watch } from "@vue/composition-api";
import { cityPicker_mixin } from "@/mixins/cityPicker.js";
export default {
  name: "cityPicker",
  props: {
    cityPickerData: {
      type: Object,
      default: () => {},
    },
  },
  setup(props, { emit }) {
    const {
      GetProvince,
      handlerCity,
      handlerProvince,
      handlerArea,
      cityData,
      resultData,
    } = cityPicker_mixin();
    onMounted(() => {
      GetProvince();
    });
    watch(
      [
        () => resultData.provinceId,
        () => resultData.cityId,
        () => resultData.areaId,
      ],
      ([value1, value2, value3]) => {
        emit("update:cityPickerData", resultData);
      }
    );

    return {
      cityData,
      GetProvince,
      handlerProvince,
      handlerCity,
      handlerArea,
    };
  },
};
</script>
<style scoped lang="scss">
.overflow {
  overflow: hidden;
}
</style>