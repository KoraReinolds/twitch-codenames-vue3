<template lang="pug">

div
  h1(
    v-if="broadcaster"
    @click="startApp"
  ) Start
  h1(
  )  {{ userId }}
  h1(
    v-if="myColor"
  ) {{ myColor }}


</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Configuration',
  data: () => ({
  }),
  computed: {
    ...mapGetters({
      broadcaster: 'user/BROADCASTER',
      myColor: 'user/MY_COLOR',
      userId: 'user/USER_ID',
    }),
  },
  methods: {
    ...mapActions({
      startApp: 'app/START_APP',
    }),
  },
  mounted() {

  }
}

</script>

<style lang="scss" scoped>

  h1 {
    cursor: pointer;
    color: lightgray;
    &:hover {
      color: red;
    }
  }

</style>
