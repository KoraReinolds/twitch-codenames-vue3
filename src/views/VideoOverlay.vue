<template lang="pug">

div(
  :class="$style.overlay"
  @click="obj.data = 'kek'"
) {{obj.data}}
  div(
    :class="$style.cards"
  )
    div(
      :class="[$style.card, $style[info.color]]"
      v-for="(info, word) in list"
    ) {{ word }}

  Configuration(
    :class="$style.configuration"

  )

</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import Configuration from '../components/Configuration.vue'

export default {
  name: 'VideoOverlay',
  data: () => ({
    obj: {},
  }),
  components: {
    Configuration,
  },
  computed: {
    ...mapGetters({
      list: 'app/WORDS',
    }),
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
    background: lightcyan;
    opacity: 0.8;
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
  }

}

</style>
