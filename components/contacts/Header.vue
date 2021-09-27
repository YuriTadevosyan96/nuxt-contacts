<template>
  <div class="header" :class="appliedClasses">
    <img
      class="image"
      src="~/assets/images/profiles/1.svg"
      alt="Profile Image"
    />
    <h2 class="description">{{ description }}</h2>
    <nuxt-link to="/contacts/">
      <Button color="secondary" :hoverable="false" class="add-contact">
        <img src="~/assets/images/icons/add-friend.svg" alt="" />
      </Button>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    background: {
      type: String,
      default: 'normal',
      validator(value) {
        return ['normal', 'light'].includes(value)
      },
    },
    withBorderBottom: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      default: 'Контакты',
    },
  },
  computed: {
    appliedClasses() {
      const classes = []

      if (this.withBorderBottom) {
        classes.push('with-border-bottom')
      }

      if (this.background === 'light') {
        classes.push('light')
      }

      return classes.join(' ')
    },
  },
}
</script>

<style lang="scss" scoped>
.header {
  padding: 20px;
  background-color: $main-color;
  display: flex;
  align-items: center;

  &.with-border-bottom {
    border-bottom: 1px solid $light-gray-color;
  }

  &.light {
    background-color: $white-color;
  }
}
.image {
  border-radius: 8px;
  margin-right: 38px;
}
.description {
  font-size: 20px;
  line-height: 32px;
  margin-right: auto;
  color: $black-color;
}
.add-contact {
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
