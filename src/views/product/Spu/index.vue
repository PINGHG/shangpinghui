<template>
  <div>
    <el-card style="margin: 20px 0">
      <CategorySelect
        @getCategoryId="getCategoryId"
        :show="scene == 0"
      ></CategorySelect>
    </el-card>
    <el-card>
      <div v-show="scene === 0">
        <!-- 展示spu列表 -->
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!category3Id"
          @click="addSpu"
          >添加spu</el-button
        >
        <el-table style="width: 100%" :data="records" border>
          <el-table-column
            type="index"
            label="序号"
            width="80px"
            align="center"
          >
          </el-table-column>
          <el-table-column prop="spuName" label="spu名称" width="width">
          </el-table-column>
          <el-table-column prop="description" label="spu描述" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row }">
              <hint-button
                type="success"
                size="mini"
                icon="el-icon-plus"
                title="添加sku"
                @click="addSku(row)"
              ></hint-button>
              <hint-button
                type="warning"
                size="mini"
                icon="el-icon-edit"
                title="修改spu"
                @click="updateSpu(row)"
              ></hint-button>
              <hint-button
                type="info"
                size="mini"
                icon="el-icon-info"
              ></hint-button>

              <el-popconfirm
                title="这是一段内容确定删除吗？"
                @onConfirm="deleteSpu(row)"
              >
                <hint-button
                  type="danger"
                  size="mini"
                  icon="el-icon-delete"
                  title="删除"
                  slot="reference"
                ></hint-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
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
      <SpuForm
        :prop="scene"
        v-show="scene === 1"
        @changeScene="changeScene"
        ref="spu"
        >添加/修改SPU</SpuForm
      >
      <SkuForm v-show="scene === 2" ref="sku">添加sku</SkuForm>
    </el-card>
  </div>
</template>

<script>
import SpuForm from "./spuForm.vue";
import SkuForm from "./skuForm.vue";
export default {
  name: "Spu",
  components: { SpuForm, SkuForm },
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      page: 1, //当前页
      limit: 5, //每页展示的数量
      records: [],
      total: 0,
      scene: 0, //0:展示列表，1：修改或添加spu，2：添加sku
    };
  },
  methods: {
    // 三级联动自定义事件的回调
    getCategoryId(cForm) {
      this.category1Id = cForm.category1Id;
      this.category2Id = cForm.category2Id;
      this.category3Id = cForm.category3Id;
      this.getSpuList();
    },
    // 获取Spu列表信息
    async getSpuList(pager = 1) {
      this.page = pager;
      const { page, limit, category3Id } = this;
      let result = await this.$API.spu.reqSpuList(page, limit, category3Id);
      if (result.code === 200) {
        console.log(result);
        this.total = result.data.total;
        this.records = result.data.records;
      }
    },
    //当前页发生改变
    handleCurrentChange(page) {
      this.page = page;
      this.getSpuList(page);
    },
    //每页展示数发生改变
    handleSizeChange(limit) {
      this.limit = limit;
      this.getSpuList();
    },

    // 修改spu
    updateSpu(row) {
      this.scene = 1;
      this.$refs.spu.initSpuData(row);
    },
    // 新增spu
    addSpu() {
      this.scene = 1;
      this.$refs.spu.addSpuData(this.category3Id);
    },
    //删除Spu
    async deleteSpu(row) {
      let result = await this.$API.spu.reqDeleteSpu(row.id);
      if (result.code === 200) {
        this.$message({
          type: "success",
          message: "删除成功",
        });
        this.getSpuList(this.records.length > 1 ? this.page : this.page - 1);
      }
    },
    // 新增sku
    addSku(row) {
      this.scene = 2;
      this.$refs.sku.getData(this.category1Id, this.category2Id, row);
    },
    // 自定义事件，取消返回展示列表
    changeScene({ scene, flag }) {
      //flag：区分修改、保存
      this.scene = scene;
      if (flag == "edit") {
        this.getSpuList(this.page);
      } else {
        this.getSpuList();
      }
    },
  },
};
</script>

<style>
</style>