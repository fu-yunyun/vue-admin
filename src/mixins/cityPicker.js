import { reactive } from "@vue/composition-api";
import { getCityPicker_api } from "@/api/user.js";
export function cityPicker_mixin() {
    /**
  * 城市 遍历数据
  */
    const cityData = reactive({
        // 省份选中数据
        provinceId: "",
        // 城市选中数据
        cityId: "",
        areaId: "",
        // 省份显示数据
        provinceData: [],
        // 城市显示数据
        cityData: [],
        // 区显示数据
        areaData: [],
    });
    // 选中数据 返回给父组件
    const resultData = reactive({
        provinceId: "",
        cityId: "",
        areaId: "",
    })
    /**
     * 获取省份数据
     */
    const GetProvince = () => {
        resetValue({ type: "province" });
        getCityPicker_api({ type: "province" })
            .then((response) => {
                console.log(response);
                cityData.provinceData = response.data
            })
            .catch((error) => {
                console.log("获取省份 fail");
            });
    };
    /**
    * 选中省份 ，获取城市数据
    */
    const handlerProvince = (val) => {
        resetValue({ type: "province" });
        getCityPicker_api({ type: "city", provinceCode: val })
            .then((response) => {
                cityData.cityData = response.data
            })
            .catch((error) => {
                console.log("city fail");
            });
    };
    /**
    * 选中城市 获取区域数据
    */
    const handlerCity = (val) => {
        resetValue({ type: "city" })
        getCityPicker_api({ type: "area", cityCode: val })
            .then((response) => {
                cityData.areaData = response.data
            })
            .catch((error) => {
                console.log("area fail");
            });
    };
    /**
     * 区地址更改
     */
    const handlerArea = () => {
        result();
    }
    /**
     * 重置地区数据
     */
    const resetValue = (params) => {
        if (params.type == "province") {
            cityData.cityValue = "";
            cityData.areaValue = "";
        } else if (params.type == "city") {
            cityData.areaValue = "";
        }
        // 写法2： 
        /**
         *    const array = {
            province: ["cityValue", "areaValue"],
            city: ["areaValue"]
        }
        let NewArray = array[params.type];
        NewArray.forEach(element => {
            cityData[element] = ""
        });
         */
        // 获取更改后的值
        result();
    }
    const result = () => {
        for (let item in resultData) {
            resultData[item] = cityData[item]
        }
    }
    return {
        GetProvince,
        handlerCity,
        handlerProvince,
        resetValue,
        result,
        handlerArea,
        cityData,
        resultData
    }
}