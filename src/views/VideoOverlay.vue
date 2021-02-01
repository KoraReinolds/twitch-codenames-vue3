<template lang="pug">

div(
  :class="$style.overlay"
)
  div(
    v-if="appLoaded"
    :class="$style.cards"
  )
    div(
      :class="[$style.card, { [$style.disabled]: !leader && !allowChooseCard }, $style[info.color]]"
      v-for="(info, word) in list"
      @click="allowChooseCard && sendAnswer(word)"
    )
      div {{ word }}
      div(
        v-if="Object.values(results).length"
      ) {{ results[word] ? results[word] : 0 }} %

  Configuration(
    :class="$style.configuration"
  )

  History

</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import Configuration from '../components/Configuration.vue'
import History from '../components/History.vue'

export default {
  name: 'VideoOverlay',
  data: () => ({
  }),
  components: {
    Configuration,
    History,
  },
  computed: {
    ...mapGetters({
      results: 'app/RESULTS',
      leader: 'user/LEADER',
      allowChooseCard: 'app/ALLOW_CHOOSE_CARDS',
      appLoaded: 'app/APP_LOADED',
      list: 'app/WORDS',
    }),
  },
  methods: {
    ...mapActions({
      sendAnswer: 'app/SEND_ANSWER',
    })
  }
}

</script>

<style lang="scss" module>

.overlay {
  display: flex;
  // color: white;
}

.configuration {
  margin: 20px;
}

.cards {
  // background: lightgoldenrodyellow;
  // max-height: 100%;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(5, 100px);
  grid-template-rows: repeat(5, 50px);
  grid-auto-flow: column;

  .card {
    // margin: 10px;
    // padding: 10px;
    // min-width: 100px;
    // max-width: 100px;
    // min-height: 50px;
    // max-height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background: rgb(224, 228, 224);
    cursor: pointer;
    &:hover {
      opacity: 1.0;
      // background: rgb(158, 161, 165);

    }

    &.red {
      background: red;
      color: white
    }
    &.black {
      background: black;
      color: white
    }
    &.blue {
      background: blue;
      color: white
    }

    &.disabled {
      cursor: default;
      background: gray;
      &:hover {
        opacity: 1.0;
        // background: rgb(158, 161, 165);
      }
    }
  }

}

</style>
