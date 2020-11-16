import shop from '../../api/shop'

// init state
const state = () => ({
  items: [],
  status: null,
})

// getters
const getters = {
  cartProducts: (state, getters, rootState) => {
    return state.items.map(({ id, quantity }) => {
      const product = rootState.products.all.find(product => product.id === id)
      return {
        title: product.title,
        price: product.price,
        quantity,
      }
    })
  },

  cartTotalPrice: (state, getters) => {
    return getters.cartProducts.reduce((total, product) => {
      return total + product.price * product.quantity
    }, 0)
  },
}

// mutations
const mutations = {
  addProductToCart(state, { id }) {
    state.items.push({
      id,
      quantity: 1,
    })
  },
  increaseItem(state, { id }) {
    const cartItem = state.items.find(item => item.id === id)
    cartItem.quantity++
  },
  setCartItems(state, { items }) {
    state.items = items
  },
  setStatus(state, status) {
    state.status = status
  },
}

// actions
const actions = {
  checkout({ state, commit }, products) {
    const savedCartItems = [...state.items]
    commit('setStatus', null)
    // empty cart
    commit('setCartItems', { items: [] })
    shop.buyProducts(
      products,
      () => commit('setStatus', 'successful'),
      () => {
        commit('setStatus', 'failed')
        // rollback to saved cart before send request
        commit('setCartItems', { items: savedCartItems })
      }
    )
  },
  addProductToCart({ commit, state }, product) {
    commit('setStatus', null)
    if (product.inventory > 0) {
      const cartItem = state.items.find(item => item.id === product.id)
      if (!cartItem) {
        commit('addProductToCart', { id: product.id })
      } else {
        commit('increaseItem', { id: product.id })
      }
      // decrease item from stock
      commit(
        'products/decreaseProductStock',
        { id: product.id },
        { root: true }
      )
    }
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
