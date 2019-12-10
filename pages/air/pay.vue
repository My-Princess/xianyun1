<template>
  <div class="container">
    <div class="main">
      <div class="pay-title">
        支付总金额
        <span class="pay-price">￥{{ orderData.price }}</span>
      </div>
      <div class="pay-main">
        <h4>微信支付</h4>
        <el-row type="flex" justify="space-between" align="middle" class="pay-qrcode">
          <div class="qrcode">
            <!-- 二维码 -->
            <canvas id="qrcode-stage" ref="refCanvas" />
            <p>请使用微信扫一扫</p>
            <p>扫描二维码支付</p>
          </div>
          <div class="pay-example">
            <img src="http://157.122.54.189:9093/images/wx-sweep2.jpg" alt>
          </div>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from 'qrcode'
export default {
  data () {
    return {
      orderData: {}
    }
  },
  watch: {
    '$store.state.user.userInfo.token' () {
      this.loadData()
    }
  },
  mounted () {
    console.log(QRCode)
    this.loadData()
  },
  methods: {
    // 付款状态
    checkPayStatus () {
      const token = this.$store.state.user.userInfo.token
      this.$axios({
        url: '/airorders/checkpay',
        method: 'post',
        data: {
          id: this.orderData.id, // 订单id
          nonce_str: this.orderData.price, // 金额
          out_trade_no: this.orderData.orderNo // 订单编号
        },
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
        .then((res) => {
          console.log(res)
          if (res.data.trade_state === 'NOTPAY') {
            setTimeout(() => {
              this.checkPayStatus()
            }, 3000)
          } else {
            // SUCCESS—支付成功
            // REFUND—转入退款
            // NOTPAY—未支付
            // CLOSED—已关闭
            // REVOKED—已撤销（付款码支付）
            // USERPAYING--用户支付中（付款码支付）
          // PAYERROR--支付失败(其他原因，如银行返回失败)
            if (res.data.trade_state === 'REFUND') {
              this.$message({
                message: '转入退款',
                type: 'info'
              })
            }
            if (res.data.trade_state === 'CLOSED') {
              this.$message({
                message: '未支付',
                type: 'info'
              })
            }
            if (res.data.trade_state === 'REVOKED') {
              this.$message({
                message: '已撤销',
                type: 'info'
              })
            }
            if (res.data.trade_state === 'USERPAYING') {
              this.$message({
                message: '支付中',
                type: 'info'
              })
            }
            if (res.data.trade_state === 'PAYERROR') {
              this.$message({
                message: '支付失败',
                type: 'info'
              })
            }
            if (res.data.trade_state === 'SUCCESS') {
              this.$message({
                message: '支付成功',
                type: 'info'
              })
              // this.$route.push({
              //   path:""
              // })
            }
          }
        })
        .catch((err) => {
          console.log(1111)
          console.log(err)
        })
    },
    // 订单详情
    loadData () {
      const { id } = this.$route.query
      const token = this.$store.state.user.userInfo.token
      console.log(id)
      console.log(token)
      this.$axios({
        url: `airorders/${id}`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((res) => {
          console.log(22222)
          console.log(res)
          this.orderData = res.data
          // const stage = document.getElementById('qrcode-stage')
          const stage = this.$refs.refCanvas
          QRCode.toCanvas(stage, this.orderData.payInfo.code_url, {
            width: 200
          })
          this.checkPayStatus()
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>

<style scoped lang="less">
.container {
  background: #f5f5f5;
  padding: 30px 0;

  .main {
    width: 1000px;
    margin: 0 auto;

    .pay-title {
      text-align: right;
      span {
        font-size: 28px;
        color: orangered;
      }
    }

    .pay-main {
      background: #fff;
      margin-top: 10px;
      border-top: 5px orange solid;
      padding: 30px;

      h4 {
        font-size: 28px;
        font-weight: normal;
        margin-bottom: 10px;
      }

      .pay-qrcode {
        padding: 0 80px;
      }

      .qrcode {
        border: 1px #ddd solid;
        padding: 15px;
        height: fit-content;

        #qrcode-stage {
          width: 200px;
          height: 200px;
          margin-bottom: 10px;
        }

        p {
          line-height: 2;
          text-align: center;
        }
      }
    }
  }
}
</style>
