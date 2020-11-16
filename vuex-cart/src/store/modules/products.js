import shop from '../../api/shop'

// init state
const state = () => ({
  all: [],
})

// getters
const getters = {}

// actions
const actions = {
  getAllProducts({ commit }) {
    shop.getProducts(products => commit('setProducts', products))
  },
}

// mutations
const mutations = {
  setProducts(state, products) {
    state.all = products
  },

  decreaseProductStock(state, { id }) {
    const product = state.all.find(product => product.id === id)
    product.inventory--
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
