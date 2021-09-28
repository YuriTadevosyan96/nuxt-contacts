<template>
  <div
    ref="contactList"
    class="contact-list"
    :style="contactListStyles"
    @scroll="infiniteScroll"
  >
    <h4 v-if="error" class="error">{{ error }}</h4>
    <Loader v-else-if="loading" :style="loaderStyles" />
    <ul v-else>
      <li v-for="(contact, index) in contacts" :key="contact._id">
        <nuxt-link :to="`/contacts/${contact._id}`">
          <contacts-contact
            :is-first-item="index === 0"
            :main-phone="contact.phones[0]"
            :name="contact.name"
            :contact-id="contact._id"
            :role="contact.role"
            :image="Math.ceil(Math.random() * 4)"
          />
        </nuxt-link>
      </li>
      <h3 v-if="noContactsFound" class="not-found">Контакты не найдены</h3>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    activateInfiniteScroll: { type: Boolean },
    contactListDynamicHeight: { type: String, default: 'auto' },
  },
  data() {
    return {
      parentHeight: 0,
      contactListStyles: {
        height: 'auto',
      },
    }
  },
  computed: {
    loaderStyles: () => ({
      display: 'block',
      margin: '2rem auto',
    }),
    contacts() {
      return this.$store.state.contacts.data
    },
    noContactsFound() {
      return (
        this.contacts.length === 0 &&
        this.$store.state.searchParams.search !== ''
      )
    },
    totalContacts() {
      return this.$store.state.totalContacts
    },
    searchParams() {
      return this.$store.state.searchParams
    },
    loading() {
      return this.$store.state.contacts.loading
    },
    error() {
      return this.$store.state.contacts.error
    },
    isMobile() {
      return this.$store.state.isMobile
    },
  },
  mounted() {
    if (this.isMobile) {
      this.contactListStyles.height = this.contactListDynamicHeight

      if (this.$el.offsetHeight > window.innerHeight) {
        this.calculateHeight()
      }
    }
  },
  updated() {
    if (this.isMobile) {
      if (this.$el.offsetHeight > window.innerHeight) {
        this.calculateHeight()
      }
    } else {
      this.calculateHeight()
    }
  },
  methods: {
    infiniteScroll() {
      if (this.activateInfiniteScroll) {
        const el = this.$refs.contactList
        if (Math.ceil(el.scrollTop + el.clientHeight) >= el.scrollHeight) {
          const { offset, limit } = this.searchParams
          if (offset + limit - this.totalContacts < limit) {
            this.$store.dispatch('getContacts', {
              ...this.searchParams,
              offset: offset + limit,
            })
          }
        }
      }
    },
    calculateHeight() {
      // calculate height dynamically
      this.parentHeight = this.$parent.$el.offsetHeight
      const height = this.$el.offsetHeight
      if (this.parentHeight > window.innerHeight) {
        this.contactListStyles.height =
          height - (this.parentHeight - window.innerHeight) + 'px'
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.contact-list {
  margin-bottom: 1rem;
  overflow-y: auto;
}
.error {
  margin-top: 2rem;
  text-align: center;
}
.not-found {
  text-align: center;
  margin-top: 2rem;
  color: $black-color;
}
</style>
