<template>
  <div>
    <el-row :gutter="5" class="overflow">
      <el-col :span="8">
        <el-select v-model="cityData.provinceValue" @change="handlerProvince">
          <el-option
            v-for="item in cityData.provinceData"
            :key="item.province_code"
            :value="item.province_code"
            :label="item.province_name"
          ></el-option
        ></el-select>
      </el-col>
      <!-- ****************************************************************** -->
      <el-col :span="8"
        ><el-select v-model="cityData.cityValue" @change="handlerCity">
          <el-option
            v-for="item in cityData.cityData"
            :key="item.city_code"
            :value="item.city_code"
            :label="item.city_name"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="8">
        <el-select v-model="cityData.areaValue" @change="handlerArea">
          <el-option
            v-for="item in cityData.areaData"
            :key="item.area_code"
            :value="item.area_code"
            :label="item.area_name"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { onBeforeMount, onMounted, watch } from "@vue/composition-api";
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
        () => resultData.provinceValue,
        () => resultData.cityValue,
        () => resultData.areaValue,
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