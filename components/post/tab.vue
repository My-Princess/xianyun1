<template>
  <div class="tabsbox">
    <div class="tab">
      <!-- :class="{rightnone:righ=tnone}" -->
      <!-- :class="[(rightnone==index) ? 'rightnones' : 'rightshows']" -->
      <!-- :class="{rightnones:(rightnone==index), rightshows:(rightnones==index)}" -->
      <li
        ref="domList"
        v-for="(item,index) in cityData"
        :key="index"
        @mouseover="overtabsList(item,index)"
        @mouseout="outtabsList(index)"
        :class="[(rightnone==index) ? 'rightnones' : 'rightshows']"
      >
        <span>{{ item.type }}</span>
        <span class="iconfont icon-youjiantou1" />
      </li>
    </div>
    <!-- 显示tab切换 -->
    <div @mouseover="tabshow=true;rightnone=indexs" @mouseout="tabshow=false;rightnone=null" v-show="tabshow" class="tabshow">
      <ul>
        <li v-for="(v,i) in tabshowData.children" :key="i">
          <i>{{ i }}</i>
          <strong>{{ v.city }}</strong>
          <span>{{ v.desc }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      cityData: [],
      //   是否显示
      tabshow: false,
      // 显示的子元素
      tabshowData: [],
      // domList: '',
      // 显示的索引值
      rightnone: '',
      rightnones: '',
      indexs: ''
    }
  },
  mounted () {
    // 获取城市列表
    this.$axios({
      url: '/posts/cities'
    }).then((res) => {
      console.log(res)
      this.cityData = res.data.data
    })
  },
  methods: {
    overtabsList (item, index) {
      // console.log(item)
      this.tabshowData = item
      this.tabshow = true
      this.rightnone = index
      this.indexs = index

      //   const mm = this.$refs.domList.filter((v, i) => {
      //     v.style.borderRight = '1px solid #ddd'
      //     if (i === index) {
      //       return v
      //     }
      //   })
      //   console.log(mm)
      //   mm[0].style.borderRight = 'none'

      // console.log(this.$refs.domList[index])
      // rightnones.style = `rightnones:nth-child(${index}border-right:none; })`
    },
    outtabsList (index) {
      this.tabshow = false
      this.rightnone = null

    //   this.rightnones = index
    //   if (index === 0 || index) {
    //     console.log(3333)
    //     this.$refs.domList[index].style.borderRight = '1px solid #ddd'
    //   } else {
    //     console.log(4444)
    //     this.$refs.domList[index].style.borderRight = 'none'
    //   }
    }
  }
}
</script>

<style scoped lang="less" >
    // tab栏
    .tabsbox {
      width: 260px;
      .tab {
        width: 260px;
        border: 1px solid #ddd;
        border-right: none;
        border-bottom: none;
        box-shadow: 0 0 1px #f5f5f5;
        // z-index: 2;
        > li {
          background: #fff;
          display: flex;
          justify-content: space-between;
          height: 40px;
          line-height: 40px;
          border-bottom: 1px solid #ddd;
          border-right: 1px solid #ddd;
          padding: 0 20px;
          font-size: 14px;
           position: relative;
          z-index: 3;
        }
        // li:hover{
        //   border-right: none
        // }
        .rightnones{
           border-right: none;
        }
         .rightshows{
           border-right: 1px solid #ddd;
         }
      }
      // 显示的tab栏
      .tabshow {
        // display: none;
        position: absolute;
        z-index: 2;
        left: 260px;
        top: 0px;
        width: 350px;
        padding: 10px 20px;
        box-sizing: border-box;
        background: #fff;
        border: 1px solid #ddd;
        border-left: none;
        li {
          border-left: none;
          font-size: 14px;
          line-height: 1.5;
          > i {
            color: orange;
            font-size: 24px;
            font-style: italic;
          }
          > strong {
            margin: 0 10px;
            color: orange;
            font-weight: 400;
          }
          > span {
            color: #999;
          }
        }
        // li:hover{
        //   border-left: none;
        // }
      }
    }
</style>
