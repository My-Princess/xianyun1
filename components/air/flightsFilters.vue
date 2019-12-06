<template>
  <div class="filters">
    <el-row type="flex" class="filters-top" justify="space-between" align="middle">
      <el-col :span="8">
        单程：
        {{ flightsData.info.departCity }} - {{ flightsData.info.destCity }}
        /
        {{ flightsData.info.departDate }}
      </el-col>
      <el-col :span="4">
        <el-select v-model="airport" @change="runFilters" size="mini" placeholder="起飞机场">
          <el-option
            v-for="(item,index) in flightsData.options.airport"
            :key="index"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select v-model="flightTimes" @change="runFilters" size="mini" placeholder="起飞时间">
          <el-option
            v-for="(item,index) in flightsData.options.flightTimes"
            :key="index"
            :label="`${item.from}:00 - ${item.to}:00`"
            :value="`${item.from},${item.to}`"
          />
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select v-model="company" @change="runFilters" size="mini" placeholder="航空公司">
          <el-option
            v-for="(item, index) in flightsData.options.company"
            :key="index"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select v-model="airSize" @change="runFilters" size="mini" placeholder="机型">
          <el-option
            v-for="(item,index) in sizeOptions"
            :key="index"
            :label="item.label"
            :value="item.value"
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
  props: ['flightsData'],
  data () {
    return {
      airport: '', // 机场
      flightTimes: '', // 出发时间
      company: '', // 航空公司
      airSize: '', // 机型大小
      sizeOptions: [
        //   每一个对象都是一个尺寸,包括了 label 跟 value
        { label: '大', value: 'L' },
        { label: '中', value: 'M' },
        { label: '小', value: 'S' }
      ]
    }
  },
  methods: {
    runFilters () {
      let newFlightsList = this.flightsData.flights
      if (this.airport) {
        newFlightsList = this.handleAirport(newFlightsList)
      }
      if (this.flightTimes) {
        newFlightsList = this.handleFlightTimes(newFlightsList)
      }
      if (this.company) {
        newFlightsList = this.handleCompany(newFlightsList)
      }
      if (this.airSize) {
        newFlightsList = this.handleAirSize(newFlightsList)
      }
      this.$emit('setDataList', newFlightsList)
    },
    // 选择机场时候触发
    handleAirport (value) {
      console.log(value)
      //   console.log(this.flightsData)
      const newFlightsList = value.filter((v) => {
        return v.org_airport_name === this.airport
      })
      return newFlightsList
    },

    // 选择出发时间时候触发
    handleFlightTimes (value) {
    //   console.log(value)
    //   const [from, to] = value.split(',')
      const newFlightsList = value.filter((v) => {
        const depTimeHour = +v.dep_time.split(':')[0]
        const before = +this.flightTimes.split(',')[0]
        const ofset = +this.flightTimes.split(',')[1]
        return depTimeHour >= before && depTimeHour < ofset
      })
      //   this.$emit('setDataList', arrList)
      return newFlightsList
    },

    // 选择航空公司时候触发
    handleCompany (value) {
      const newFlightsList = value.filter((v) => {
        return v.airline_name === this.company
      })
      //   this.$emit('setDataList', arr)
      return newFlightsList
    },

    // 选择机型时候触发
    handleAirSize (value) {
      const newFlightsList = value.filter((v) => {
        return v.plane_size === this.airSize
      })
      //   this.$emit('setDataList', arr)
      return newFlightsList
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
