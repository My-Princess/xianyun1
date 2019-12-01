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
  }
}
