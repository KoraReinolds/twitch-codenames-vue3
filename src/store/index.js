import { createStore } from 'vuex'
import AppModule from './app'
import UserModule from './user'

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    app: AppModule,
    user: UserModule,
  }
})
