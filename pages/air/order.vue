<template>
  <div class="container">
    <el-row type="flex" justify="space-between">
      <!-- 订单表单 -->
      <div class="main">
        <OrderForm :data="orderInfo" @changForm="setAside" />
      </div>

      <!-- 侧边栏 -->
      <OrderAside :data="orderInfo" :asideData="asideData" class="aside" />
    </el-row>
  </div>
</template>

<script>
import OrderForm from '@/components/air/orderForm'
import OrderAside from '@/components/air/orderAside'
export default {
  components: {
    OrderForm, OrderAside
  },
  data () {
    return {
      orderInfo: {
        seat_infos: {}
      },
      // 总价格
      asideData: {
        numUsers: 0, // 数量
        allprice: 0 // 金额
      }
    }
  },
  mounted () {
    const { query } = this.$route
    console.log(query)
    this.$axios({
      url: '/airs/' + query.id,
      params: {
        seat_xid: query.seat_xid
      }
    }).then((res) => {
    //   console.log(res)
      this.orderInfo = res.data
    })
  },
  methods: {
    setAside (asideData) {
      this.asideData = asideData
    }
  }

}
</script>

<style lang="less" scoped>
    .container{
        width:1000px;
        margin:20px auto;
    }

    /*aside*/
    .aside{
        width: 350px;
        height: fit-content;
        border:1px #ddd solid;
    }
</style>
