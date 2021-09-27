<template>
  <div id="app" :class="isBackgroundBlurred && 'blurred'">
    <Sidebar />
    <Nuxt />
    <portal-target
      v-show="isBackgroundBlurred"
      class="modals-portal"
      name="modals-portal"
    ></portal-target>
  </div>
</template>

<script>
export default {
  computed: {
    searchParams() {
      return this.$store.state.searchParams
    },
    isBackgroundBlurred() {
      return this.$store.state.isBackgroundBlurred
    },
  },
  mounted() {
    this.$store.dispatch('getContacts', this.searchParams)
  },
}
</script>

<style lang="scss" scoped>
#app {
  display: flex;
  width: 100%;

  &.blurred > :not(.modals-portal) {
    background: rgba(0, 0, 0, 0.15);
    -webkit-filter: blur(10px);
    -moz-filter: blur(10px);
    -o-filter: blur(10px);
    -ms-filter: blur(10px);
    filter: blur(10px);
  }
}
.modals-portal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
