export default {

  namespaced: true,

  state: () => ({

    appLoaded: false,
    list: {},
    gameInfo: '',
    curentTurnColor: '',
    history: [],
    allowChooseCard: false,

  }),

  getters: {

    ALLOW_CHOOSE_CARDS: state => state.allowChooseCard,
    HISTORY: state => state.history,
    APP_LOADED: state => state.appLoaded,
    WORDS: state => state.list,
    GAME_INFO: state => state.gameInfo,
    CURENT_TURN_COLOR: state => state.curentTurnColor,
    
  },
  
  mutations: {

    SET_ALLOW_CHOOSE_CARDS: (state, val) => state.allowChooseCard = val,

    SET_HISTORY: (state, history) => state.history = history,

    CONNECT: (state) => state.appLoaded = true,

    DISCONNECT: (state) => state.appLoaded = false,

    SET_CURENT_TURN_COLOR: (state, curentTurnColor) => state.curentTurnColor = curentTurnColor,

    SET_GAME_INFO: (state, gameInfo) => state.gameInfo = gameInfo,

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

    async SEND_WORD ({ commit, state, rootState, dispatch }, data) {

      const res = await this.$axios.post('/send-word', data)
      console.log('/send-word ', data)
      return res

    },

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
