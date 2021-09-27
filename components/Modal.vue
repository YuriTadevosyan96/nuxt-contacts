<template>
  <div class="modal-wrapper" @click="onClose">
    <template v-if="isConfirm">
      <div class="modal-container">
        <h3 class="confirm-text">{{ confirmText }}</h3>
        <div class="confirm-actions">
          <Button
            :hoverable="false"
            color="secondary"
            size="small"
            :style="cancelStyles"
            @click="$emit('close')"
          >
            Нет
          </Button>
          <Button size="small" :style="confirmStyles" @click="$emit('confirm')">
            Да
          </Button>
        </div>
      </div>
    </template>
    <div v-else class="modal-container" :class="isMobile && 'mobile'">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isConfirm: { type: Boolean, default: false },
    confirmText: { type: String, default: '' },
  },
  computed: {
    isMobile() {
      return this.$store.state.isMobile
    },
    cancelStyles: () => ({ width: '100px', marginRight: '5rem' }),
    confirmStyles: () => ({ width: '100px' }),
  },
  methods: {
    onClose(e) {
      if (e.target === e.currentTarget) {
        this.$emit('close')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.modal-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  height: 100%;
  width: 100%;
}
.modal-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 14px;
  border-radius: 10px;
  background-color: $white-color;
  border: 1px solid $main-color;

  &.mobile {
    top: unset;
    width: 98%;
    transform: translate(-50%, 0);
    bottom: 10px;
  }
}
.confirm-text {
  color: $black-color;
  text-align: center;
  margin-bottom: 2rem;
}
.confirm-actions {
  display: flex;
  justify-content: center;
}
</style>
