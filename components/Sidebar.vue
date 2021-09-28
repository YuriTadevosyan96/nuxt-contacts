<template>
  <div class="sidebar" :class="isMobile && 'mobile'">
    <portal to="modals-portal">
      <modal
        v-if="isDeleteContactModalActive"
        confirm-text="Удалить контакт?"
        :is-confirm="true"
        @close="hideDeleteContactModal"
        @confirm="deleteContact"
      />
    </portal>
    <portal to="modals-portal">
      <modal v-if="isSendMessageModalActive" @close="hideSendMessageModal">
        <div class="send-message-container">
          <h4 class="message-receiver">
            Отправить сообщение "{{ messageReceiverName }}"
          </h4>
          <Input
            v-model="message"
            :value="message"
            i-type="textarea"
            :i-styles="sendMessageStyles"
          />
          <div class="send-message-actions">
            <Button :style="sendMessageActionStyles" @click="sendMessage">
              <slot name="before-content">
                <img
                  src="~/assets/images/icons/send-white.svg"
                  alt=""
                  class="send-message-icon"
                />
              </slot>
              <slot>Отправить</slot>
            </Button>
            <Button
              :style="cancelMessageActionStyles"
              color="secondary"
              :hoverable="false"
              @click="saveDraftMessage"
            >
              Отмена
            </Button>
          </div>
        </div>
      </modal>
    </portal>
    <Header ref="header" :with-border-bottom="!isMobile" />
    <div class="content">
      <Search ref="search" />
      <contacts-filter ref="filter" />
      <contact-list
        :activate-infinite-scroll="showMoreClicked"
        :contact-list-dynamic-height="contactListDynamicHeight"
      />
      <Button
        v-if="showMore"
        ref="button"
        color="secondary"
        :style="buttonStyles"
        :hoverable="false"
        @click="handleShowMore"
      >
        Ещё
      </Button>
    </div>
  </div>
</template>

<script>
import ContactList from './contacts/ContactList.vue'
import Header from './contacts/Header.vue'
import Search from './contacts/Search.vue'

export default {
  components: { Header, Search, ContactList },
  data() {
    return {
      showMoreClicked: false,
      messageReceiverName: '',
      message: '',
      contactListDynamicHeight: 'auto',
    }
  },
  computed: {
    isMobile() {
      return this.$store.state.isMobile
    },
    sendMessageStyles: () => ({ height: '200px' }),
    sendMessageActionStyles: () => ({ width: '150px', marginRight: '5rem' }),
    cancelMessageActionStyles: () => ({ width: '150px' }),
    isDeleteContactModalActive() {
      return this.$store.state.isDeleteContactModalActive
    },
    contactIdToSendMessage() {
      return this.$store.state.contactIdToSendMessage
    },
    isSendMessageModalActive() {
      return this.$store.state.isSendMessageModalActive
    },
    totalContacts() {
      return this.$store.state.totalContacts
    },
    searchParams() {
      return this.$store.state.searchParams
    },
    loading() {
      return (
        this.$store.state.contacts.loading ||
        this.$store.state.contacts.data.length === 0
      )
    },
    buttonStyles: () => ({ width: '110px', margin: 'auto', display: 'block' }),
    showMore() {
      return (
        !this.loading &&
        !this.showMoreClicked &&
        this.totalContacts > this.searchParams.limit - this.searchParams.offset
      )
    },
  },
  watch: {
    contactIdToSendMessage(id) {
      this.messageReceiverName = this.$store.state.contacts.data.find(
        (contact) => contact._id === id
      ).name
      const draftMessage = this.$store.state.draftMessagesToSend[id]
      if (draftMessage) {
        this.message = draftMessage
      } else {
        this.message = ''
      }
    },
  },
  mounted() {
    let height = 0
    for (const ref in this.$refs) {
      if (ref) {
        height += this.$refs[ref].$el.offsetHeight
      }
    }
    this.contactListDynamicHeight = window.innerHeight - height + 'px'
  },
  methods: {
    handleShowMore() {
      this.showMoreClicked = true
      const { limit, offset } = this.searchParams
      this.$store.dispatch('getContacts', {
        ...this.searchParams,
        offset: offset + limit,
      })
    },
    hideDeleteContactModal() {
      this.$store.commit('deleteContactModalToggle', false)
      this.$store.commit('blurBackground', false)
    },
    hideSendMessageModal() {
      this.$store.commit('sendMessageModalToggle', false)
      this.$store.commit('blurBackground', false)
    },
    deleteContact() {
      this.$store.commit('blurBackground', false)
      if (this.$store.state.contactIdToDelete === this.$route.params.id) {
        this.$store.dispatch('deleteContact', true)
      } else {
        this.$store.dispatch('deleteContact', false)
      }
    },
    saveDraftMessage() {
      if (this.message !== '') {
        this.$store.commit('setDraftMessage', {
          message: this.message,
          userId: this.contactIdToSendMessage,
        })
      }
      this.hideSendMessageModal()
    },
    sendMessage() {
      this.message = ''
      this.$store.commit('removeDraftMessage', this.contactIdToSendMessage)
      this.hideSendMessageModal()
    },
  },
}
</script>

<style lang="scss" scoped>
.sidebar {
  background-color: $main-color;
  max-width: 576px;
  width: 100%;
  min-height: 100vh;

  &.mobile {
    max-width: unset;
  }
}

/* .send-message-container {
} */
.message-receiver {
  color: $black-color;
  text-align: center;
  font-size: 14px;
  line-height: 32px;
}
.send-message-actions {
  display: flex;
  justify-content: space-between;
  padding-top: 19px;
}
.send-message-icon {
  margin-right: 0.5rem;
}
.content {
  padding: 27px 15px 24px;
}
</style>
