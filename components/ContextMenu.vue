<template>
  <div class="context-menu" :class="isFirstItem && 'first'" v-on="$listeners">
    <div class="option" @click="edit">Редактировать</div>
    <div class="option" @click="$emit('delete')">Удалить</div>
  </div>
</template>

<script>
export default {
  props: {
    editId: { type: String, default: '' },
    isFirstItem: { type: Boolean },
  },
  methods: {
    edit() {
      this.$emit('close')
      this.$router.push(`/contacts/${this.editId}/edit`)
    },
  },
}
</script>

<style lang="scss" scoped>
.context-menu {
  z-index: 1;
  border-radius: 5px;
  border: 1px solid $gray-color;
  padding-top: 0.2rem;
  color: $white-color;
  background-color: $gray-color;
  font-weight: normal;
  position: absolute;
  font-size: 0.7rem;
  top: -100%;
  right: -100%;
  transform: translate(-30%, -50%);

  &.first {
    top: 0;
    right: -100%;
    transform: translate(-30%, 70%);
  }

  .option {
    padding: 5px 10px;
    margin-bottom: 0.2rem;

    &:hover {
      color: $gray-color;
      background-color: $white-color;
    }
  }
}
</style>
