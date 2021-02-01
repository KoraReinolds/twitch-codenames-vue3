<template lang="pug">

div(
  :class="$style.configuration"
)
  div(
    :class="$style.wrapper"
  )
    div(
      v-if="gameInfo"
    ) {{ gameInfo }}
    div(
      v-if="timer"
    ) Осталось {{ timer }}

    h1(
      v-if="broadcaster"
      @click="startApp"
    ) Start
    span(
    ) {{ userId }} ({{ myColor }})
    div {{ curentTurnColor }}
    template(
      v-if="leader"
    )
      input(
        :disabled="curentTurnColor !== myColor || allowChooseCard"
        :placeholder="curentTurnColor !== myColor ? 'Ожидается слово от капитана другой команды' : 'Введите слово'"
        v-model="word"
      )
      select(
        v-model="number"
        :disabled="curentTurnColor !== myColor || allowChooseCard"
      )
        option(
          disabled
          value=""
        ) Число слов
        option 1
        option 2
        option 3
        option 4
        option 5
        option 6
      button(
        v-if="curentTurnColor === myColor"
        :onClick="sendResult"
        :disabled="!number || !word"
      ) Отправить


</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Configuration',
  data: () => ({
    word: "123",
    number: "2",
  }),
  computed: {
    ...mapGetters({
      allowChooseCard: 'app/ALLOW_CHOOSE_CARDS',
      timer: 'app/TIMER',
      gameInfo: 'app/GAME_INFO',
      curentTurnColor: 'app/CURENT_TURN_COLOR',
      broadcaster: 'user/BROADCASTER',
      myColor: 'user/MY_COLOR',
      userId: 'user/USER_ID',
      leader: 'user/LEADER',
    }),
  },
  methods: {
    sendResult() {
      this.sendWord({
        word: this.word,
        number: this.number,
        color: this.myColor,
      })
      // this.word = ""
      // this.number = ""
    },
    ...mapActions({
      startApp: 'app/START_APP',
      sendWord: 'app/SEND_WORD',
    }),
  },
  mounted() {

  }
}

</script>

<style lang="scss" module>

.configuration {

  background: rgb(236, 218, 189);
  border-radius: 10px;
  padding: 12px;
  width: 200px;
  .wrapper {
    border-radius: 10px;
    padding: 12px;
    border: 2px solid rgb(153, 129, 91);
    // height: 100%;
    background: rgb(236, 218, 189);
    h1 {
      font-family: 'Open Sans', sans-serif;
      cursor: pointer;
      // color: lightgray;
      &:hover {
        color: red;
      }
    }
  }

}

</style>
