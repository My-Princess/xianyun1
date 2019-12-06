<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <FlightsFilters :flightsData="cheachflightsData" @setDataList="setDataList" />

        <!-- 航班头部布局 -->
        <FlightsListHead />

        <!-- 航班信息 -->
        <FlightsItem v-for="(item,index) in dataList" :key="index" :flight="item" />
        <el-row type="flex" justify="center" style="margin-top:10px;">
          <!-- 分页  size-change:切换时触发。current-change：选页数触发。current-page当前页数。page-size：条数 total:总目数-->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageIndex"
            :page-sizes="[5, 10, 15]"
            :page-size="pageSize"
            :total="flightsData.total"
            layout="total, sizes, prev, pager, next, jumper"
          />
        </el-row>

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
import FlightsFilters from '@/components/air/flightsFilters'
export default {
  components: {
    FlightsListHead, FlightsItem, FlightsFilters
  },
  data () {
    return {
      pageIndex: 1, // 当前页数
      pageSize: 5, // 当前条数
      flightsData: {
        flights: [],
        info: {},
        options: {}
      },
      // 航班总数据
      // dataList: [] // 航班列表数据
      // 深拷贝一个新的不影响之前的
      cheachflightsData: {
        flights: [],
        info: {},
        options: {}
      }
    }
  },
  computed: {
    dataList () {
      const statenum = (this.pageIndex - 1) * this.pageSize
      const endnum = statenum + this.pageSize
      return this.flightsData.flights.slice(statenum, endnum)
    }
  },
  mounted () {
    this.getData()
  },
  updated () {
    console.log(this.flightsData)
  },
  methods: {
    // 总数据
    getData () {
      this.$axios({
        url: 'airs',
        params: this.$route.query
      }).then((res) => {
        console.log(res)
        this.flightsData = res.data
        // this.dataList = this.flightsData.flights
        this.cheachflightsData = { ...res.data }
        // this.setDataList()
      })
    },
    // 筛选分类
    // setDataList () {
    //   // 0,5  5,10, 10,15
    //   const statenum = (this.pageIndex - 1) * this.pageSize
    //   const endnum = statenum + this.pageSize
    //   this.dataList = this.flightsData.flights.slice(statenum, endnum)
    // },
    // 分页切换时
    handleSizeChange (val) {
      // console.log(val)
      this.pageSize = val
      this.pageIndex = 1
      // this.setDataList()
    },
    // 选页触发
    handleCurrentChange (val) {
      // console.log(val)
      this.pageIndex = val
      // this.setDataList()
    },
    setDataList (arr) {
      this.flightsData.flights = arr
      this.flightsData.total = arr.length
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
