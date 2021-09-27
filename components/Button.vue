<template>
  <button :class="appliedClasses" v-on="$listeners">
    <span v-if="withTooltip" class="tooltip">{{ tooltip }}</span>
    <slot name="before-content"></slot>
    <slot></slot>
    <slot name="after-content"></slot>
  </button>
</template>

<script>
export default {
  props: {
    withTooltip: { type: Boolean, default: false },
    tooltip: { type: String, default: '' },
    size: {
      type: String,
      default: 'normal',
      validator(value) {
        return ['small', 'normal'].includes(value)
      },
    },
    color: {
      type: String,
      default: 'primary',
      validator(value) {
        return ['primary', 'secondary'].includes(value)
      },
    },
    hoverable: { type: Boolean, default: true },
  },
  computed: {
    appliedClasses() {
      const classes = []
      if (this.color === 'primary') {
        classes.push('primary')
      } else {
        classes.push('secondary')
      }

      if (this.size === 'normal') {
        classes.push('normal')
      } else {
        classes.push('small')
      }

      if (this.hoverable) {
        classes.push('hoverable')
      }

      return classes.join(' ')
    },
  },
}
</script>

<style lang="scss" scoped>
button {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  transition: $default-transition;
  font-size: 16px;
  font-family: sans-serif;
  box-sizing: border-box;
  font-weight: bold;
  line-height: 1.1875;
  letter-spacing: 0.02857em;
  border: 0;
  cursor: pointer;
  position: relative;

  .tooltip {
    display: none;
    border-radius: 5px;
    padding: 3px;
    color: $white-color;
    background-color: $gray-color;
    position: absolute;
    font-size: 8px;
    top: -100%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &:hover {
    box-shadow: 0 0 2px $gray-color;
    transition: none;

    .tooltip {
      display: block;
    }
  }

  &.primary {
    background-color: $purple-color;
    border: 1px solid $purple-color;
    color: $white-color;
    transition: $default-transition;

    &.hoverable:hover {
      background-color: lighten($purple-color, 3%);
    }
  }

  &.secondary {
    background-color: $white-color;
    border: 1px solid #f2f2f9;
    color: $gray-color;

    &.hoverable:hover {
      background-color: $gray-color;
      color: $white-color;
    }
  }

  &.small {
    padding: 9px;
  }

  &.normal {
    padding: 12px;
  }
}
</style>
