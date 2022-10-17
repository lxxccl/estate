<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item> <i class="el-icon-pie-chart"></i> eschart图表 </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="schart-box" width="100%">
        <div class="content-title">柱状图</div>
        <schart class="schart" canvasId="bar" :options="options1" style="width: 1100px; height: 800px"></schart>
      </div>
      <div class="schart-box">
        <div class="content-title">折线图</div>
        <schart class="schart" canvasId="line" :options="options2" style="width: 1100px; height: 800px"></schart>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Schart from 'vue-schart'
import { reqSelect } from '@/api'
export default {
  name: 'basecharts',
  components: {
    Schart
  },
  data() {
    return {
      options1: {
        type: 'bar',
        title: {
          text: '广州近十年房地产行业投资以及销售价格情况'
        },
        bgColor: '#fbfbfb',
        labels: ['2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021'],
        datasets: [
          {
            label: '住宅商品房平均销售价格',
            fillColor: 'rgba(241, 49, 74, 0.5)',
            data: [12000.88, 14739, 13954, 24015, 14083, 27112, 16346, 17685, 21581.78]
          },

          {
            label: '房地产开发投资额',
            data: [1370.45, 1816.15, 1572.43, 3102.26, 2137.59, 3293.95, 2540.85, 2702.89, 2701.93]
          },

          {
            label: '房地产开发住宅投资额',
            data: [827.61, 994.9, 950.68, 2087.07, 1331.03, 2155.21, 1594.44, 1769.49, 1733.76]
          },

          {
            label: '商品房平均销售价格',
            data: [13162.67, 15719, 15330, 22363, 14612, 25056, 16384, 17633, 20013.6]
          }
        ]
      },
      options2: {
        type: 'line',
        title: {
          text: '广州近十年商品房平均销售价格情况'
        },
        bgColor: '#fbfbfb',
        labels: ['2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021'],
        datasets: [
          {
            label: '广州',
            data: [13162.67, 15719, 15330, 14612, 17633, 16384, 20013.6, 22363, 25056]
          },
          {
            label: '北京',
            data: [13553, 18553, 18833, 22633, 27497, 32140, 34142.89, 35905, 37665]
          },
          {
            label: '上海',
            data: [14061.37, 16420, 16787, 20949, 24747, 23804, 26890.08, 30677, 33798]
          }
        ]
      },

      year: '',
      city: '广州'
    }
  },
  created() {
    this.getData()
  },
  mounted() {
    this.getSaleData()
  },
  methods: {
    getData() {
      this.$store.dispatch('getSelectList', {
        year: this.year,
        city: this.city
      })
    }
  },
  computed: {
    ...mapState({
      SelectList: state => {
        return state.home.SelectList
      }
    })
  }
}
</script>

<style scoped>
.schart-box {
  display: inline-block;
  margin: 20px;
}
.schart {
  width: 600px;
  height: 400px;
}
.content-title {
  clear: both;
  font-weight: 400;
  line-height: 50px;
  margin: 10px 0;
  font-size: 22px;
  color: #1f2f3d;
}
</style>
