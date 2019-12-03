// 固定写法
export const state = () => ({
  userInfo: {
    token: '',
    user: {}
  }
})

// 改变数据状态,必须使用 mutations
export const mutations = {
  // 第一个，state
  // 第二个， 修改数据
  setUserInfo (state, data) {
    state.userInfo = data
  },
  cleanUserInfo (state, info) {
    console.log(process.browser)
    // 判断当前环境
    if (process.browser) {
      localStorage.removeItem('userInfo')
    }
    state.userInfo = ''
  }
}

export const actions = {
  // this.$store.commit = da
  login ({ commit }, data) {
    return this.$axios({
      url: '/accounts/login',
      method: 'POST',
      data
    }).then((res) => {
      const data = res.data
      // 保存到state
      // commit('setUserInfo', data)
      return data
    }
    )
  }
}
