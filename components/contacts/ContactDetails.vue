<template>
  <div class="contact-details">
    <Loader v-if="loading" :class="isMobile && 'loader'" />
    <h3 v-else-if="isContactDeleted">Контакт удален</h3>
    <h3 v-else-if="error" class="error">{{ error }}</h3>
    <template v-else>
      <Header v-if="isMobile" background="light" class="main-header" />
      <div class="card">
        <contact-info
          v-if="isMobile"
          :is-mobile="isMobile"
          :bio="contact.bio"
          :emails="contact.emails"
          :phones="contact.phones"
        />
        <div class="header" :class="isMobile && 'mobile'">
          <img
            src="~/assets/images/profiles/3.svg"
            alt="Contact Image"
            class="contact-image"
          />
          <div class="main-info">
            <div class="container">
              <h4 class="contact-name">{{ contact.name }}</h4>
              <div class="contact-role">{{ contact.role }}</div>
            </div>
            <div class="actions">
              <Button @click="showSendMessageModal">
                <slot name="before-content">
                  <img
                    src="~/assets/images/icons/chat-white.svg"
                    alt=""
                    class="chat-icon"
                  />
                </slot>
                <slot>Сообщение</slot>
              </Button>
              <Button
                size="small"
                color="secondary"
                :hoverable="false"
                :style="actionButtonStyles"
                @click="callMainPhone"
              >
                <img :src="require(`~/assets/images/icons/phone.svg`)" />
              </Button>
              <Button
                size="small"
                color="secondary"
                :hoverable="false"
                :style="actionButtonStyles"
                @click="toggleContextMenu"
                @blur="hideContextMenu"
              >
                <context-menu
                  v-show="isContextMenuActive"
                  :edit-id="$route.params.id"
                  @delete="showDeleteContactModal"
                />
                <img :src="require(`~/assets/images/icons/three-dots.svg`)" />
              </Button>
            </div>
          </div>
        </div>
        <contact-info
          v-if="!isMobile"
          :is-mobile="isMobile"
          :bio="contact.bio"
          :emails="contact.emails"
          :phones="contact.phones"
        />
        <Button
          v-if="isMobile"
          :hoverable="false"
          color="secondary"
          class="go-back-button"
          @click="$router.push('/')"
        >
          <slot name="before-content">
            <img
              src="~/assets/images/icons/go-back.svg"
              alt=""
              class="go-back-icon"
            />
          </slot>
          <slot>Назад</slot>
        </Button>
      </div>
    </template>
  </div>
</template>

<script>
import ContextMenu from '../ContextMenu.vue'
import ContactInfo from './ContactInfo.vue'
import Header from './Header.vue'
export default {
  components: { ContextMenu, Header, ContactInfo },
  data() {
    return {
      isContextMenuActive: false,
    }
  },
  computed: {
    isMobile() {
      return this.$store.state.isMobile
    },
    actionButtonStyles: () => ({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '45px',
      width: '45px',
    }),
    contact() {
      return this.$store.state.singleContact.data
    },
    loading() {
      return this.$store.state.singleContact.loading
    },
    error() {
      return this.$store.state.singleContact.error
    },
    isContactDeleted() {
      return (
        this.error &&
        this.$store.state.contactIdToDelete === this.$route.params.id
      )
    },
  },
  mounted() {
    this.$store.dispatch('getSingleContact', this.$route.params.id)
  },
  methods: {
    showSendMessageModal() {
      this.$store.commit('setContactIdToSendMessage', this.$route.params.id)
      this.$store.commit('sendMessageModalToggle', true)
      this.$store.commit('blurBackground', true)
    },
    showDeleteContactModal() {
      this.$store.commit('setContactIdToDelete', this.$route.params.id)
      this.$store.commit('deleteContactModalToggle', true)
      this.$store.commit('blurBackground', true)
    },
    callMainPhone() {
      window.open(`tel:${this.contact.phones[0]}`, '_self')
    },
    toggleContextMenu() {
      this.isContextMenuActive = !this.isContextMenuActive
    },
    hideContextMenu() {
      this.isContextMenuActive = false
    },
  },
}
</script>

<style lang="scss" scoped>
.contact-details {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  flex-grow: 1;
}
.main-header {
  width: 100%;
}
.loader {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.error {
  text-align: center;
}
.header {
  display: flex;
  justify-content: center;
  margin-bottom: 39px;

  &.mobile {
    flex-wrap: wrap;
  }
}
.main-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.contact-image {
  width: 114px;
  height: 114px;
  border-radius: 26px;
  margin-right: 25px;
}
.contact-name {
  font-size: 20px;
  line-height: 32px;
  color: $black-color;
}

.contact-role {
  color: $gray-color;
  font-size: 14px;
  line-height: 21px;
}

.actions {
  display: flex;
  align-items: center;

  & button {
    margin-right: 0.8rem;
  }
}
.chat-icon {
  margin-right: 0.5rem;
}
.go-back-button {
  margin: 0 auto 20px 20px;
}
.go-back-icon {
  margin-right: 23px;
}
</style>
