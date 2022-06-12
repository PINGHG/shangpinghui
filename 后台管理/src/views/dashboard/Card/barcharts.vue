<template>
  <div class="charts" ref="charts"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "linechart",
  mounted() {
    let lineCharts = echarts.init(this.$refs.charts);
    lineCharts.setOption({
      xAxis: {
        show: false,
        type: "category",
      },
      yAxis: {
        show: false,
      },
      series: [
        {
          type: "bar",
          color: "skyblue",
          data: [10, 7, 18, 22, 22, 33, 13, 7, 15, 33, 12],
        },
      ],
      grid: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
      tooltip: {},
    });
  },
};
</script>

<style>
.charts {
  width: 100%;
  height: 100%;
}
</style>