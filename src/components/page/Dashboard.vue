<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card shadow="hover" class="mgb20" style="height: 252px">
          <div class="user-info">
            <img src="../../assets/img/img.jpg" class="user-avator" alt />
            <div class="user-info-cont">
              <div class="user-info-name">{{ name }}</div>
              <div>{{ role }}</div>
            </div>
          </div>
          <div class="user-info-list">
            上次登录时间：
            <span>2022-09-09</span>
          </div>
          <div class="user-info-list">
            上次登录地点：
            <span>广州</span>
          </div>
        </el-card>
        <el-card shadow="hover" style="height: 252px">
          <div slot="header" class="clearfix">
            <span>语言详情</span>
          </div>
          Vue <el-progress :percentage="71.3" color="#42b983"></el-progress>JavaScript <el-progress :percentage="24.1" color="#f1e05a"></el-progress>CSS <el-progress :percentage="13.7"></el-progress>HTML
          <el-progress :percentage="5.9" color="#f56c6c"></el-progress>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-row :gutter="20" class="mgb20">
          <el-col :span="8">
            <el-card shadow="hover" :body-style="{ padding: '0px' }">
              <div class="grid-content grid-con-1">
                <i class="el-icon-lx-people grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">1234</div>
                  <div>用户访问量</div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="hover" :body-style="{ padding: '0px' }">
              <div class="grid-content grid-con-2">
                <i class="el-icon-lx-notice grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">321</div>
                  <div>系统消息</div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="hover" :body-style="{ padding: '0px' }">
              <div class="grid-content grid-con-3">
                <i class="el-icon-lx-goods grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">5000</div>
                  <div>数量</div>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-card shadow="hover" style="height: 403px">
          <div slot="header" class="clearfix">
            <span>待办事项</span>
            <el-button style="float: right; padding: 3px 0" type="text">添加</el-button>
          </div>
          <el-table :show-header="false" :data="todoList" style="width: 100%">
            <el-table-column width="40">
              <template slot-scope="scope">
                <el-checkbox v-model="scope.row.status"></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column>
              <template slot-scope="scope">
                <div class="todo-item" :class="{ 'todo-item-del': scope.row.status }">{{ scope.row.title }}</div>
              </template>
            </el-table-column>
            <el-table-column width="60">
              <template>
                <i class="el-icon-edit"></i>
                <i class="el-icon-delete"></i>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card shadow="hover">
          <schart ref="bar" class="schart" canvasId="bar" :options="options1" style="width: 600px; height: 400px"></schart>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover">
          <schart ref="line" class="schart" canvasId="line" :options="options2" style="width: 700px; height: 400px"></schart>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Schart from 'vue-schart'
import bus from '../common/bus'
export default {
  name: 'dashboard',
  data() {
    return {
      name: localStorage.getItem('ms_username'),
      todoList: [
        {
          title: '今天要修复100个bug',
          status: false
        }
      ],
      data: [
        {
          name: '2022/09/09',
          value: 1083
        }
      ],
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
      }
    }
  },
  components: {
    Schart
  },
  computed: {
    role() {
      return this.name === 'admin' ? '超级管理员' : '普通用户'
    }
  },

  methods: {
    changeDate() {
      const now = new Date().getTime()
      this.data.forEach((item, index) => {
        const date = new Date(now - (6 - index) * 86400000)
        item.name = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
      })
    }
  }
}
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}

.grid-content {
  display: flex;
  align-items: center;
  height: 100px;
}

.grid-cont-right {
  flex: 1;
  text-align: center;
  font-size: 14px;
  color: #999;
}

.grid-num {
  font-size: 30px;
  font-weight: bold;
}

.grid-con-icon {
  font-size: 50px;
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  color: #fff;
}

.grid-con-1 .grid-con-icon {
  background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
  color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
  background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
  color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
  background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
  color: rgb(242, 94, 67);
}

.user-info {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 2px solid #ccc;
  margin-bottom: 20px;
}

.user-avator {
  width: 120px;
  height: 120px;
  border-radius: 50%;
}

.user-info-cont {
  padding-left: 50px;
  flex: 1;
  font-size: 14px;
  color: #999;
}

.user-info-cont div:first-child {
  font-size: 30px;
  color: #222;
}

.user-info-list {
  font-size: 14px;
  color: #999;
  line-height: 25px;
}

.user-info-list span {
  margin-left: 70px;
}

.mgb20 {
  margin-bottom: 20px;
}

.todo-item {
  font-size: 14px;
}

.todo-item-del {
  text-decoration: line-through;
  color: #999;
}

.schart {
  width: 100%;
  height: 300px;
}
</style>
