<template>
  <div>
    <el-card style="margin: 20px 0">
      <CategorySelect
        @getCategoryId="getCategoryId"
        :show="isShowTable"
      ></CategorySelect>
    </el-card>
    <el-card>
      <div v-show="isShowTable">
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!category3Id"
          @click="addAttr"
          >添加属性</el-button
        >
        <el-table :data="attrList" style="width: 100%; margin: 10px 0" border>
          <el-table-column
            type="index"
            label="序号"
            width="80px"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="attrName"
            label="属性名称"
            width="150px"
            align="center"
          >
          </el-table-column>
          <el-table-column prop="prop" label="属性值列表" width="width">
            <template slot-scope="{ row }">
              <el-tag
                type="success"
                v-for="attrValue in row.attrValueList"
                :key="attrValue.id"
                style="margin: 0 10px"
                >{{ attrValue.valueName }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="150px">
            <template slot-scope="{ row }">
              <el-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                @click="updateAttr(row)"
              ></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="deleteAttr(row)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="!isShowTable">
        <el-form :inline="true" ref="form" label-width="80px">
          <el-form-item label="属性名">
            <el-input
              v-model="attrInfo.attrName"
              placeholder="请输入属性名"
            ></el-input>
          </el-form-item>
          <el-button
            type="primary"
            icon="el-icon-plus"
            @click="addAttrValue"
            :disabled="!attrInfo.attrName"
            >添加属性值</el-button
          >
        </el-form>

        <el-table
          :data="attrInfo.attrValueList"
          style="width: 100%; margin: 20px 0"
          border
        >
          <el-table-column
            type="index"
            label="序号"
            width="80px"
            align="center"
          >
          </el-table-column>
          <el-table-column prop="prop" label="属性值名称" width="width">
            <template slot-scope="{ row, $index }">
              <!-- span input 来回切换 -->
              <el-input
                v-model="row.valueName"
                placeholder="请输入属性值名称"
                size="mini"
                v-if="row.flag"
                @blur="toLook(row)"
                @keyup.native.enter="toLook(row)"
                :ref="$index"
              ></el-input>
              <span
                v-else
                @click="toEdit(row, $index)"
                style="display: block"
                >{{ row.valueName }}</span
              >
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <el-popconfirm
                :title="`确定删除${row.valueName}吗？`"
                @onConfirm="deleteAttrValue($index)"
                ><el-button
                  type="danger"
                  size="mini"
                  icon="el-icon-delete"
                  slot="reference"
                ></el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-button
          type="primary"
          @click="addOrUpdateAttr"
          :disabled="attrInfo.attrValueList.length < 1"
          >保存</el-button
        >
        <el-button @click="isShowTable = true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import cloneDeep from "lodash/cloneDeep";
import { reqDeleteAttr } from "@/api/product/attr";
export default {
  name: "Attr",
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      attrList: [],
      isShowTable: true,
      attrInfo: {
        attrName: "", //属性名
        attrValueList: [
          //属性值列表
        ],
        categoryId: 0, //三级分类id
        categoryLevel: 3,
      },
    };
  },
  methods: {
    // 自定义事件的回调
    getCategoryId(cForm) {
      this.category1Id = cForm.category1Id;
      this.category2Id = cForm.category2Id;
      this.category3Id = cForm.category3Id;
      this.getAttrList();
    },
    // 获取属性列表
    async getAttrList() {
      const { category1Id, category2Id, category3Id } = this;
      let result = await this.$API.attr.reqAttrList(
        category1Id,
        category2Id,
        category3Id
      );
      if (result.code === 200) {
        this.attrList = result.data;
      }
    },
    // 添加属性
    addAttr() {
      this.isShowTable = false;
      this.attrInfo = {
        attrName: "",
        attrValueList: [],
        categoryId: this.category3Id, //收集三级分类id
        categoryLevel: 3,
      };
    },
    // 添加属性值
    addAttrValue() {
      // 向属性值列表数组中添加元素
      this.attrInfo.attrValueList.push({
        attrId: this.attrInfo.id, //相应的属性名id
        valueName: "",
        flag: true, //用于切换查看模式和编辑模式，每个属性可以单独控制，而且是响应式数据(push可以被检测到)
      });
      this.$nextTick(() => {
        this.$refs[this.attrInfo.attrValueList.length - 1].focus();
      });
    },
    // 修改属性
    updateAttr(row) {
      this.isShowTable = false;
      // 数组里面套对象，需要深拷贝
      this.attrInfo = cloneDeep(row);
      // this.attrInfo = JSON.parse(JSON.stringify(row));//适用于一般数组和对象，存在丢失函数等问题
      // this.attrInfo = { ...row };//只拷贝一层
      this.attrInfo.attrValueList.forEach((item) => {
        // item.flag = false;//这样写可以给属性值加上flag字段，但不是响应式的
        this.$set(item, "flag", false);
      });
    },
    // 删除属性
    async deleteAttr(row) {
      await this.$API.attr.reqDeleteAttr(row.id);
      this.getAttrList();
    },
    // 失焦时由input切换为span
    toLook(row) {
      if (row.valueName.trim() == "") {
        this.$message("请输入一个正常的属性值");
        return;
      }
      let isRepeat = this.attrInfo.attrValueList.some((item) => {
        if (row !== item) {
          return row.valueName == item.valueName;
        }
      });
      if (isRepeat) {
        this.$message("请勿输入相同的属性值");
        return;
      }
      row.flag = false;
    },
    // 点击span切换为input并获取焦点
    toEdit(row, index) {
      row.flag = true;
      // 重绘重排需要时间，
      this.$nextTick(() => {
        this.$refs[index].focus();
      });
    },
    // 删除属性值
    deleteAttrValue(index) {
      this.attrInfo.attrValueList.splice(index, 1);
    },
    // 保存
    async addOrUpdateAttr() {
      // 整理参数 判断非空 删除flag字段
      this.attrInfo.attrValueList = this.attrInfo.attrValueList.filter(
        (item) => {
          if (item.valueName !== "") {
            delete item.flag;
            return true;
          }
        }
      );
      try {
        // 发请求
        await this.$API.attr.reqAddOrUpdateAttr(this.attrInfo);
        this.getAttrList();
        this.isShowTable = true;

        this.$message({ type: "success", message: "保存成功" });
      } catch (error) {
        this.$message({ type: "error", message: "保存失败" });
      }
    },
  },
};
</script>

<style>
</style>