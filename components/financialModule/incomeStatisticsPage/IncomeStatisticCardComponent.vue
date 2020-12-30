<template>
  <div>
    <el-row>
      <el-col :span="16">
        <div id="chartA" style="width: 100%; height: 300px"></div>
      </el-col>
      <el-col :span="8">
        <div id="chartB" style="width: 100%; height: 300px"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>

export default {
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {
    echartsInit() {
      let incomeData = this.$store.state.statisticData.incomeStatistic;
      //收入
      let incomeArr = [];
      for (let i = 0 ; i < incomeData.length ; i ++) {
        incomeArr.push(incomeData[i].revenue);
      }
      console.log("incomeArr", incomeArr);
      //押金
      let depositArr = [];
      for (let i = 0 ; i < incomeData.length ; i ++) {
        depositArr.push(incomeData[i].deposit);
      }
      console.log("depositArr", depositArr);
      //到款
      let moneyArr = [];
      for (let i = 0 ; i < incomeData.length ; i ++) {
        moneyArr.push(incomeData[i].money);
      }
      console.log("moneyArr", moneyArr);
      //时间轴
      let dateArr = [];
      for (let i = 0 ; i < incomeData.length ; i ++) {
        dateArr.push(incomeData[i].year);
      }
      console.log("dateArr", dateArr);
      //最大收入和押金
      let maxIncome = 0;
      for (let i = 0 ; i < incomeArr.length ; i ++) {
        if(incomeArr[i] > maxIncome) {
          maxIncome = incomeArr[i];
        }
      }
      for (let i = 0 ; i < depositArr.length ; i ++) {
        if (depositArr[i] > maxIncome) {
          maxIncome = depositArr[i];
        }
      }
      //最大到款
      let maxMoney = 0;
      for (let i = 0 ; i < moneyArr.length ; i ++) {
        if(moneyArr[i] > maxMoney) {
          maxMoney = moneyArr[i];
        }
      }
      //年份到款饼图数据
      let pieData = [];
      for (let i = 0 ; i < dateArr.length ; i ++) {
        pieData.push(
          {
            value: moneyArr[i],
            name: dateArr[i]
          }
        );
      }
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999",
            },
          },
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        legend: {
          data: ["收入", "押金", "到款"],//收入 押金 到款
        },
        xAxis: [
          {
            type: "category",
            data: dateArr,
            axisPointer: {
              type: "shadow",
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "认款金额",
            min: 0,
            max: maxIncome,
            interval: Math.floor(maxIncome / 10),
            axisLabel: {
              formatter: "{value} 元",
            },
          },
          {
            type: "value",
            name: "到款金额",
            min: 0,
            max: maxMoney,
            interval: Math.floor(maxMoney / 10),
            axisLabel: {
              formatter: "{value} 元",
            },
          },
        ],
        series: [
          {
            name: "收入",
            type: "bar",
            data: incomeArr,
          },
          {
            name: "押金",
            type: "bar",
            data: depositArr,
          },
          {
            name: "到款",
            type: "line",
            yAxisIndex: 1,
            data: moneyArr,
          },
        ],
      };
      var myChartA = window.echarts.init(document.getElementById("chartA"));


      myChartA.setOption(option);
      let option2 = {
        title: {
          text: "到款统计饼图",
          left: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "50%",
            data: pieData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
      var myChartB = window.echarts.init(document.getElementById("chartB"));
      myChartB.setOption(option2);
    },
  },
  mounted() {
    this.echartsInit();
  },
};
</script>
<style>
.labelSty {
  line-height: 40px;
  text-align: center;
}

.rowSty {
  margin-top: 10px;
}
</style>
