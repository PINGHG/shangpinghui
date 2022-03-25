<template>
  <div>
    <el-table :data="records" style="width: 100%" border>
      <el-table-column type="index" label="序号" width="80px" align="center">
      </el-table-column>
      <el-table-column prop="skuName" label="名称" width="width" align="center">
      </el-table-column>
      <el-table-column prop="skuDesc" label="描述" width="width" align="center">
      </el-table-column>
      <el-table-column
        prop="prop"
        label="默认图片"
        width="120px"
        align="center"
      >
        <template slot-scope="{ row, $index }">
          <img :src="row.skuDefaultImg" style="width: 90px; height: 90px" />
        </template>
      </el-table-column>
      <el-table-column
        prop="weight"
        label="重量(Kg)"
        width="80px"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="price"
        label="价格(元)"
        width="80px"
        align="center"
      >
      </el-table-column>
      <el-table-column label="操作" width="width">
        <template slot-scope="{ row, $index }">
          <hint-button
            type="success"
            size="mini"
            icon="el-icon-sort-down"
            title="下架"
          ></hint-button>
          <hint-button
            type="info"
            size="mini"
            icon="el-icon-sort-up"
            title="上架"
          ></hint-button
          ><hint-button
            type="warning"
            size="mini"
            icon="el-icon-edit"
            title="修改"
          ></hint-button>
          <hint-button
            type="info"
            size="mini"
            icon="el-icon-info"
            title="查看"
          ></hint-button>
          <hint-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            title="删除"
          ></hint-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      style="text-align: center"
      :current-page="page"
      :page-sizes="[3, 5, 10]"
      :page-size="limit"
      layout=" prev, pager, next, jumper,->, sizes,total"
      :total="total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "Sku",
  data() {
    return {
      page: 1, //当前页
      limit: 5, //每页数
      records: [], //列表数据
      total: 0, //总数据条数
    };
  },
  mounted() {
    this.getSkuList();
  },
  methods: {
    //获取sku列表的方法
    async getSkuList(pager = 1) {
      const { page, limit } = this;
      let result = await this.$API.sku.reqSkuList(page, limit);
      if (result.code == 200) {
        this.total = result.data.total;
        this.records = result.data.records;
      }
    },
    //当前页发生改变
    handleCurrentChange(page) {
      this.page = page;
      this.getSkuList(page);
    },
    //每页展示数发生改变
    handleSizeChange(limit) {
      this.limit = limit;
      this.getSkuList();
    },
  },
};
</script>

<style>
</style>