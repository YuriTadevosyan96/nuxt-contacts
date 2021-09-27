<template>
  <div class="contact" :class="appliedClasses">
    <div class="contacts-info">
      <img
        :src="require(`~/assets/images/profiles/${image}.svg`)"
        class="profile-image"
        alt="Profile Image"
      />
      <div class="credentials">
        <h5 class="name">{{ name }}</h5>
        <div class="role">{{ role }}</div>
      </div>
    </div>
    <div class="actions">
      <template v-for="icon in icons">
        <Button
          v-if="icon.includes('chat')"
          :key="icon"
          size="small"
          color="secondary"
          :hoverable="false"
          :style="actionButtonStyles"
          @click.prevent="showSendMessageModal"
        >
          <img :src="require(`~/assets/images/icons/${icon}.svg`)" />
        </Button>
        <Button
          v-else-if="icon.includes('phone')"
          :key="icon"
          size="small"
          color="secondary"
          :hoverable="false"
          :style="actionButtonStyles"
          @click.prevent="callMainPhone"
        >
          <img :src="require(`~/assets/images/icons/${icon}.svg`)" />
        </Button>
        <Button
          v-else
          :key="icon"
          size="small"
          color="secondary"
          :hoverable="false"
          :style="actionButtonStyles"
          @click.prevent="toggleContextMenu"
          @blur="hideContextMenu"
        >
          <context-menu
            v-show="isContextMenuActive"
            :edit-id="contactId"
            :is-first-item="isFirstItem"
            @click.prevent.stop="hideContextMenu"
            @delete="showDeleteContactModal"
          />
          <img :src="require(`~/assets/images/icons/${icon}.svg`)" />
        </Button>
      </template>
    </div>
  </div>
</template>

<script>
import ContextMenu from '../ContextMenu.vue'
export default {
  components: { ContextMenu },
  props: {
    isFirstItem: {
      type: Boolean,
    },
    mainPhone: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: 'Name',
    },
    role: {
      type: String,
      default: 'Role',
    },
    image: {
      type: Number,
      default: 2,
    },
    contactId: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      isContextMenuActive: false,
    }
  },
  computed: {
    appliedClasses() {
      return this.$route.params.id === this.contactId ? 'active' : ''
    },
    actionButtonStyles: () => ({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '36px',
      width: '36px',
      marginRight: '6px',
    }),
    icons() {
      return this.$route.params.id === this.contactId
        ? ['chat-active', 'phone-active', 'three-dots-active']
        : ['chat', 'phone', 'three-dots']
    },
  },

  methods: {
    showSendMessageModal() {
      this.$store.commit('setContactIdToSendMessage', this.contactId)
      this.$store.commit('sendMessageModalToggle', true)
      this.$store.commit('blurBackground', true)
    },
    callMainPhone() {
      window.open(`tel:${this.mainPhone}`, '_self')
    },
    toggleContextMenu() {
      this.isContextMenuActive = !this.isContextMenuActive
    },
    hideContextMenu() {
      this.isContextMenuActive = false
    },
    showDeleteContactModal() {
      this.$store.commit('setContactIdToDelete', this.contactId)
      this.$store.commit('deleteContactModalToggle', true)
      this.$store.commit('blurBackground', true)
    },
  },
}
</script>

<style lang="scss" scoped>
.contact {
  display: flex;
  margin-right: 3px;
  margin-bottom: 2px;
  justify-content: space-between;
  transition: $default-transition;
  padding: 16px 5px;

  &:hover,
  &.active {
    cursor: pointer;
    border-radius: 5px;
    background-color: $light-gray-color;
  }
}
.contacts-info {
  display: flex;
  margin-left: 0.5rem;
  margin-right: auto;
}
.profile-image {
  margin-right: 1rem;
}
.name,
.role {
  font-size: 14px;
  line-height: 21px;
}
.name {
  font-weight: bold;
  color: $black-color;
}
.role {
  font-weight: normal;
  color: $gray-color;
}
.actions {
  display: flex;
}
img {
  transition: $default-transition;
}
</style>
