<template>
  <div class="search-form">
    <!-- 头部tab切换 -->
    <el-row type="flex" class="search-tab">
      <span
        v-for="(item, index) in tabs"
        :key="index"
        @click="handleSearchTab(item, index)"
        :class="{active: index === currentTab}"
      >
        <i :class="item.icon" />{{ item.name }}
      </span>
    </el-row>

    <el-form ref="form" class="search-form-content" label-width="80px">
      <el-form-item label="出发城市" prop="departCity">
        <!-- fetch-suggestions 返回输入建议的方法 -->
        <!-- select 点击选中建议项时触发 -->
        <el-autocomplete
          v-model="form.departCity"
          :fetch-suggestions="queryDepartSearch"
          @select="handleDepartSelect"
          :trigger-on-focus="false"
          :highlight-first-item="true"
          placeholder="请搜索出发城市"
          class="el-autocomplete"
        />
      </el-form-item>
      <el-form-item label="到达城市" prop="destCity">
        <el-autocomplete
          v-model="form.destCity"
          :fetch-suggestions="queryDestSearch"
          @select="handleDestSelect"
          :highlight-first-item="true"
          :trigger-on-focus="false"
          placeholder="请搜索到达城市"
          class="el-autocomplete"
        />
      </el-form-item>
      <el-form-item label="出发时间" prop="departDate">
        <!-- change 用户确认选择日期时触发 -->
        <el-date-picker
          v-model="form.departDate"
          @change="handleDate"
          type="date"
          placeholder="请选择日期"
          style="width: 100%;"
        />
      </el-form-item>
      <el-form-item label="">
        <el-button
          @click="handleSubmit"
          style="width:100%;"
          type="primary"
          icon="el-icon-search"
        >
          搜索
        </el-button>
      </el-form-item>
      <div class="reverse">
        <span @click="handleReverse">换</span>
      </div>
    </el-form>
  </div>
</template>

<script>
import moment from 'moment'
// import localStorage from '@/plugins/localStorage'
export default {
  data () {
    return {
      form: {
        departCity: '', // 出发城市
        departCode: '', // 出发城市代码
        destCity: '', // 目标城市
        destCode: '', // 目标城市代码
        departDate: '' // 日期 2019-05-01
      },
      tabs: [
        { icon: 'iconfont icondancheng', name: '单程' },
        { icon: 'iconfont iconshuangxiang', name: '往返' }
      ],
      firstPlayFlag: true, // 第一次播放标记
      firstPlayFlag1: true, // 第一次播放标记
      disabled: true, // 禁用
      currentTab: 0
    }
  },
  mounted () {

  },
  methods: {
    // 封装一个城市列表接口
    querySearch (queryString) {
      // 判断是否有值没有值返回一个空数组
      return new Promise((resolve, reject) => {
        if (!queryString) {
          return resolve([])
        }
        this.$axios({
          url: '/airs/city',
          params: { name: queryString }
        }).then((res) => {
          console.log(res)
          const { data } = res.data
          // 筛选返回城市的数据
          const arr = data.map((value) => {
            return {
              ...value,
              value: value.name.replace('市', '')
            }
          })
          const arrList = arr.filter(element => element.sort)
          resolve(arrList)
        })
      })
    },

    // tab切换时触发
    handleSearchTab (item, index) {
      this.currentTab = index
      if (this.currentTab === 1) {
        this.$confirm('暂不开启此功能', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        this.currentTab = 0
      }
    },

    // 出发城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    async queryDepartSearch (value, cb) {
      let arr = await this.querySearch(value)
      if (!arr || arr.length === 0) {
        arr = [{ value: '暂不支持该城市' }]
      } else {
        // 不在下拉列表中选择，则默认选择第一项
        if (this.firstPlayFlag) {
          this.form.departCity = arr[0].value
          this.firstPlayFlag = false // 这里设置false仅让他执行一次
        }
        this.form.departCode = arr[0].sort
      }
      cb(arr)
    },

    // 目标城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    async queryDestSearch (value, cb) {
      let arr = await this.querySearch(value)
      // 当数据为空时
      if (!arr || arr.length === 0) {
        arr = [{ value: '暂不支持该城市' }]
        arr.disabled = true
        // this.disabled = true
      } else {
        // 不在下拉列表中选择，则默认选择第一项
        if (this.firstPlayFlag1) {
          this.form.destCity = arr[0].value
          this.firstPlayFlag1 = false // 这里设置false仅让他执行一次
        }
        this.form.destCode = arr[0].sort
      }
      cb(arr)
    },

    // 出发城市下拉选择时触发
    handleDepartSelect (item) {
      console.log(item)
      this.form.departCode = item.sort
    },

    // 目标城市下拉选择时触发
    handleDestSelect (item) {
      console.log(item)
      this.form.destCode = item.sort
    },

    // 确认选择日期时触发
    handleDate (value) {
      this.form.departDate = moment(this.form.departDate).format('YYYY-MM-DD')
    },

    // 触发和目标城市切换时触发
    handleReverse () {
      const { departCity, departCode, destCity, destCode } = this.form
      this.form.departCity = destCity
      this.form.departCode = destCode
      this.form.destCity = departCity
      this.form.destCode = departCode
    },

    // 提交表单是触发
    handleSubmit () {
      console.log(this.form)
      const rules = {
        departCity: { value: this.form.departCity, messagee: '墙输入出发城市' },
        destCity: { value: this.form.destCity, messagee: '请输入目的地城市' },
        departDate: { value: this.form.departDate, messagee: '请选择日期' }
      }
      let valid = true // 表单验证结果
      Object.keys(rules).forEach((v) => {
        // 只要有一个结果不通过，就停止循环
        if (!valid) { return true }
        const item = rules[v]

        // 数据为空
        if (!item.value) {
          valid = false

          this.$confirm(item.messagee, '提示', {
            confirmButtonText: '确定',
            showCancelButton: false,
            type: 'warning'
          })
        }
      })

      // 不通过验证
      if (!valid) { return true }

      this.form.departCity = this.form.departCity.replace(/市$/, '')
      this.form.destCity = this.form.destCity.replace(/市$/, '')

      // 存储数据
      // const airs = JSON.parse(localStorage.getItem('airs') || [])
      // airs.push(this.form)
      // localStorage.setItem('airs', JSON.stringify(airs))

      this.$store.commit('history/headHistory', this.form)
      // 带参提交
      this.$router.push({
        path: '/air/flights',
        query: this.form
      })
    }
  }
}
</script>

<style scoped lang="less">
.search-form{
    border:1px #ddd solid;
    border-top:none;
    width:360px;
    height:350px;
    box-sizing: border-box;
}

.search-tab{
  span{
    display: block;
    flex:1;
    text-align: center;
    height:48px;
    line-height: 42px;
    box-sizing: border-box;
    border-top:3px #eee solid;
    background:#eee;
  }

  .active{
    border-top-color: orange;
    background:#fff;
  }

  i{
    margin-right:5px;
    font-size: 18px;

    &:first-child{
      font-size:16px;
    }
  }
}

.search-form-content{
  padding:15px 50px 15px 15px;
  position: relative;

  .el-autocomplete{
    width: 100%;
  }
}

.reverse{
  position:absolute;
  top: 35px;
  right:15px;

  &:after,&:before{
      display: block;
      content: "";
      position: absolute;
      left:-35px;
      width:25px;
      height:1px;
      background:#ccc;
  }

  &:after{
      top:0;
    }

    &:before{
      top:60px;
    }

  span{
    display: block;
    position:absolute;
    top: 20px;
    right:0;
    font-size:12px;
    background: #999;
    color:#fff;
    width:20px;
    height:20px;
    line-height: 18px;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;

    &:after,&:before{
      display: block;
      content: "";
      position: absolute;
      left:10px;
      width:1px;
      height:20px;
      background:#ccc;
    }

    &:after{
      top:-20px;
    }

    &:before{
      top:20px;
    }
  }
}
</style>
