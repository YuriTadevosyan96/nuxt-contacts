import { contacts } from '../mocks/contacts'

export const state = () => ({
  isAuth: false,
  isMobile: false,
  searchParams: {
    offset: 0,
    limit: 5,
    sortBy: 'name', // 'name|role'
    sortDir: 'asc', // 'asc|desc'
    search: '',
  },
  contacts: {
    data: [],
    error: null,
    loading: false,
  },
  draftMessagesToSend: {},
  totalContacts: contacts.items.length,
  isBackgroundBlurred: false,
  isDeleteContactModalActive: false,
  isSendMessageModalActive: false,
  contactIdToDelete: null,
  contactIdToSendMessage: null,
  singleContact: {
    data: {},
    error: null,
    loading: false,
  },
  lastCreatedEditedContactId: null,
})

export const getters = {}

export const actions = {
  getContacts({ commit }, params) {
    const { search, sortBy, sortDir, offset, limit } = params
    commit('loadingContacts', true)
    const filteredContacts = contacts.items
      .filter(
        (contact) =>
          new RegExp(search, 'iu').test(contact.name) ||
          contact.emails.some((email) =>
            new RegExp(search, 'iu').test(email)
          ) ||
          contact.phones.some((phone) => new RegExp(search, 'ui').test(phone))
      )
      .sort((a, b) => {
        if (sortBy === 'name' && sortDir === 'asc') {
          return a.name.localeCompare(b.name)
        } else if (sortBy === 'name' && sortDir === 'desc') {
          return b.name.localeCompare(a.name)
        } else if (sortBy === 'role' && sortDir === 'asc') {
          return a.role.localeCompare(b.role)
        }
        return b.role.localeCompare(a.role)
      })

    setTimeout(() => {
      commit('contactsSuccess', { contacts: filteredContacts, limit, offset })
      commit('setSearchParams', params)
      commit('loadingContacts', false)
    }, 2000)
  },

  getSingleContact({ commit }, contactId) {
    commit('loadingSingleContact', true)
    setTimeout(() => {
      const foundContact = contacts.items.find(
        (contact) => contact._id === contactId
      )
      if (foundContact) {
        commit('singleContactSuccess', foundContact)
      } else {
        commit('singleContactFail')
      }
      commit('loadingSingleContact', false)
    }, 2000)
  },

  deleteContact({ dispatch, state }, routeMatch) {
    contacts.items = contacts.items.filter(
      (contact) => contact._id !== state.contactIdToDelete
    )
    dispatch('getContacts', state.searchParams)
    if (routeMatch) {
      dispatch('getSingleContact', state.contactIdToDelete)
    }
  },
}

export const mutations = {
  filterContacts(state) {},

  setSearchParams(state, params) {
    state.searchParams = { ...state.searchParams, ...params }
  },

  loadingContacts(state, loading) {
    state.contacts.loading = loading
  },

  contactsSuccess(state, { contacts, offset, limit }) {
    state.contacts.data = contacts.filter((_, index) => {
      return index < offset + limit
    })
    state.totalContacts = contacts.length
  },

  contactsFail(state) {
    state.contacts.data = []
    state.contacts.error = 'Произошла ошибка!'
  },

  loadingSingleContact(state, loading) {
    state.singleContact.loading = loading
  },

  singleContactSuccess(state, contact) {
    state.singleContact.error = null
    state.singleContact.data = contact
  },

  singleContactFail(state) {
    state.singleContact.data = {}
    state.singleContact.error = 'Контакт не найден!'
  },

  createEditContact(state, contactData) {
    // edit contact
    if (contactData._id) {
      contacts.items = contacts.items.map((contact) =>
        contact._id === contactData._id ? contactData : contact
      )
      state.contacts.data = state.contacts.data.map((contact) =>
        contact._id === contactData._id ? contactData : contact
      )
      state.lastCreatedEditedContactId = contactData._id
    } else {
      // create contact
      contactData._id = `${Date.now()}${Math.random()}`
      contacts.items.push(contactData)
      state.contacts.data.push(contactData)
      state.lastCreatedEditedContactId = contactData._id
    }
  },

  blurBackground(state, isBlur) {
    isBlur
      ? (state.isBackgroundBlurred = true)
      : (state.isBackgroundBlurred = false)
  },

  deleteContactModalToggle(state, open) {
    open
      ? (state.isDeleteContactModalActive = true)
      : (state.isDeleteContactModalActive = false)
  },

  sendMessageModalToggle(state, open) {
    open
      ? (state.isSendMessageModalActive = true)
      : (state.isSendMessageModalActive = false)
  },

  setContactIdToDelete(state, id) {
    state.contactIdToDelete = id
  },

  setContactIdToSendMessage(state, id) {
    state.contactIdToSendMessage = id
  },

  setDraftMessage(state, { message, userId }) {
    state.draftMessagesToSend[userId] = message
  },

  removeDraftMessage(state, id) {
    delete state.draftMessagesToSend[id]
  },

  authenticate(state) {
    state.isAuth = true
  },

  setMobileView(state, isMobile) {
    state.isMobile = isMobile
  },
}
