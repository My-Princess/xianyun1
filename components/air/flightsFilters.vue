<template>
  <div class="filters">
    <el-row type="flex" class="filters-top" justify="space-between" align="middle">
      <el-col :span="8">
        单程：
        广州 - 上海
        /
        2019-06-17
      </el-col>
      <el-col :span="4">
        <el-select v-model="airport" @change="handleAirport" size="mini" placeholder="起飞机场">
          <el-option
            label="白云机场"
            value="白云机场"
          />
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select v-model="flightTimes" @change="handleFlightTimes" size="mini" placeholder="起飞时间">
          <el-option
            label="00:00 - 06:00"
            value="1"
          />
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select v-model="company" @change="handleCompany" size="mini" placeholder="航空公司">
          <el-option
            label="厦门航空"
            value="厦门航空"
          />
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select v-model="airSize" @change="handleAirSize" size="mini" placeholder="机型">
          <el-option
            label="大"
            value="大"
          />
        </el-select>
      </el-col>
    </el-row>
    <div class="filter-cancel">
      筛选：
      <el-button
        @click="handleFiltersCancel"
        type="primary"
        round
        plain
        size="mini"
      >
        撤销
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      airport: '', // 机场
      flightTimes: '', // 出发时间
      company: '', // 航空公司
      airSize: '' // 机型大小
    }
  },
  methods: {
    // 选择机场时候触发
    handleAirport (value) {

    },

    // 选择出发时间时候触发
    handleFlightTimes (value) {

    },

    // 选择航空公司时候触发
    handleCompany (value) {

    },

    // 选择机型时候触发
    handleAirSize (value) {

    },

    // 撤销条件时候触发
    handleFiltersCancel () {

    }
  }
}
</script>

<style scoped lang="less">
    .filters{
        margin-bottom:20px;
    }

    .filters-top{
        > div{
            /deep/ .el-select{
                margin-left:10px;
            }
        }
    }

    .filter-cancel{
        margin-top:10px;
    }
</style>
