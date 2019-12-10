export const state = () => ({
  list: []
})

export const mutations = {
  headHistory (state, data) {
    state.list.push(data)
  }
}
