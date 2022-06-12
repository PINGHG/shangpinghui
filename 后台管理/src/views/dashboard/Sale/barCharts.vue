<template>
  <div class="charts" ref="charts"></div>
</template>

<script>
import * as echarts from "echarts";
import { mapState } from "vuex";
export default {
  name: "barCharts",
  props: ["title"],
  data() {
    return {
      barCharts: null,
    };
  },
  computed: {
    ...mapState({
      listState: (state) => state.home.list,
    }),
  },
  mounted() {
    this.barCharts = echarts.init(this.$refs.charts);
    this.barCharts.setOption({
      title: {
        text: "销售额趋势",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: [
            "一月",
            "二月",
            "三月",
            "四月",
            "五月",
            "六月",
            "七月",
            "八月",
            "九月",
            "十月",
            "十一月",
            "十二月",
          ],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "Direct",
          type: "bar",
          barWidth: "60%",
          data: [10, 52, 200, 334, 390, 330, 220, 150, 200, 320, 160, 210],
        },
      ],
    });
  },
  // 监听属性
  watch: {
    title() {
      this.barCharts.setOption({
        title: {
          text: `${this.title}趋势`,
        },

        series: [
          {
            name: "Direct",
            type: "bar",
            barWidth: "60%",
            data:
              this.title == "销售额"
                ? this.listState.orderFullYear
                : this.listState.userFullYear,
          },
        ],
      });
    },
  },
};
</script>

<style scoped>
.charts {
  width: 100%;
  height: 300px;
}
</style>