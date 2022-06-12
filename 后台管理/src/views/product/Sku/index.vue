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
        <template slot-scope="{ row }">
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
        <template slot-scope="{ row }">
          <hint-button
            type="info"
            size="mini"
            icon="el-icon-sort-down"
            title="下架"
            @click="cancelSale(row)"
            v-if="row.isSale == 0"
          ></hint-button>
          <hint-button
            type="success"
            size="mini"
            icon="el-icon-sort-up"
            title="上架"
            @click="onSale(row)"
            v-else
          ></hint-button
          ><hint-button
            type="warning"
            size="mini"
            icon="el-icon-edit"
            title="修改"
            @click="edit"
          ></hint-button>
          <hint-button
            type="info"
            size="mini"
            icon="el-icon-info"
            title="查看"
            @click="getSkuInfo(row)"
          ></hint-button>
          <hint-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            title="删除"
            @click="deleteSku(row)"
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
    <!-- 抽屉 -->
    <el-drawer
      :visible.sync="drawer"
      direction="rtl"
      :show-close="false"
      size="50%"
      :before-close="handleClose"
    >
      <el-row>
        <el-col :span="5">名称</el-col>
        <el-col :span="16">{{ skuInfo.skuName }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">描述</el-col>
        <el-col :span="16">{{ skuInfo.skuDesc }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">价格</el-col>
        <el-col :span="16">{{ skuInfo.price }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">平台属性</el-col>
        <el-col :span="16">
          <el-tag
            type="success"
            v-for="attr in skuInfo.skuAttrValueList"
            :key="attr.id"
            style="margin-right: 10px"
            >{{ attr.attrName }}</el-tag
          >
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">商品图片</el-col>
        <el-col :span="16">
          <el-carousel height="300px">
            <el-carousel-item
              v-for="item in skuInfo.skuImageList"
              :key="item.id"
            >
              <img :src="item.imgUrl" style="width: 100%; height: 100%" />
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>
    </el-drawer>
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
      skuInfo: {}, //存储sku信息
      drawer: false, //抽屉显示
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

    // 上架
    async onSale(sku) {
      let result = await this.$API.sku.reqOnSale(sku.id);
      if (result.code == 200) {
        this.$message({
          type: "success",
          message: "上架成功",
        });
        sku.isSale = 0;
      }
    },

    // 下架
    async cancelSale(sku) {
      let result = await this.$API.sku.reqCancelSale(sku.id);
      if (result.code == 200) {
        this.$message({
          type: "success",
          message: "下架成功",
        });
        sku.isSale = 1;
      }
    },

    //修改
    edit() {
      this.$message("正在开发中");
    },
    // 删除
    async deleteSku(sku) {
      let result = await this.$API.sku.reqDeleteSku(sku.id);
      if (result.code == 200) {
        this.getSkuList(this.records.length > 0 ? this.page : this.page - 1);
      }
    },

    // 获取sku详情
    async getSkuInfo(sku) {
      let result = await this.$API.sku.reqSkuById(sku.id);
      if (result.code == 200) {
        this.skuInfo = result.data;
        this.drawer = true;
      }
    },

    // 抽屉关闭
    handleClose(done) {
      done();
    },
  },
};
</script>

<style scoped>
.el-row .el-col-5 {
  font-size: 18px;
  text-align: right;
}
.el-col {
  margin: 10px 10px;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>