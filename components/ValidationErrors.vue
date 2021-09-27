<template>
  <ul v-show="errors.length > 0">
    <li v-for="(error, index) in errors" :key="index" class="error">
      {{ error }}
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    errors: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style lang="scss" scoped>
.error {
  text-align: center;
  margin-bottom: 0.5rem;
  color: red;
}
</style>
