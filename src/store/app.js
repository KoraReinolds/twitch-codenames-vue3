export default {

  namespaced: true,

  state: () => ({

    appLoaded: false,
    list: {},
    gameInfo: '',
    curentTurnColor: '',
    history: [],
    allowChooseCard: false,
    timer: 0,
    results: {},

  }),

  getters: {

    RESULTS: state => state.results,
    TIMER: state => state.timer,
    ALLOW_CHOOSE_CARDS: state => state.allowChooseCard,
    HISTORY: state => state.history,
    APP_LOADED: state => state.appLoaded,
    WORDS: state => state.list,
    GAME_INFO: state => state.gameInfo,
    CURENT_TURN_COLOR: state => state.curentTurnColor,
    
  },
  
  mutations: {

    SET_RESULTS: (state, results) => {
      const resultCount = results.reduce((res, { count }) => res + count, 0)
      state.results = results.reduce((res, { word, count }) => {
        res[word] = Math.round(count / resultCount * 100)
        return res
      }, {})
    },

    SET_TIMER: (state, timer) => state.timer = timer,

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

    async SEND_ANSWER ({ commit, state, rootState, dispatch }, word) {

      const res = await this.$axios.post('/register-answer', { word })
      console.log('/register-answer ', { word })
      return res

    },

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
