<template>
  <contact-details />
</template>

<script>
import ContactDetails from '../../../components/contacts/ContactDetails.vue'
export default {
  components: { ContactDetails },
  layout: ({ isMobile }) => (isMobile ? 'mobile' : 'default'),
  scrollToTop: false,
}
</script>

<style lang="scss" scoped></style>
