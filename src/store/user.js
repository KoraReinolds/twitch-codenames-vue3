export default {

  namespaced: true,

  state: () => ({

    role: null,
    color: null,
    opaque_user_id: null,

  }),

  getters: {

    BROADCASTER: state => state.role === 'broadcaster',
    MY_COLOR: state => state.color,
    USER_ID: state => state.opaque_user_id,

  },

  mutations: {

    SET_USER: (state, user) => {
      state.role = user.role
      state.color = user.color
      state.opaque_user_id = user.opaque_user_id
    },
    SET_COLOR: (state, color) => {
      state.color = color
    },

  },

  actions: {

  }

}
