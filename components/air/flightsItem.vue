<template>
  <div class="flight-item">
    <div @click="headShow">
      <!-- 显示的机票信息 -->
      <el-row type="flex" align="middle" class="flight-info">
        <el-col :span="6">
          <span>{{ flight.airline_name }}</span>{{ flight.flight_no }}
        </el-col>
        <el-col :span="12">
          <el-row type="flex" justify="space-between" class="flight-info-center">
            <el-col :span="8" class="flight-airport">
              <strong>{{ flight.dep_time }}</strong>
              <span>{{ flight.org_airport_name }}</span>
            </el-col>
            <!-- 时间差 -->
            <el-col :span="8" class="flight-time">
              <span>{{ rankTime }}</span>
            </el-col>
            <el-col :span="8" class="flight-airport">
              <strong>{{ flight.arr_time }}</strong>
              <span>{{ flight.dst_airport_name }}</span>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="6" class="flight-info-right">
          ￥<span class="sell-price">{{ flight.seat_infos[0].org_settle_price_child }}</span>起
        </el-col>
      </el-row>
    </div>
    <div v-if="showRecommend" class="flight-recommend">
      <!-- 隐藏的座位信息列表 -->
      <el-row type="flex" justify="space-between" align="middle">
        <el-col :span="4">
          低价推荐
        </el-col>
        <el-col :span="20">
          <el-row
            v-for="(item,index) in flight.seat_infos"
            :key="index"
            type="flex"
            justify="space-between"
            align="middle"
            class="flight-sell"
          >
            <el-col :span="16" class="flight-sell-left">
              <span>{{ item.name }}</span> | {{ item.supplierName }}
            </el-col>
            <el-col :span="5" class="price">
              ￥{{ item.org_settle_price }}
            </el-col>
            <el-col :span="3" class="choose-button">
              <el-button
                @click="designate(flight.id,item.seat_xid)"
                type="warning"
                size="mini"
              >
                选定
              </el-button>
              <p>剩余：{{ item.discount }}</p>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  // props: { 'flight': Object },
  props: [ 'flight' ],
  data () {
    return {
      showRecommend: false // 列表默认收起
    }
  },
  computed: {
    // 计算出相差时间
    rankTime () {
      // 转换为分钟
      const dep = this.flight.dep_time.split(':')
      // console.log(dep)
      const arr = this.flight.arr_time.split(':')
      // console.log(arr)
      const stateTime = dep[0] * 60 + +dep[1]
      const endTime = arr[0] * 60 + +arr[1]

      // 到达时间的分钟相减得到分钟
      let dis = endTime - stateTime
      // 如果是凌晨时间段是负数，需要加24小时
      if (dis < 0) {
        dis = endTime + 24 * 60 - stateTime
      }
      // 得到时间差
      return `${Math.floor(dis / 60)}时${dis % 60}分`
    }
  },
  methods: {
    headShow () {
      this.showRecommend = !this.showRecommend
    },
    designate (id, xid) {
      this.$router.push({
        path: '/air/order',
        query: {
          id,
          seat_xid: xid
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
    .flight-item{
        border:1px #ddd solid;
        margin-bottom: 10px;

        .flight-info{
            padding:15px;
            cursor: pointer;

            > div{
                &:first-child, &:last-child{
                    text-align: center;
                }
            }
        }

        .flight-info-center{
            padding:0 30px;
            text-align: center;

            .flight-airport{
                strong{
                    display: block;
                    font-size:24px;
                    font-weight: normal;
                }
                span{
                    font-size: 12px;
                    color:#999;
                }
            }

            .flight-time{
                span{
                    display: inline-block;
                    padding:10px 0;
                    border-bottom: 1px #eee solid;
                    color:#999;
                }
            }
        }

        .flight-info-right{

            .sell-price{
                font-size: 24px;
                color:orange;
                margin:0 2px;
            }
        }
    }

    .flight-recommend{
        background: #f6f6f6;
        border-top:1px #eee solid;
        padding:0 20px;

        .flight-sell{
            border-bottom:1px #eee solid;
            padding:10px 0;

            &:last-child{
                border-bottom: none;
            }

            .flight-sell-left{
                font-size: 12px;
                span{
                    color:green;
                }
            }

            .price{
                font-size: 20px;
                color:orange;
            }

            .choose-button{
                text-align: center;
                color:#666;
                button{
                    display: block;
                    width:100%;
                    margin-bottom:5px;
                }
            }
        }
    }
</style>
