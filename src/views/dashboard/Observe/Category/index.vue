<template>
  <div>
    <el-card>
      <div class="header">
        <div class="category-header">
          <span>销售额占比</span>
          <el-radio-group v-model="value" size="mini">
            <el-radio-button label="全部渠道"></el-radio-button>
            <el-radio-button label="线上"></el-radio-button>
            <el-radio-button label="门店"></el-radio-button>
          </el-radio-group>
        </div>
      </div>
      <!-- 图 -->
      <div class="charts" ref="charts"></div>
    </el-card>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "category",
  data() {
    return {
      value: "全部渠道",
    };
  },
  mounted() {
    let piechart = echarts.init(this.$refs.charts);
    piechart.setOption({
      title: {
        text: "搜索引擎",
        subtext: "1048",
        left: "center",
        top: "center",
      },
      tooltip: {
        trigger: "item",
      },

      series: [
        {
          // name: "Access From",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 2,
          },
          label: {
            show: true,
            position: "outside",
          },

          labelLine: {
            show: true,
          },
          data: [
            { value: 1048, name: "搜索引擎" },
            { value: 735, name: "直接访问" },
            { value: 580, name: "邮件管理" },
            { value: 484, name: "联盟广告" },
            { value: 300, name: "视频广告" },
          ],
        },
      ],
    });

    piechart.on("mouseover", (params) => {
      // 获取鼠标移上去时的那条数据
      const { name, value } = params.data;
      piechart.setOption({
        title: {
          text: name,
          subtext: value,
        },
      });
    });
  },
};
</script>

<style scoped>
.header {
  border-bottom: solid 1px #eee;
}
.category-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.charts {
  width: 100%;
  height: 300px;
}
</style>