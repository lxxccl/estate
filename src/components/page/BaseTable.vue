<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item> <i class="el-icon-lx-cascades"></i> 数据显示 </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-button type="primary" icon="el-icon-delete" class="handle-del mr10" @click="delAllSelection">批量删除</el-button>
        <el-select v-model="year" filterable placeholder="年份" class="handle-select mr10">
          <el-option key="0" label="" value=""></el-option>
          <el-option key="1" label="2013" value="2013"></el-option>
          <el-option key="2" label="2014" value="2014"></el-option>
          <el-option key="3" label="2015" value="2015"></el-option>
          <el-option key="4" label="2016" value="2016"></el-option>
          <el-option key="5" label="2017" value="2017"></el-option>
          <el-option key="6" label="2018" value="2018"></el-option>
          <el-option key="7" label="2019" value="2019"></el-option>
          <el-option key="8" label="2020" value="2020"></el-option>
          <el-option key="9" label="2021" value="2021"></el-option>
        </el-select>
        <el-input v-model="city" placeholder="城市" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
      </div>

      <el-table :data="SelectList.slice((currentPage - 1) * PageSize, currentPage * PageSize)" border class="table" ref="multipleTable" header-cell-class-name="table-header" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
        <el-table-column prop="year" label="年份" align="center"></el-table-column>
        <el-table-column prop="city" label="城市" align="center"></el-table-column>
        <el-table-column prop="regional" label="地区生产总值（亿元）" align="center"></el-table-column>
        <el-table-column prop="houseAverage" label="住宅商品房平均销售价格（元）" align="center"></el-table-column>
        <el-table-column prop="houseArea" label="住宅商品房销售面积（元/平方）" align="center"></el-table-column>
        <el-table-column prop="commercialAverage" label="商品房平均销售价格（元）" align="center"></el-table-column>
        <el-table-column prop="commercialAarea" label="商品房销售面积（元/平方）" align="center"></el-table-column>
        <el-table-column prop="realestateInvestment" label="房地产开发投资额（万元）" align="center"></el-table-column>
        <el-table-column prop="houseInvestment" label="房地产开发住宅投资额（万元）" align="center"></el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes" :page-size="20" layout="total, sizes, prev, pager, next, jumper" :total="totalList"> </el-pagination>
      </div>
    </div>

    <!-- 编辑弹出框 -->
    <el-dialog title="修改" :visible.sync="editVisible" width="40%">
      <el-form ref="form" :inline="true" class="demo-form-inline">
        <el-form-item label="ID">
          <el-input v-model="form.id" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="年份">
          <el-input v-model="form.year"></el-input>
        </el-form-item>
        <el-form-item label="城市">
          <el-input v-model="form.city"></el-input>
        </el-form-item>
        <el-form-item label="地区生产总值（亿元）">
          <el-input v-model="form.regional"></el-input>
        </el-form-item>
        <el-form-item label="住宅商品房平均销售价格（元）">
          <el-input v-model="form.houseAverage"></el-input>
        </el-form-item>
        <el-form-item label="住宅商品房销售面积（元/平方）">
          <el-input v-model="form.houseArea"></el-input>
        </el-form-item>
        <el-form-item label="商品房平均销售价格（元）">
          <el-input v-model="form.commercialAverage"></el-input>
        </el-form-item>
        <el-form-item label="商品房销售面积（元/平方）">
          <el-input v-model="form.commercialAarea"></el-input>
        </el-form-item>
        <el-form-item label="房地产开发投资额（亿元）">
          <el-input v-model="form.realestateInvestment"></el-input>
        </el-form-item>
        <el-form-item label="房地产开发住宅投资额（亿元）">
          <el-input v-model="form.houseInvestment"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="submit" @click="saveEdit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'basetable',
  data() {
    return {
      year: '',
      city: '',
      // 默认显示第几页
      currentPage: 1,
      // 个数选择器（可修改）
      pageSizes: [20, 40, 60, 80, 100],
      // 默认每页显示的条数（可修改）
      PageSize: 20,
      delList: [],
      editVisible: false,
      pageTotal: 0,
      form: {},
      idx: -1,
      id: -1
    }
  },
  created() {
    this.getData()
  },

  methods: {
    getData() {
      this.$store.dispatch('getSelectList', {
        year: this.year,
        city: this.city
      })
    },

    // 触发搜索按钮
    handleSearch() {
      this.getData()
    },
    // 删除操作
    handleDelete(index, row) {
      // 二次确认删除
      this.$confirm('确定要删除吗？', '提示', {
        type: 'warning'
      })
        .then(() => {
          this.$store.dispatch('delList', row.id)
          this.$message.success('删除成功')
          this.getData()
        })
        .catch(() => {})
    },
    // 多选操作
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    delAllSelection() {
      const length = this.multipleSelection.length
      let str = ''
      this.delList = this.delList.concat(this.multipleSelection)
      for (let i = 0; i < length; i++) {
        str += this.multipleSelection[i].name + ' '
      }
      this.$message.error(`删除了${str}`)
      this.multipleSelection = []
    },
    // 编辑操作
    handleEdit(index, row) {
      this.idx = index
      this.form = row
      this.editVisible = true
    },
    // 保存编辑

    saveEdit() {
      this.$store.dispatch('updateList', this.form)
      this.editVisible = false
      this.$message.success(`修改第 ${this.idx + 1} 行成功`)
      this.getData()
    },
    // 分页导航
    // 每页显示的条数
    handleSizeChange(val) {
      // 改变每页显示的条数
      this.PageSize = val
      // 注意：在改变每页显示的条数时，要将页码显示到第一页
      this.currentPage = 1
    },
    // 显示第几页
    handleCurrentChange(val) {
      // 改变默认的页数
      this.currentPage = val
    }
  },
  computed: {
    ...mapState({
      totalList: state => {
        return state.home.SelectList.length
      },
      SelectList: state => {
        return state.home.SelectList
      }
    })
  }
}
</script>

<style scoped>
.handle-box {
  margin-bottom: 20px;
}

.handle-select {
  width: 120px;
}

.handle-input {
  width: 300px;
  display: inline-block;
}
.table {
  width: 100%;
  font-size: 14px;
}
.red {
  color: #ff0000;
}
.mr10 {
  margin-right: 10px;
}
.table-td-thumb {
  display: block;
  margin: auto;
  width: 40px;
  height: 40px;
}
</style>
