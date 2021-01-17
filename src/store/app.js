export default {

  namespaced: true,

  state: () => ({

    list: {},

  }),

  getters: {

    WORDS: state => state.list,
    
  },
  
  mutations: {

    SET_WORD_LIST: (state, list) => {

      state.list = {}
      list.forEach(el => {
        state.list[el.word] = { color: 'white' }
      })

    },

    SET_COLORS_TO_WORD_LIST: (state, { 
      blackWordList,
      redWordList,
      blueWordList,
    }) => {

      if (Object.values(state.list).length) {
        blackWordList.forEach(({ word }) => {
          if (state.list[word]) state.list[word].color = 'black'
        })

        redWordList.forEach(({ word }) => {
          if (state.list[word]) state.list[word].color = 'red'
        })

        blueWordList.forEach(({ word }) => {
          if (state.list[word]) state.list[word].color = 'blue'
        })
      }
      state.list = {...state.list}

    },

  },

  actions: {

    async START_APP ({ commit, state, rootState, dispatch }) {

      const res = await this.$axios.post('/start-app')
      console.log('/start-app ', res.data)
      return res

    },

    async REGISTER ({ commit, state, rootState, dispatch }) {


      const res = await this.$axios.post('/register')
      console.log('registerResp ', res.data)
      return res
      
    },

  }

}
