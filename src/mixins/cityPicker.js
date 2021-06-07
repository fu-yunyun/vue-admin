import { reactive } from "@vue/composition-api";
import { getCityPicker_api } from "@/api/user.js";
export function cityPicker_mixin() {
    /**
  * 城市 遍历数据
  */
    const cityData = reactive({
        // 省份选中数据
        provinceValue: "",
        // 城市选中数据
        cityValue: "",
        areaValue: "",
        // 省份显示数据
        provinceData: [
            {
                province_code: "123",
                province_name: "省份",
            },
            {
                province_code: "13",
                province_name: "省份1",
            },
        ],
        // 城市显示数据
        cityData: [
            {
                city_code: "13",
                city_name: "城市",
            },
            {
                city_code: "12",
                city_name: "城市1",
            },
        ],
        // 区显示数据
        areaData: [
            {
                area_code: "123",
                area_name: "区域",
            },
        ],
    });
    /**
     * 获取省份数据
     */
    const GetProvince = () => {
        resetValue({ type: "province" });
        getCityPicker_api({ type: "province" })
            .then((response) => {
                console.log(response);
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
        getCityPicker_api({ type: "city", province_code: val })
            .then((response) => {
                console.log(response);
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
        getCityPicker_api({ type: "area", city_code: val })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log("area fail");
            });
    };
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

    }
    return {
        GetProvince,
        handlerCity,
        handlerProvince,
        resetValue,
        cityData,
    }
}