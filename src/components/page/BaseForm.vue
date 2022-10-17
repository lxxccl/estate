<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item> <i class="el-icon-lx-calendar"></i> 表单 </el-breadcrumb-item>
        <el-breadcrumb-item>基本表单</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="form-box">
        <el-form ref="insertOB" :inline="true" class="demo-form-inline">
          <el-form-item label="年份">
            <el-input v-model="insertOB.year"></el-input>
          </el-form-item>
          <el-form-item label="城市">
            <el-input v-model="insertOB.city"></el-input>
          </el-form-item>
          <el-form-item label="地区生产总值">
            <el-input v-model="insertOB.regional"></el-input>
          </el-form-item>
          <el-form-item label="住宅商品房平均销售价格">
            <el-input v-model="insertOB.houseAverage"></el-input>
          </el-form-item>
          <el-form-item label="住宅商品房销售面积">
            <el-input v-model="insertOB.houseArea"></el-input>
          </el-form-item>
          <el-form-item label="商品房平均销售价格">
            <el-input v-model="insertOB.commercialAverage"></el-input>
          </el-form-item>
          <el-form-item label="商品房销售面积">
            <el-input v-model="insertOB.commercialAarea"></el-input>
          </el-form-item>
          <el-form-item label="房地产开发投资额">
            <el-input v-model="insertOB.realestateInvestment"></el-input>
          </el-form-item>
          <el-form-item label="房地产开发住宅投资额" rows="4">
            <el-input v-model="insertOB.houseInvestment"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">提交</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'baseform',
  data() {
    return {
      year: '',
      city: '',
      insertOB: {
        year: '',
        city: '',
        regional: '',
        houseAverage: '',
        houseArea: '',
        commercialAverage: '',
        commercialAarea: '',
        realestateInvestment: '',
        houseInvestment: ''
      }
    }
  },
  methods: {
    getData() {
      this.$store.dispatch('getSelectList', {
        year: this.year,
        city: this.city
      })
    },

    onSubmit() {
      this.$store.dispatch('insList', this.insertOB)
      this.$message.success(`新增1条数据成功`)
      this.getData()
      this.$router.push('/table')
    }
  }
}
</script>
