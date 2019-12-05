<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <div />

        <!-- 航班头部布局 -->
        <FlightsListHead />

        <!-- 航班信息 -->
        <FlightsItem v-for="(item,index) in dataList" :key="index" :flight="item" />

        <!-- 侧边栏 -->
        <div class="aside">
        <!-- 侧边栏组件 -->
        </div>
      </div>
    </el-row>
  </section>
</template>

<script>
import FlightsListHead from '@/components/air/flightsListHead'
import FlightsItem from '@/components/air/flightsItem'
export default {
  components: {
    FlightsListHead, FlightsItem
  },
  data () {
    return {
      flightsData: {}, // 航班总数据
      dataList: [] // 航班列表数据
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      this.$axios({
        url: 'airs',
        params: this.$route.query
      }).then((res) => {
        console.log(res)
        this.flightsData = res.data
        this.dataList = this.flightsData.flights
      })
    }
  }

}
</script>

<style>
    .contianer{
        width:1000px;
        margin:20px auto;
    }

    .flights-content{
        width:745px;
        font-size:14px;
    }

    .aside{
        width:240px;
    }
</style>
