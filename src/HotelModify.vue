<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>您当前的位置：</el-breadcrumb-item>
      <el-breadcrumb-item>酒店管理</el-breadcrumb-item>
      <el-breadcrumb-item>编辑酒店</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="main-content">
      <el-form size="small" :model="hotelModifyForm" label-width="140px" label-position="left">
        <el-form-item label="房型儿童年龄" v-for="(item, index) in editLimitChild.rootLimits" :key="index">
          <div class="dynamic-input-list clearfix">
            <div class="main-cont">
              <div class="dynamic-item clearfix">
                <div class="input-item">
                  <el-input v-model="item.startAge" class="dynamiclist-el-input" @change="eiditChildLimit(item,index,1)"></el-input>
                  <span style="padding: 0 5px;">到</span>
                  <el-input class="dynamiclist-el-input" v-model="item.endAge" @change="eiditChildLimit(item,index,1)"></el-input>
                  <span style="padding: 0 5px;">岁</span>
                </div>
                <div class="input-item">
                  <template>
                    <el-button size="mini" type="danger" icon="el-icon-close" circle v-if="index>0" @click="removeDomain(item,index,1)"></el-button>
                  </template>
                </div>
                <div class="btn-cont">
                  <el-button type="primary" @click="addRoomChildAge(item,1)">添加</el-button>
                </div>
              </div>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="交通儿童年龄" v-for="(item, index) in editLimitChild.trafficLimits" :key="index">
          <div class="dynamic-input-list clearfix">
            <div class="main-cont">
              <div class="dynamic-item clearfix">
                <div class="input-item">
                  <el-input v-model="item.startAge" @change="eiditChildLimit(item,index,2)" class="dynamiclist-el-input"></el-input>
                  <span style="padding: 0 5px;">到</span>
                  <el-input class="dynamiclist-el-input" v-model="item.endAge" @change="eiditChildLimit(item,index,2)"></el-input>
                  <span style="padding: 0 5px;">岁</span>
                </div>
                <div class="input-item">
                  <template>
                    <el-button size="mini" type="danger" icon="el-icon-close" circle v-if="index>0" @click="removeDomain(item,index,2)"></el-button>
                  </template>
                </div>
                <div class="btn-cont">
                  <el-button type="primary" @click="addRoomChildAge(item,2)">添加</el-button>
                </div>
              </div>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="膳食儿童年龄" v-for="(item, index) in editLimitChild.mealLimits" :key="index">
          <div class="dynamic-input-list clearfix">
            <div class="main-cont">
              <div class="dynamic-item clearfix">
                <div class="input-item">
                  <el-input v-model="item.startAge" class="dynamiclist-el-input" @change="eiditChildLimit(item,index,3)"></el-input>
                  <span style="padding: 0 5px;">到</span>
                  <el-input class="dynamiclist-el-input" v-model="item.endAge" @change="eiditChildLimit(item,index,3)"></el-input>
                  <span style="padding: 0 5px;">岁</span>
                </div>
                <div class="input-item">
                  <template>
                    <el-button size="mini" type="danger" icon="el-icon-close" circle v-if="index>0" @click="removeDomain(item,index,3)"></el-button>
                  </template>
                </div>
                <div class="btn-cont">
                  <el-button type="primary" @click="addRoomChildAge(item,3)">添加</el-button>
                </div>
              </div>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="选择目的地">
          <el-select style="margin-right: 10px;" placeholder="请选择国家或地区" v-model="hotelModifyForm.destinationId">
            <el-option v-for="(item,index) in alldestLists" :key="index" :label="item.destinationName" :value="item.destinationId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="酒店名称">
          <el-input style="width: 408px;" placeholder="请输入酒店名称" v-model="hotelModifyForm.hotelName"></el-input>
        </el-form-item>
        <el-form-item label="酒店星级">
          <el-select style="margin-right: 10px;" placeholder="酒店星级" v-model="hotelModifyForm.hotelLevel">
            <el-option label="三星级" value="3"></el-option>
            <el-option label="四星级" value="4"></el-option>
            <el-option label="五星级" value="5"></el-option>
            <el-option label="六星级" value="6"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="交易币种">
          <el-select style="margin-right: 10px;" placeholder="请选择交易币种" v-model="hotelModifyForm.currencyType">
            <el-option label="人民币" value="1"></el-option>
            <el-option label="美元" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="几岁以上允许入住">
          <el-input style="width: 150px;" placeholder="请输入年龄" v-model="hotelModifyForm.ageLimit"></el-input>
        </el-form-item>
        <el-form-item label="房型">
          <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange(checkedCities)">
            <el-checkbox v-for="city in house" :label="city.name" :key="city.id">{{city.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="混房费">
          <el-input style="width: 100px;" v-model="hotelModifyForm.mixedRoomDays"></el-input>
          <span style="padding: 0 5px;">晚以下，收取</span>
          <el-input style="width: 100px;" v-model="hotelModifyForm.mixedRoomCost"></el-input>
          <span style="padding: 0 5px;">混住订单混房费</span>
        </el-form-item>
        <el-form-item label="利润">
          <el-input style="width: 50px;" v-model="hotelModifyForm.oneNightProfit"></el-input>
          <span style="padding: 0 5px;">每晚房费附加利润</span>
        </el-form-item>
        <el-form-item label="环境税">
          <el-input style="width: 50px;" v-model="hotelModifyForm.envCost"></el-input>
          <span style="padding: 0 5px;">每天每人所附加的价格</span>
          <el-checkbox style="margin-left: 10px;" true-label="1" false-label v-model="hotelModifyForm.envCostType">只适用于儿童</el-checkbox>
        </el-form-item>
        <el-form-item label="节假日附加费(每人)">
          <div class="dynamic-input-list clearfix">
            <div class="main-cont">
              <div v-for="(item, index) in hotelModifyForm.holidayCosts" :key="index" class="dynamic-item clearfix">
                <div class="input-item">
                  <el-date-picker style="width: 150px;" type="date" :value-format="'timestamp'" v-model="item.startDate" placeholder="选择日期"></el-date-picker>
                  <span style="padding: 0 5px;">到</span>
                  <el-date-picker style="width: 150px;" type="date" :value-format="'timestamp'" v-model="item.endDate" placeholder="选择日期"></el-date-picker>
                  <span style="padding: 0 5px;">单位</span>
                  <el-select v-model="item.unitType" style="width: 150px;" placeholder="全部">
                    <el-option v-for="(item,index) in choseUnit" :key="index" :label="item.name" :value="item.id"></el-option>
                  </el-select>
                  <el-input v-if="item.unitType == 2" v-model="item.oneNightSurcharge" class="dynamiclist-el-input"></el-input>
                  <div v-if="item.unitType == 1" class="inlines">
                    <span style="padding: 0 5px;">餐标</span>
                    <el-select v-model="item.mealType" style="width: 150px;" placeholder="全部">
                      <el-option v-for="(item,index) in MealLabel" :key="index" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                    <span style="padding: 0 5px;">成人</span>
                    <el-input style="width: 50px;" v-model="item.adultCost"></el-input>
                    <span style="padding: 0 5px;" v-if="holidayChildStatus">儿童:</span>
                    <div v-if="holidayChildStatus" class="inlines">
                      <div class="inlines" v-for="(items, index) in item.holidayAgeVos" :key="index">
                        <el-input v-model="items.startAge" disabled="true" class="dynamiclist-el-input"></el-input>
                        <span style="padding: 0 5px;">到</span>
                        <el-input class="dynamiclist-el-input" disabled="true" v-model="items.endAge"></el-input>
                        <span style="padding: 0 5px;">岁</span>
                        <el-input class="dynamiclist-el-input" v-model="item.childCost"></el-input>
                        <!-- <el-input
                        class="dynamiclist-el-input"
                        v-if="!item.holidayAgeVos && !item.holidayAgeVos.length"
                        v-model="item.holidayAgeVos[index].childCost"
                        ></el-input>-->
                      </div>
                    </div>
                    <!-- <div v-for="(item,index) of item.holidayAgeVos" :key="index">
                      <el-input
                        class="dynamiclist-el-input"
                        v-model="item[index].childCost"
                      ></el-input>
                    </div>-->
                  </div>
                  <span style="padding: 0 5px;">价格是指定日期每天每人所附加的价格</span>
                </div>
                <div class="input-item">
                  <template>
                    <el-button size="mini" type="danger" icon="el-icon-close" circle v-if="index>0" @click="removeholidayCosts(item,index)"></el-button>
                  </template>
                </div>
                <div class="btn-cont margin-top">
                  <el-button type="primary" @click="addholidayCosts(item)">添加</el-button>
                </div>
              </div>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="特定时间段入住限制">
          <div class="dynamic-input-list clearfix">
            <div class="main-cont">
              <div v-for="(item, index) in hotelModifyForm.specialCosts" :key="index" class="dynamic-item clearfix margin-bottoms">
                <div class="input-item">
                  <el-date-picker style="width: 150px;" :value-format="'timestamp'" type="date" v-model="item.startDate" placeholder="选择日期"></el-date-picker>
                  <span style="padding: 0 5px;">到</span>
                  <el-date-picker style="width: 150px;" type="date" :value-format="'timestamp'" v-model="item.endDate" placeholder="选择日期"></el-date-picker>
                  <span style="padding: 0 5px;">最低</span>
                  <el-input style="width: 50px;" v-model="item.minDays"></el-input>
                  <span style="padding: 0 5px;">晚起住</span>
                </div>
                <div class="input-item">
                  <template>
                    <el-button size="mini" type="danger" icon="el-icon-close" circle v-if="index>0" @click="removespecialCosts(item,index)"></el-button>
                  </template>
                </div>
                <div class="btn-cont">
                  <el-button type="primary" @click="addspecialCosts()">添加</el-button>
                </div>
              </div>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="订单指向公司">
          <el-select style="margin-right: 10px;" v-model="hotelModifyForm.region" placeholder="选择公司">
            <el-option label="酒店集团1" value="shanghai"></el-option>
            <el-option label="酒店集团2" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="酒店logo">
          <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="酒店封面图">
          <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button @click="editHotel" type="primary">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
// import api from "../../config/api";
// import { join } from "path";
export default {
  name: "HotelModify",
  data() {
    return {
      hotelStatus: false,
      house: [{
          name: "水屋",
          id: 1
        },
        {
          name: "沙屋",
          id: 2
        }
      ],
      checkedCities: [],
      //节假日付费中的儿童 另外使用一个数组对象 和一个是否显示的状态
      holidayChild: [],
      holidayChildStatus: false,
      //餐标选择
      MealLabel: [{
          id: 1,
          name: "全部"
        },
        {
          id: 2,
          name: "其它"
        }
      ],
      choseUnit: [{
          id: 1,
          name: "每人"
        },
        {
          id: 2,
          name: "每间每晚"
        }
      ],
      formInline: {
        user: "",
        region: ""
      },
      alldestLists: [],
      // 修改 添加 儿童年龄
      editLimitChild: {
        //房型
        rootLimits: [{
          startAge: "",
          endAge: ""
        }],
        //交通
        trafficLimits: [{
          startAge: "",
          endAge: ""
        }],
        //膳食
        mealLimits: [{
          startAge: "",
          endAge: ""
        }]
      },
      /*
          添加 修改 酒店数据表单
        */
      hotelModifyForm: {
        /* 选择国家或地区 */
        hotelId: "",
        /* 目的地 */
        destinationId: "",
        /* 酒店名称 */
        hotelName: "",
        /* 酒店星级 */
        hotelLevel: "",
        /* 交易币种 */
        currencyType: "",
        /* 几岁以上允许入住 */
        ageLimit: "",
        /* 房型 */
        roomType: "",
        /* 混房费 天数 */
        mixedRoomDays: "",
        /* 混房费 费用 */
        mixedRoomCost: "",
        /* 利润 */
        oneNightProfit: "",
        /* 环境税 */
        envCost: "",
        /* 环境税 是否适用于儿童 */
        envCostType: "",
        // 酒店logo图片url地址
        hotelImages: "http:www.baidu.com",
        // 酒店封面图,多张用英文逗号","隔离开
        hotelLogo: "http:www.baidu.com",
        //节假日附加费
        holidayCosts: [{
          startDate: "", //开始日期
          endDate: "", //结束日期
          unitType: "", //节日附加费计算单位，1-每人，2-每间/每晚
          oneNightSurcharge: "", //unit_type=2时的每晚每间附加费
          mealType: "", // 餐标，1-全部，其他枚举讨论过后再添加
          adultCost: "", //成人每天的附加费，unit_type=1时可用
          //每个年龄段的节假日收费
          holidayRoomCost: [{
            childLimitId: "", //对应房型限制的数据id
            childCost: "" //花费
          }]
        }],
        //特定时间入住限制
        specialCosts: [{
          startDate: "", //开始时间
          endDate: "", //结束时间
          minDays: "" //最低起住天数
        }]
      }
    };
  },
  methods: {
    //测试 实时触发的值
    gottime(time) {
      console.log("item.startDate =" + time);
    },
    //删除特定时间入住限制
    removespecialCosts(item, index) {
      let index1 = this.hotelModifyForm.specialCosts.indexOf(item);
      this.hotelModifyForm.specialCosts.splice(index1, 1);
    },
    //添加特定时间入住限制
    addspecialCosts() {
      this.hotelModifyForm.specialCosts.push({
        startDate: "",
        endDate: "",
        minDays: ""
      });
    },
    //添加儿童年龄
    addRoomChildAge(item, order) {
      if (order == 1) {
        this.editLimitChild.rootLimits.push({
          startAge: "",
          endAge: ""
        });
      } else if (order == 2) {
        this.editLimitChild.trafficLimits.push({
          startAge: "",
          endAge: ""
        });
      } else if (order == 3) {
        this.editLimitChild.mealLimits.push({
          startAge: "",
          endAge: ""
        });
      }


    },
    //删除节假日付费
    removeholidayCosts(item, index) {
      let index1 = this.hotelModifyForm.holidayCosts.indexOf(item);
      this.hotelModifyForm.holidayCosts.splice(index1, 1);
    },
    //添加节假日付费
    addholidayCosts(item, inedx) {
      let holidayRoomCost = [];
      this.holidayChild.forEach(item => {
        holidayRoomCost.push({
          childLimitId: "",
          childCost: ""
        });
      });
      this.hotelModifyForm.holidayCosts.push({
        startDate: "",
        endDate: "",
        unitType: "",
        oneNightSurcharge: "",
        mealType: "",
        adultCost: "",
        holidayRoomCost: holidayRoomCost,
        holidayAgeVos: holidayRoomCost
      });
    },
    //编辑小孩年龄
    eiditChildLimit(item, index, order) {
      if (item.childLimitId != undefined) {
        this.editLimitInfo(
          order,
          item.startAge,
          item.endAge,
          3,
          item.childLimitId
        );
      } else {
        if (item.endAge != "" && item.startAge != "") {
          this.editLimitInfo(order, item.startAge, item.endAge, 1);
        }
      }
    },
    //删除小孩年龄
    removeDomain(item, index, oder) {
      if (item.childLimitId == undefined) {
        if (oder == 1) {
          this.editLimitChild.rootLimits.splice(index, 1);
        }
        if (oder == 2) {
          this.editLimitChild.trafficLimits.splice(index, 1);
        }
        if (oder == 3) {
          this.editLimitChild.mealLimits.splice(index, 1);
        }
      } else {
        let index1 = this.editLimitChild.rootLimits.indexOf(item);
        let index2 = this.editLimitChild.trafficLimits.indexOf(item);
        let index3 = this.editLimitChild.mealLimits.indexOf(item);
        if (item.limitType == 1) {
          if (index1 !== -1) {
            this.editLimitChild.rootLimits.splice(index1, 1);
            this.gotCheckId();
          }
        } else if (item.limitType == 2) {
          if (index2 !== -1) {
            this.editLimitChild.trafficLimits.splice(index2, 1);
          }
        } else if (item.limitType == 3) {
          if (index3 !== -1) {
            this.editLimitChild.mealLimits.splice(index3, 1);
          }
        }
        this.editLimitInfo(
          item.limitType,
          item.startAge,
          item.endAge,
          2,
          item.childLimitId
        );
      }
    },
    //通过酒店id查询酒店的基本信息接口
    gotCheckId() {
      // let url = api.host + "/hotel/hotelInfo/getHotelBase";
      // this.$http
      //   .get(url, {
      //     data: {
      //       hotelId: this.$route.query.hotelId
      //     }
      //   })
      //   .then(res => {
      // 这是假数据
      let res = { "code": 1000, "message": "SUCCESS", "data": { "hotelId": 44, "destinationId": 1, "hotelName": "2524242222222", "hotelLevel": 3, "currencyType": 1, "ageLimit": 66, "roomType": 2, "mixedRoomDays": 34, "mixedRoomCost": 33.00, "oneNightProfit": 34.00, "envCost": 34.00, "envCostType": 2, "hotelLogo": "https.www.baidu.com", "hotelImages": "https.www.baidu.com", "rootLimits": [{ "childLimitId": 227, "hotelId": 44, "limitType": 1, "startAge": 13, "endAge": 15 }, { "childLimitId": 235, "hotelId": 44, "limitType": 1, "startAge": 11, "endAge": 54 }], "trafficLimits": null, "mealLimits": null, "holidayCosts": [{ "startDate": "2019-10-29 00:00:00", "endDate": "2019-11-14 00:00:00", "unitType": 1, "oneNightSurcharge": null, "mealType": 1, "adultCost": 34.00, "holidayAgeVos": [{ "childLimitId": 227, "childCost": 34.00 }, { "childLimitId": 227, "childCost": 4.00 }, { "childLimitId": 227, "childCost": 17.00 }, { "childLimitId": 227, "childCost": 23.00 }] }, { "startDate": "2019-11-04 00:00:00", "endDate": "2019-11-15 00:00:00", "unitType": 1, "oneNightSurcharge": null, "mealType": 1, "adultCost": 32.00, "holidayAgeVos": [{ "childLimitId": null, "childCost": 15.00 }, { "childLimitId": 227, "childCost": 5.00 }, { "childLimitId": 227, "childCost": 18.00 }, { "childLimitId": 227, "childCost": 23.00 }] }], "specialCosts": [{ "startDate": "2019-11-14 00:00:00", "endDate": "2019-11-16 00:00:00", "minDays": 34 }] } };
      this.hotelModifyForm.hotelId = res.data.destinationId;
      this.hotelModifyForm = res.data;
      console.log("hou tai hou tiai -------");
      console.log(JSON.stringify(res));

      let test =

        //获取儿童年龄
        this.editLimitChild.rootLimits = res.data.rootLimits;
      this.editLimitChild.trafficLimits = res.data.trafficLimits;
      this.editLimitChild.mealLimits = res.data.mealLimits;
      //获取节假日附加费中的儿童
      this.holidayChild = JSON.parse(JSON.stringify(res.data.rootLimits));

      //儿童年龄没有值时对其赋空值
      if (this.editLimitChild.rootLimits == null) {
        this.editLimitChild.rootLimits = [];
        this.editLimitChild.rootLimits.push({
          startAge: "",
          endAge: ""
        });
      }

      if (this.editLimitChild.trafficLimits == null) {
        this.editLimitChild.trafficLimits = [];
        this.editLimitChild.trafficLimits.push({
          startAge: "",
          endAge: ""
        });
      }
      if (this.editLimitChild.mealLimits == null) {
        this.editLimitChild.mealLimits = [];
        this.editLimitChild.mealLimits.push({
          startAge: "",
          endAge: ""
        });
      }

      //对房型进行处理
      if (this.hotelModifyForm.roomType == null) {
        //this.hotelModifyForm.roomType = "";
        this.checkedCities = [];
        this.handleCheckedCitiesChange(this.checkedCities);
      }

      //节假日附加费中的儿童 当它为空时的处理
      if (this.holidayChild == null) {
        this.holidayChild = [];
        this.holidayChild.push({
          startAge: "",
          endAge: "",
          childCost: ""
        });
      } else {
        this.holidayChildStatus = true;
      }
      //这些类型返回null转换为字符串
      if (this.hotelModifyForm.hotelLevel == null) {
        this.hotelModifyForm.hotelLevel = "";
      }

      if (this.hotelModifyForm.currencyType == null) {
        this.hotelModifyForm.currencyType = "";
      }

      if (this.hotelModifyForm.ageLimit == null) {
        this.hotelModifyForm.ageLimit = "";
      }

      if (this.hotelModifyForm.mixedRoomDays == null) {
        this.hotelModifyForm.mixedRoomDays = "";
      }

      if (this.hotelModifyForm.mixedRoomCost == null) {
        this.hotelModifyForm.mixedRoomCost = "";
      }

      if (this.hotelModifyForm.oneNightProfit == null) {
        this.hotelModifyForm.oneNightProfit = "";
      }

      if (this.hotelModifyForm.envCost == null) {
        this.hotelModifyForm.envCost = "";
      }
      //节假日附加费没有值时对其赋空值
      //this.hotelModifyForm.holidayCosts = null;
      if (this.hotelModifyForm.holidayCosts == null) {
        this.hotelModifyForm.holidayCosts = [];
        this.hotelModifyForm.holidayCosts.push({
          startDate: "",
          endDate: "",
          unitType: "",
          oneNightSurcharge: "",
          mealType: "",
          adultCost: "",
          holidayRoomCost: [{
            childLimitId: "",
            childCost: ""
          }]
        });
      } else {
        //将节假日的开始时间和结束时间转换成时间戳
        let len = this.hotelModifyForm.holidayCosts.length;
        for (let i = 0; i < len; i++) {
          this.hotelModifyForm.holidayCosts[i].startDate = Date.parse(
            this.hotelModifyForm.holidayCosts[i].startDate
          );
          this.hotelModifyForm.holidayCosts[i].endDate = Date.parse(
            this.hotelModifyForm.holidayCosts[i].endDate
          );
        }
      }
      //特定时间入住限制没有值时对其赋空值
      if (this.hotelModifyForm.specialCosts == null) {
        this.hotelModifyForm.specialCosts = [];
        this.hotelModifyForm.specialCosts.push({
          startDate: "",
          endDate: "",
          minDays: ""
        });
      } else {
        //将特定时间段入住限的开始时间和结束时间转换成时间戳
        let specialCostsLen = this.hotelModifyForm.specialCosts.length;
        for (let i = 0; i < specialCostsLen; i++) {
          this.hotelModifyForm.specialCosts[i].startDate = Date.parse(
            this.hotelModifyForm.specialCosts[i].startDate
          );
          this.hotelModifyForm.specialCosts[i].endDate = Date.parse(
            this.hotelModifyForm.specialCosts[i].endDate
          );
        }
      }

      //将这些数字类型转为字段
      this.hotelModifyForm.hotelLevel = String(
        this.hotelModifyForm.hotelLevel
      );
      //  this.hotelModifyForm.hotelLevel = String(this.hotelModifyForm.hotelLevel);
      this.hotelModifyForm.currencyType = String(
        this.hotelModifyForm.currencyType
      );
      this.hotelModifyForm.ageLimit = String(this.hotelModifyForm.ageLimit);
      this.hotelModifyForm.mixedRoomDays = String(
        this.hotelModifyForm.mixedRoomDays
      );
      this.hotelModifyForm.mixedRoomCost = String(
        this.hotelModifyForm.mixedRoomCost
      );
      this.hotelModifyForm.oneNightProfit = String(
        this.hotelModifyForm.oneNightProfit
      );
      this.hotelModifyForm.envCost = String(this.hotelModifyForm.envCost);
      if (this.hotelModifyForm.roomType == "1") {
        this.checkediCities.push("沙屋");
      } else if (this.hotelModifyForm.roomType == "2") {
        this.checkedCities.push("水屋");
      } else if (this.hotelModifyForm.roomType == "3") {
        this.checkedCities.push("水屋");
        this.checkedCities.push("沙屋");
      }
      // });

      setTimeout(() => {
        this.updateData();
      }, 1000);
    },
    updateData() {
      if (this.hotelModifyForm.rootLimits != null) {
        // this.hotelModifyForm.rootLimits.forEach((item,index) => {
        //   console.log("item --- " + item.childLimitId);
        //   this.hotelModifyForm.holidayCosts.forEach((item2,index) => {
        //     if (!item2.holidayAgeVos || !item2.holidayAgeVos.length) {
        //       let arr = [];
        //       this.holidayChild.forEach(item3 => {
        //         arr.push({
        //           childLimitId: this.hotelModifyForm.rootLimits[index].childLimitId,
        //           childCost: ""
        //         });
        //       });
        //       item2.holidayAgeVos = arr;
        //     }
        //     if (
        //       item2.holidayAgeVos &&
        //       item2.holidayAgeVos.length <
        //         this.hotelModifyForm.rootLimits.length
        //     ) {
        //       item2.holidayAgeVos.forEach(item => {
        //          console.log("arr ----- ");
        //         if (item.childLimitId === null) {
        //           item.childLimitId = "";
        //         }
        //         if (item.childCost === null) {
        //           item.childCost = "";
        //         }
        //       });
        //       let arr = item2.holidayAgeVos;
        //       for (
        //         let i = item2.holidayAgeVos.length;
        //         i < this.hotelModifyForm.rootLimits.length;
        //         i++
        //       ) {
        //         arr.push({
        //           childLimitId: this.hotelModifyForm.rootLimits[index].childLimitId,
        //           childCost: ""
        //         });
        //       }
        //       item2.holidayAgeVos = arr;

        //       item2.holidayAgeVos.forEach(item => {
        //         item.childLimitId = item.childLimitId.toString();
        //         item.childCost = item.childCost.toString();
        //       });
        //     }
        //   });
        // });

        // this.hotelModifyForm.holidayCosts.forEach((item2,index) => {
        // if (!item2.holidayAgeVos || !item2.holidayAgeVos.length) {
        // let arr = [];
        // this.holidayChild.forEach((item3,index) => {
        //     arr.push({
        //         childLimitId: this.hotelModifyForm.rootLimits[index].childLimitId,
        //         childCost: ""
        //     });
        // });

        // item2.holidayAgeVos = arr;
        //  console.log("arr ----- "+ JSON.stringify(item2.holidayAgeVos));
        // }
        // if (
        //     item2.holidayAgeVos &&
        //     item2.holidayAgeVos.length <
        //     this.hotelModifyForm.rootLimits.length
        // ) {
        //     // item2.holidayAgeVos.forEach(item => {
        //     //     if (item.childLimitId === null) {
        //     //         item.childLimitId = "";
        //     //     }
        //     //     if (item.childCost === null) {
        //     //         item.childCost = "";
        //     //     }
        //     // });
        //     // let arr = item2.holidayAgeVos;
        //     // for (let i = item2.holidayAgeVos.length; i < this.hotelModifyForm.rootLimits.length; i++) {
        //     //     arr.push({
        //     //         childLimitId: this.hotelModifyForm.rootLimits[i].childLimitId,
        //     //         childCost: ""
        //     //     });
        //     // }

        //     // item2.holidayAgeVos = arr;
        //     // console.log("arr ----- "+ JSON.stringify(item2.holidayAgeVos));
        //     // item2.holidayAgeVos.forEach(item => {
        //     //     item.childLimitId = item.childLimitId.toString();
        //     //     item.childCost = item.childCost.toString();
        //     // });
        // }
        // });

        console.log("this.hotelModifyForm-----------");
        console.log(JSON.stringify(this.hotelModifyForm.holidayCosts));
      }
    },
    //增，删，改，酒店小孩年龄限制数据
    editLimitInfo(limitType, startAge, endAge, operateType, childLimitId) {
      startAge = Number(startAge);
      endAge = Number(endAge);
      // let url = api.host + "/hotel/hotelInfo/editLimitInfo";

      let data = {
        hotelId: this.$route.query.hotelId,
        limitType: limitType,
        startAge: startAge,
        endAge: endAge,
        operateType: operateType,
        childLimitId: childLimitId
        // limitType: 1,
        // startAge: 1,
        // endAge: 30,
        // operateType: 2
      };
      if (operateType != 1) {
        data.childLimitId = childLimitId;
      } else {
        delete data.childLimitId;
      }
      // this.$http.post(url, data).then(res => {
      //   this.gotCheckId();

      //实时获取房型儿童年龄的数据到节假日里面儿童中
      // this.hotelModifyForm.rootLimits.push({
      //     childLimitId: res.data,
      //     hotelId: this.$route.query.hotelId,
      //     limitType: limitType,
      //     startAge: startAge,
      //     endAge: endAge,
      //     operateType: operateType
      // });

      // this.holidayChild = JSON.parse(
      //   JSON.stringify(this.hotelModifyForm.rootLimits)
      // );
      // this.updateData();
      // this.holidayChild = JSON.parse(
      //   JSON.stringify(this.hotelModifyForm.rootLimits)
      // );
      // });
      //这是假数据
      let res = { "code": 1000, "message": "删除成功", "data": null };
    },
    //所有目的地接口
    alldestList() {
      //   let url = api.host + "/sys/destination/areaList";
      //   this.$http.post(url).then(res => {
      //     this.alldestLists = res.data;
      //   });
      // 这是假数据
      let res = { "code": 1000, "message": "SUCCESS", "data": [{ "destinationId": 1, "pid": null, "areaId": 100024, "destinationName": "马尔代夫000", "areaCode": "MDV", "areaName": null, "state": true, "createTime": "2019-11-21T09:44:31.000+0000", "creator": 4, "creatorName": null }, { "destinationId": 2, "pid": null, "areaId": 100024, "destinationName": "中转酒店", "areaCode": "MDV", "areaName": null, "state": true, "createTime": null, "creator": 3, "creatorName": null }, { "destinationId": 3, "pid": null, "areaId": 100024, "destinationName": "**岛", "areaCode": "MDV", "areaName": null, "state": false, "createTime": null, "creator": null, "creatorName": null }, { "destinationId": 4, "pid": null, "areaId": 100025, "destinationName": "苏梅", "areaCode": "SMM", "areaName": null, "state": true, "createTime": null, "creator": null, "creatorName": null }, { "destinationId": 7, "pid": null, "areaId": 100024, "destinationName": "谢谠恩的目的地3", "areaCode": "MDV", "areaName": null, "state": true, "createTime": "2019-11-22T02:51:37.000+0000", "creator": 4, "creatorName": null }] };
      this.alldestLists = res.data;
    },
    //提交酒店编辑信息接口
    editHotel() {

      //跳转到首页
      // this.$router.go(-1);
      this.hotelStatus = true;
      if (
        this.hotelModifyForm.envCostType == null ||
        this.hotelModifyForm.envCostType == ""
      ) {
        this.hotelModifyForm.envCostType = 2;
      }
      this.hotelModifyForm.hotelLogo = "https.www.baidu.com";
      this.hotelModifyForm.hotelImages = "https.www.baidu.com";

      //特定时间入住限制 传给后端前需要对其转换成字符串
      this.hotelModifyForm.specialCosts = JSON.stringify(
        this.hotelModifyForm.specialCosts
      );

      delete this.hotelModifyForm.rootLimits;
      delete this.hotelModifyForm.trafficLimits;

      //将这些字段转为数字类型
      this.hotelModifyForm.hotelLevel = Number(this.hotelModifyForm.hotelLevel);
      this.hotelModifyForm.currencyType = Number(
        this.hotelModifyForm.currencyType
      );
      this.hotelModifyForm.ageLimit = Number(this.hotelModifyForm.ageLimit);
      this.hotelModifyForm.mixedRoomDays = Number(
        this.hotelModifyForm.mixedRoomDays
      );
      this.hotelModifyForm.mixedRoomCost = Number(
        this.hotelModifyForm.mixedRoomCost
      );
      this.hotelModifyForm.oneNightProfit = Number(
        this.hotelModifyForm.oneNightProfit
      );

      this.hotelModifyForm.roomType = Number(this.hotelModifyForm.roomType);
      this.hotelModifyForm.envCost = Number(this.hotelModifyForm.envCost);

      //添加一个对象holidayRoomCost 然后把holidayAgeVos赋值给它
      let len1 = this.hotelModifyForm.holidayCosts.length;
      for (let i = 0; i < len1; i++) {
        if (this.hotelModifyForm.holidayCosts[i].holidayAgeVos != null) {
          let len2 = this.hotelModifyForm.holidayCosts[i].holidayAgeVos.length;

          this.hotelModifyForm.holidayCosts[
            i
          ].holidayRoomCost = this.hotelModifyForm.holidayCosts[
            i
          ].holidayAgeVos;
        }
      }

      //节假日附加费 传给后端前需要对其转换成字符串 暂时注释
      this.hotelModifyForm.holidayCosts = JSON.stringify(
        this.hotelModifyForm.holidayCosts
      );

      // return false

      //一秒钟之后调用编辑接口 最后打开
      setTimeout(() => {
        // let url = api.host + "/hotel/hotelInfo/editHotel";
        // let data = this.hotelModifyForm;

        // this.$http.post(url, data).then(res => {
        //   if (res.code == 1000) {
        //     this.$message({
        //       type: "success",
        //       duration: 1500,
        //       message: res.message
        //     });
        //   }
        // });
        //假数据
        let res = { "code": 1000, "message": "SUCCESS", "data": null };
      }, 500);
    },
    //监听checkbox事件
    handleCheckedCitiesChange(value) {
      value.forEach((val, index, arr) => {
        //回调函数中可以接受3个参数， 1.value值 2.索引 3.整个数组
        if (value.length == 2) {
          this.hotelModifyForm.roomType = 3;
        } else if (val == "水屋") {
          this.hotelModifyForm.roomType = 2;
        } else if (val == "沙屋") {
          this.hotelModifyForm.roomType = 1;
        } else {
          this.hotelModifyForm.roomType = "";
        }
      });
    }
  },
  created() {
    this.gotCheckId();
    this.alldestList();
  }
};

</script>
<style lang="less" scoped>
.dynamic-input-list {
  .main-cont {
    float: left;

    .dynamic-item {
      &:first-child {
        .input-item {
          margin-top: 0;
        }
      }
    }
  }

  .btn-cont {
    float: left;
  }

  .input-item {
    float: left;
    margin-top: 10px;
    margin-right: 10px;
  }

  .dynamiclist-el-input {
    width: 50px;
  }
}

.inlines {
  display: inline;
}

.margin-top {
  margin-top: 0.5rem;
}

.margin-top:first-child {
  margin-top: 0 !important;
}

.margin-bottoms {
  margin-bottom: 0.5rem;
}

</style>
