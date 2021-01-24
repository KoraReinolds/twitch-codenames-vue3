<template lang="pug">

div(
  :class="$style.history"
)
  div(
    :class="$style.wrapper"
  )
    h1(
      @click="click"
    ) History
    div(
      :class="$style.[elem.color]"
      v-for="elem in history"
    ) {{ elem.word }} {{ elem.number }}

</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'History',
  computed: {
    ...mapGetters({
      history: 'app/HISTORY',
    }),
  },
  methods: {
    // async click() {
    //   const res = await this.$axios.get(`http://localhost:${process.env.VUE_APP_BACKEND_PORT}/test`)
    //   console.log(res.data)
    // }
  }
}

</script>

<style lang="scss" module>

.history {

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
    .red {
      color: red;
    }
    .blue {
      color: blue;
    }
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
