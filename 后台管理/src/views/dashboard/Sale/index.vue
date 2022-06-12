<template>
  <div>
    <el-card class="box-card">
      <!-- 头部 -->
      <div slot="header" class="clearfix">
        <!-- 头部左侧内容 -->
        <el-tabs class="tab" v-model="activeName">
          <el-tab-pane label="销售额" name="sale"></el-tab-pane>
          <el-tab-pane label="访问量" name="visit"></el-tab-pane>
        </el-tabs>
        <!-- 头部右侧内容 -->
        <div class="right">
          <span @click="setDay">今日</span>
          <span @click="setWeek">本周</span>
          <span @click="setMonth">本月</span>
          <span @click="setYear">本年</span>
          <el-date-picker
            class="date"
            v-model="date"
            value-format="yyyy-MM-dd"
            type="daterange"
            range-separator="—"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="mini"
          >
          </el-date-picker>
        </div>
      </div>
      <!-- 内容 -->
      <div>
        <el-row :gutter="10">
          <el-col :span="18">
            <barCharts :title="title"></barCharts>
          </el-col>
          <el-col :span="6">
            <div style="font-weight: bold">门店{{ title }}排名</div>
            <ul>
              <li>
                <span class="index topindex"> 1</span>
                <span class="shopname"> 肯德基</span>
                <span class="rvalue"> 123456 </span>
              </li>
              <li>
                <span class="index topindex">2</span>
                <span class="shopname"> 麦当劳</span>
                <span class="rvalue"> 123456 </span>
              </li>
              <li>
                <span class="index topindex">3</span>
                <span class="shopname"> 麦当劳</span>
                <span class="rvalue"> 123456 </span>
              </li>
              <li>
                <span class="index">4</span>
                <span class="shopname"> 麦当劳</span>
                <span class="rvalue"> 123456 </span>
              </li>
              <li>
                <span class="index">5</span>
                <span class="shopname"> 麦当劳</span>
                <span class="rvalue"> 123456 </span>
              </li>
              <li>
                <span class="index">6</span>
                <span class="shopname"> 麦当劳</span>
                <span class="rvalue"> 123456 </span>
              </li>
              <li>
                <span class="index">7</span>
                <span class="shopname"> 麦当劳</span>
                <span class="rvalue"> 123456 </span>
              </li>
            </ul>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
import barCharts from "./barCharts.vue";
import dayjs from "dayjs";

export default {
  name: "Sale",
  components: { barCharts },
  data() {
    return {
      activeName: "sale",
      date: [], //日历数组
    };
  },
  computed: {
    title() {
      return this.activeName == "sale" ? "销售额" : "访问量";
    },
  },
  methods: {
    setDay() {
      const day = dayjs().format("YYYY-MM-DD");
      this.date = [day, day];
    },
    setWeek() {
      const start = dayjs().day(1).format("YYYY-MM-DD");
      const end = dayjs().day(7).format("YYYY-MM-DD");
      this.date = [start, end];
    },
    setMonth() {
      const start = dayjs().startOf("month").format("YYYY-MM-DD");
      const end = dayjs().endOf("month").format("YYYY-MM-DD");
      this.date = [start, end];
    },
    setYear() {
      const start = dayjs().startOf("year").format("YYYY-MM-DD");
      const end = dayjs().endOf("year").format("YYYY-MM-DD");
      this.date = [start, end];
    },
  },
};
</script>

<style scoped>
.box-card {
  margin: 10px 0;
}
.tab {
  width: 100%;
}
.clearfix {
  position: relative;
  display: flex;
  justify-content: space-between;
}
.right {
  position: absolute;
  right: 0;
}
.date {
  width: 240px;
  margin: 0 20px;
}
.right span {
  margin: 10px;
}
.right span:hover {
  color: rgb(17, 173, 235);
}
ul {
  list-style: none;
  padding: 0;
  width: 100%;
  height: 300px;
}
ul li {
  height: 8%;
  width: 100%;
  margin: 10px 0;
}
.index {
  float: left;
  height: 20px;
  width: 20px;
  text-align: center;
  line-height: 20px;
}
.topindex {
  border-radius: 50%;
  background-color: black;
  color: #fff;
}
.shopname {
  margin: 0 20px;
}
.rvalue {
  float: right;
}
</style>