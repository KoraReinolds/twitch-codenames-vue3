<template lang="pug">

div
  h1(
    @click="click"
  ) Panel page

</template>

<script>

export default {
  name: 'Panel',
  methods: {
    async click() {
      const res = await this.$axios.get(`http://localhost:${process.env.VUE_APP_BACKEND_PORT}/test`)
      console.log(res.data)
    }
  }
}

</script>

<style lang="scss" scoped>

  h1 {
    cursor: pointer;
    &:hover {
      color: red;
    }
  }

</style>
