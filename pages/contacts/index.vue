<template>
  <create-edit-contact />
</template>

<script>
import CreateEditContact from '../../components/contacts/CreateEditContact.vue'
export default {
  components: { CreateEditContact },
  layout: ({ isMobile }) => (isMobile ? 'mobile' : 'default'),
}
</script>
