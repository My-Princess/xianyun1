<template>
  <el-form ref="ruleForm" :model="ruleForm" :rules="rules" status-icon class="form">
    <!-- 用户名 -->
    <el-form-item prop="username" class="form-item">
      <el-input v-model="ruleForm.username" placeholder="用户名/手机" autocomplete="off" />
    </el-form-item>
    <!-- 密码 -->
    <el-form-item prop="password" class="form-item">
      <el-input v-model="ruleForm.password" placeholder="密码" type="password" autocomplete="off" />
    </el-form-item>
    <!-- 忘记密码 -->
    <p class="form-text">
      <nuxt-link to="#">
        忘记密码
      </nuxt-link>
    </p>
    <el-form-item>
      <el-button @click="submitForm" type="primary">
        登录
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data () {
    return {
      ruleForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm () {
      //   console.log(this.ruleForm)
      this.$refs.ruleForm.validate((valid) => {
        // true 没有错误
        if (valid) {
          // this.$axios({
          //   url: '/accounts/login',
          //   method: 'post',
          //   data: this.ruleForm
          // })
          //   .then((res) => {
          //     console.log(res)
          //     this.$store.commit('user/setUserInfo', res.data)
          //   })

          // 使用vuex的actions替换这里直接写的ajax请求
          this.$store.dispatch('/login', this.ruleForm).then((res) => {
            this.$message({
              message: '登录成功,正在跳转',
              type: 'success'
            })
            setTimeout(() => {
              this.$router.replace('/')
            }, 1000)
          })
        }
      })
    }
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
