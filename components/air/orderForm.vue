<template>
  <div class="main">
    <div class="air-column">
      <h2>乘机人</h2>
      <el-form ref="formUser" :model="{users}" class="member-info">
        <div v-for="(item,index) in users" :key="index" class="member-info-item">
          <el-form-item
            :rules="{required: true,message: '请输入乘机人姓名',trigger: 'blur'}"
            :prop="`users[${index}].id`"
            label="乘机人类型"
          >
            <el-input v-model="users[index].username" placeholder="姓名" class="input-with-select">
              <el-select
                slot="prepend"
                value="1"
                placeholder="请选择"
              >
                <el-option label="成人" value="1" />
              </el-select>
            </el-input>
          </el-form-item>

          <el-form-item
            :prop="`users[${index}].id`"
            :rules="{required: true,message: '请输入乘机人政见号码',trigger: 'blur'}"
            label="证件类型"
          >
            <el-input
              v-model="users[index].id"
              placeholder="证件号码"
              class="input-with-select"
            >
              <el-select
                slot="prepend"
                value="1"
                placeholder="请选择"
              >
                <el-option :checked="true" label="身份证" value="1" />
              </el-select>
            </el-input>
          </el-form-item>

          <span @click="handleDeleteUser(index)" class="delete-user">-</span>
        </div>
      </el-form>

      <el-button @click="handleAddUsers" class="add-member" type="primary">
        添加乘机人
      </el-button>
    </div>

    <div class="air-column">
      <h2>保险</h2>
      <div v-for="(item,index) in data.insurances" :key="index">
        <el-checkbox-group v-model="insurances">
          <div class="insurance-item">
            <el-checkbox
              :label="item.id"
              border
            >
              {{ item.type }}：￥{{ item.price }}/份×1  最高赔付{{ item.compensation }}
            </el-checkbox>
          </div>
        </el-checkbox-group>
      </div>
    </div>

    <div class="air-column">
      <h2>联系人</h2>
      <div class="contact">
        <el-form
          ref="formContact"
          :model="{contactName, contactPhone, captcha}"
          :rules="contactRules"
          label-width="60px"
        >
          <el-form-item prop="contactName" label="姓名">
            <el-input v-model="contactName" />
          </el-form-item>

          <el-form-item prop="contactPhone" label="手机">
            <el-input v-model="contactPhone" placeholder="请输入内容">
              <template slot="append">
                <el-button @click="handleSendCaptcha">
                  发送验证码
                </el-button>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item prop="captcha" label="验证码">
            <el-input v-model="captcha" />
          </el-form-item>
        </el-form>
        <el-button @click="handleSubmit" type="warning" class="submit">
          提交订单
        </el-button>
        <span v-show="false">{{ allprice }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['data'],
  data () {
    return {
      users: [{
        username: '',
        id: ''
      }],
      contactName: '', // 联系人姓名
      contactPhone: '', // 联系人电话
      captcha: '', // 手机验证码
      insurances: [], // 保险
      contactRules: {
        contactName: {
          required: true,
          message: '请输入联系人姓名',
          trigger: 'blur'
        },
        contactPhone: {
          required: true,
          message: '请输入联系人电话',
          trigger: 'blur'
        },
        captcha: {
          required: true,
          message: '请输入手机验证码',
          trigger: 'blur'
        }
      }
    }
  },
  computed: {
    allprice () {
      let res = 0
      // 机票价格(单价 * 多少个人)
      res += this.data.seat_infos.org_settle_price * this.users.length
      // 保险价格
      this.insurances.forEach((id) => {
        this.data.insurances.forEach((item) => {
          if (item.id === id) {
            res += item.price * this.users.length
          }
        })
      })
      // 机场建设和燃油附加费
      res += this.data.airport_tax_audlet * this.users.length
      // 传给父组件
      this.$emit('changForm', {
        numUsers: this.users.length,
        allprice: res
      })
      return res
    }
  },
  methods: {
    // 添加乘机人
    handleAddUsers () {
      this.users.push({ username: '', id: '' })
      //   this.users = [
      //     ...this.users,
      //     {
      //       username: '',
      //       id: ''
      //     }
      //   ]
      console.log(this.users)
    },

    // 移除乘机人
    handleDeleteUser (index) {
      this.users.splice(index, 1)
    },

    // 发送手机验证码
    handleSendCaptcha () {
      if (!this.contactPhone) {
        this.$confirm('手机号不能为空', '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        })
        return false
      }

      if (this.contactPhone === 11) {
        this.$confirm('手机号没有11位', '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        })
        return false
      }

      // 点击验证码发请求
      this.$axios({
        url: 'captchas',
        method: 'POST',
        data: { tel: this.contactPhone }
      }).then((res) => {
        console.log(res)
        const { code } = res.data
        this.$confirm(`验证消息为${code}`, '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        })
      })
    },

    // 提交订单
    async handleSubmit () {
      const orderData = {
        users: this.users,
        insurances: this.insurances,
        contactName: this.contactName,
        contactPhone: this.contactPhone,
        invoice: false,
        seat_xid: this.data.seat_infos.seat_xid,
        air: this.data.id,
        captcha: this.captcha
      }
      console.log(orderData)

      // 判断是否全部输入
      // 联系人
      console.log(this.$refs.formContact)
      const formContacts = await this.$refs.formContact
        .validate()
        .catch(() => false)
      // 乘机人
      const formUsers = await this.$refs.formUser
        .validate()
        .catch(() => false)

      if (!formContacts || !formUsers) {
        return false
      }

      // 判断是否有token
      const token = this.$store.state.user.userInfo.token
      console.log(token)
      if (!token) {
        this.$message({
          message: '请先登录',
          type: 'error'
        })
        this.$router.push({
          path: '/user/login'
        })
      } else {
        console.log(222)
        this.$message({
          message: '正在生成订单！请稍等',
          type: 'success'
        })
      }

      this.$axios({
        url: '/airorders',
        method: 'post',
        data: orderData,
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
        .then((res) => {
          console.log(res)
          this.$router.push({
            path: '/air/pay',
            query: {
              id: res.data.data.id
            }
          })
        })
        .catch((err) => {
          console.log(err)
          this.$confirm('订单生成错误', '提示', {
            confirmButtonText: '确定',
            showCancelButton: false,
            type: 'warning'
          })
        })
      // this.$axios({
      //   url: '/airorders',
      //   method: 'post',
      //   data: orderData,
      //   headers: {
      //     Authorization: 'Bearer ' + token
      //   }
      // })
      //   .then((res) => {
      //     console.log(res.data)
      //   })
      //   .catch((err) => {
      //     const { message } = err.response.data
      //     // 警告提示
      //     this.$confirm(message, '提示', {
      //       confirmButtonText: '确定',
      //       showCancelButton: false,
      //       type: 'warning'
      //     })
      //   })
    }
  }
}
</script>

<style scoped lang="less">
    .air-column{
        border-bottom:1px #ddd dashed;
        padding-bottom: 20px;
        margin-bottom: 20px;
    }

    .air-column h2{
        margin-bottom: 20px;
        font-size: 22px;
        font-weight: normal;
    }

    /deep/ .el-select .el-input {
        width: 130px;
    }

    .input-with-select{
        width:590px;
    }

    .input-with-select /deep/  .el-input-group__prepend {
        background-color: #fff;
    }
    .member-info /deep/ .el-form-item{
        margin-bottom:0;
    }

    .member-info-item{
        border-bottom:1px #eee dashed;
        padding-bottom: 20px;
        position: relative;

        &:first-child{
            .delete-user{
                display: none;
            }
        }
    }

    .add-member{
        margin-top:20px;
    }

    .delete-user{
        display: block;
        background:#ddd;
        width:16px;
        height:16px;
        font-size:14px;
        text-align: center;
        line-height: 16px;
        color:#fff;
        cursor: pointer;
        border-radius: 50px;
        position:absolute;
        right:-30px;
        top:50%;
    }

    .insurance{
        > div{
            margin-top:10px;
        }
    }

    .insurance-item{
        margin-bottom: 20px;
    }

    .contact{
        /deep/ .el-input{
            width:50%;
        }
    }

    .submit{
        margin: 50px auto;
        display: block;
        width:250px;
        height:50px;
    }
</style>
