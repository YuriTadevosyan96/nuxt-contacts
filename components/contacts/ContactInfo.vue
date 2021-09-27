<template>
  <div class="body" :class="isMobile && 'mobile'">
    <div v-if="bio" class="bio-container">
      <div class="bio">Биография</div>
      <div class="bio-details">
        {{ bio }}
      </div>
    </div>
    <div class="emails-container">
      <div class="email">Email</div>
      <ul class="emails-details">
        <li v-for="email in emails" :key="email" class="email-item">
          {{ email }}
        </li>
      </ul>
    </div>
    <div class="phones-container">
      <div class="phone">Телефон</div>
      <ul class="phones-details">
        <li v-for="phone in phones" :key="phone" class="phone-item">
          {{ phone }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isMobile: { type: Boolean },
    bio: { type: String, default: '' },
    emails: { type: Array, default: () => [] },
    phones: { type: Array, default: () => [] },
  },
}
</script>

<style lang="scss" scoped>
.body {
  display: flex;
  flex-direction: column;

  &.mobile {
    flex-direction: column-reverse;
  }
}
.bio-container,
.emails-container,
.phones-container {
  display: flex;
}
.bio-container {
  margin-bottom: 50px;
}
.emails-container {
  margin-bottom: 24px;
}
.bio,
.email,
.phone {
  color: $gray-color;
  font-size: 14px;
  line-height: 21px;
}
.bio,
.email,
.phone {
  text-align: right;
  margin-right: 28px;
  width: 73px;
}
.phone-item,
.email-item {
  margin-bottom: 11px;
}
</style>
