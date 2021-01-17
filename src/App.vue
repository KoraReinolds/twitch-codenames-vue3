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

      if (data.user) this.setUser(data.user)

      if (data.teamColor) this.setColor(data.teamColor)

      if (data.wordList) this.setWordList(data.wordList)

      if (data.wordColorList) this.setColorsToWordList(data.wordColorList)

    },

    ...mapMutations({
      setUser: 'user/SET_USER',
      setColor: 'user/SET_COLOR',
      setWordList: 'app/SET_WORD_LIST',
      setColorsToWordList: 'app/SET_COLORS_TO_WORD_LIST',
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
        console.log("connect")
      })

      socket.on('disconnect', () => {
        console.log("disconnect")
      })

      // private msgs to curent user
      socket.on(`${params.userId}`, data => {
        this.handleSocketInformation(data)
      })

      // socket.on(`${params.userId}-user`, user => {
      //   console.log("user info directly")
      //   this.setUser(user)
      // })

      // socket.on(`${params.userId}-color`, color => {
      //   console.log("team color", color)
      //   this.setColor(color)
      // })

      // socket.on(`${params.userId}-list`, list => {
      //   console.log("list for curent users", list)
      //   this.setWordList(list)
      // })

      // msgs for all users
      socket.on(`${params.channelId}`, data => {
        this.handleSocketInformation(data)
      })

      // socket.on(`${params.channelId}-list`, list => {
      //   console.log("list for all users", list)
      //   this.setWordList(list)
      // })

      // socket.on(`${params.userId}-color-list`, info => {
      //   console.log("colors list", info)
      //   this.setColorsToWordList(info)
      // })

      // window.Twitch.ext.listen(`whisper-${params.userId}`, this.push)

    }).bind(this))

  }
}

</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

</style>
