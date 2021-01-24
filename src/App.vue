<template>
  <div id="app">
    <router-view/>
  </div>
</template>


<script>
import { mapMutations, mapActions } from 'vuex'
import io from 'socket.io-client'

export default {
  name: 'App',
  data: () => ({
  }),
  methods: {

    handleSocketInformation(data) {

      console.log(data)

      if (data.hasOwnProperty('user')) this.setUser(data.user)

      if (data.hasOwnProperty('teamColor')) this.setColor(data.teamColor)

      if (data.hasOwnProperty('wordList')) this.setWordList(data.wordList)

      if (data.hasOwnProperty('wordColorList')) this.setColorsToWordList(data.wordColorList)

      if (data.hasOwnProperty('gameInfo')) this.setGameInfo(data.gameInfo)

      if (data.hasOwnProperty('curentTurnColor')) this.setCurentTurnColor(data.curentTurnColor)

      if (data.hasOwnProperty('history')) this.setHistory(data.history)

      if (data.hasOwnProperty('allowChooseCards')) this.setAllowChooseCards(data.allowChooseCards)

    },

    ...mapMutations({
      setAllowChooseCards: 'app/SET_ALLOW_CHOOSE_CARDS',
      setHistory: 'app/SET_HISTORY',
      setUser: 'user/SET_USER',
      setColor: 'user/SET_COLOR',
      setWordList: 'app/SET_WORD_LIST',
      setColorsToWordList: 'app/SET_COLORS_TO_WORD_LIST',
      setGameInfo: 'app/SET_GAME_INFO',
      setCurentTurnColor: 'app/SET_CURENT_TURN_COLOR',
      connect: 'app/CONNECT',
      disconnect: 'app/DISCONNECT',
    }),
    ...mapActions({
      register: 'app/REGISTER',
    }),
  },
  unmounted() {
    // window.Twitch.ext.unlisten(`whisper-${this.user.userId}`, this.push)
  },
  mounted() {

    window.Twitch.ext.onAuthorized((async (params) => {

      /*
        channelId: "",
        clientId: "",
        token: "",
        userId: "",
      */
      const token = `Bearer ${params.token}`
      this.$axios.defaults.headers.common['Authorization'] = token

      const socket = io(`http://localhost:${process.env.VUE_APP_BACKEND_PORT}`, {
        withCredentials: true,
        extraHeaders: {
          "Authorization": token
        }
      })

      socket.on('connect', () => {
        this.connect()
      })

      socket.on('disconnect', () => {
        this.disconnect()
      })

      // private msgs to curent user
      socket.on(`${params.userId}`, data => {
        this.handleSocketInformation(data)
      })

      // msgs for all users
      socket.on(`${params.channelId}`, data => {
        this.handleSocketInformation(data)
      })

      // window.Twitch.ext.listen(`whisper-${params.userId}`, this.push)

    }).bind(this))

  }
}

</script>

<style lang="scss">

@font-face {
    font-family: 'Open Sans';
    src: url('./assets/SkyFallDone.ttf') format('truetype');
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

</style>
