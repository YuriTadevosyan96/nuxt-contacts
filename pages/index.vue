<template>
  <div v-if="!isMobile"></div>
  <sidebar v-else />
</template>

<script>
import Sidebar from '../components/Sidebar.vue'
export default {
  components: { Sidebar },
  layout: ({ isMobile }) => (isMobile ? 'mobile' : 'default'),
  computed: {
    isMobile() {
      return this.$store.state.isMobile
    },
  },
}
</script>

<style lang="scss">
body {
  background-color: $white-color;
}
</style>
