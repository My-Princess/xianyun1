<template>
  <el-form ref="form" :model="form" :rules="rules" class="form">
    <el-form-item class="form-item">
      <el-input v-model="form.username" placeholder="用户名手机" />
    </el-form-item>

    <el-form-item class="form-item">
      <el-input v-model="form.captcha" placeholder="验证码">
        <template slot="append">
          <el-button @click="handleSendCaptcha">
            发送验证码
          </el-button>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item class="form-item">
      <el-input v-model="form.nickname" placeholder="你的名字" />
    </el-form-item>

    <el-form-item class="form-item">
      <el-input v-model="form.password" placeholder="密码" type="password" />
    </el-form-item>

    <el-form-item class="form-item">
      <el-input v-model="form.checkPassword" placeholder="确认密码" type="password" />
    </el-form-item>

    <el-button @click="handleRegSubmit" class="submit" type="primary">
      注册
    </el-button>
  </el-form>
</template>

<script>
export default {
  data () {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不正确'))
      } else {
        callback()
      }
    }
    return {
      form: {
        username: '', // 用户名
        password: '', // 登录密码
        checkPassword: '', // 确认密码
        nickname: '', // 昵称
        captcha: '' // 手机验证码
      },
      rules: {
        username: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }
        ],
        checkPassword: [
          {
            validator: validatePass,
            trigger: 'blur'
          }
        ],
        nickname: [
          {
            required: true,
            message: '请输入昵称',
            trigger: 'blur'
          }
        ],
        captcha: [
          {
            required: true,
            message: '请输入验证码',
            trigger: 'blur'
          }
        ]
      },
      index: 0
    }
  },
  methods: {
    handleSendCaptcha () {
      if (!this.form.username) {
        this.$confirm('手机号不能为空', '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        })
        return false
      }

      if (this.form.username === 11) {
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
        data: { tel: this.form.username }
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
    // 注册时
    handleRegSubmit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const { checkPassword, ...prose } = this.form
          this.$axios({
            url: '/accounts/register',
            method: 'POST',
            data: prose
          }).then((res) => {
            console.log(res)
            if (res.status === 200) {
              this.form = ''
              this.$emit('input', this.index)
            }
          })
        }
      })
    }
    // button (event) {
    //   console.log(event)
    //   this.$emit('click', event)
    // }
  }
}
</script>

<style scoped lang="less">
.form {
  padding: 25px;
}

.form-item {
  margin-bottom: 20px;
}

.form-text {
  font-size: 12px;
  color: #409eff;
  text-align: right;
  line-height: 1;
}

.submit {
  width: 100%;
  margin-top: 10px;
}
</style>
