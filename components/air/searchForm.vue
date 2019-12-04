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
      <el-form-item label="出发城市">
        <!-- fetch-suggestions 返回输入建议的方法 -->
        <!-- select 点击选中建议项时触发 -->
        <el-autocomplete
          v-model="form.departCity"
          :fetch-suggestions="queryDepartSearch"
          @select="handleDepartSelect"
          placeholder="请搜索出发城市"
          class="el-autocomplete"
        />
      </el-form-item>
      <el-form-item label="到达城市">
        <el-autocomplete
          v-model="form.destCity"
          :fetch-suggestions="queryDestSearch"
          @select="handleDestSelect"
          placeholder="请搜索到达城市"
          class="el-autocomplete"
        />
      </el-form-item>
      <el-form-item label="出发时间">
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
          resolve(arr)
        })
      })
    },
    // tab切换时触发
    handleSearchTab (item, index) {

    },

    // 出发城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    async queryDepartSearch (value, cb) {
      const arr = await this.querySearch(value)
      console.log(arr)
      if (arr.length > 0) {
        // 不在下拉列表中选择，则默认选择第一项
        this.form.departCity = arr[0].value
        this.form.destCode = arr[0].sort
      }
      cb(arr)
    },

    // 目标城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    async queryDestSearch (value, cb) {
      const arr = await this.querySearch(value)
      if (arr.length > 0) {
        this.form.departCity = arr[0].value
        this.form.destCode = arr[0].sort
      }
      cb(arr)
    },

    // 出发城市下拉选择时触发
    handleDepartSelect (item) {

    },

    // 目标城市下拉选择时触发
    handleDestSelect (item) {

    },

    // 确认选择日期时触发
    handleDate (value) {

    },

    // 触发和目标城市切换时触发
    handleReverse () {

    },

    // 提交表单是触发
    handleSubmit () {
      console.log(this.form)
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
