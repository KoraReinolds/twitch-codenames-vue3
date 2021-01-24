export default {

  namespaced: true,

  state: () => ({

    role: null,
    color: null,
    opaque_user_id: null,
    team_leader: null,

  }),

  getters: {

    BROADCASTER: state => state.role === 'broadcaster',
    MY_COLOR: state => state.color,
    USER_ID: state => state.opaque_user_id,
    LEADER: state => state.team_leader,

  },

  mutations: {

    SET_USER: (state, user) => {
      state.role = user.role
      state.color = user.color
      state.opaque_user_id = user.opaque_user_id
      state.team_leader = user.team_leader
    },
    SET_COLOR: (state, color) => {
      state.color = color
    },

  },

  actions: {

  }

}
