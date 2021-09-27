<template>
  <div class="search">
    <div class="header">Поиск контакта</div>
    <div class="search-container">
      <Input
        v-model.trim="search"
        i-placeholder="Имя, адрес электронной почты или номер"
        class="search-input"
        :with-label="false"
        @change="searchContacts"
      />
      <img src="~/assets/images/icons/search.svg" alt="Search Icon" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: '',
    }
  },
  computed: {
    searchParams() {
      return this.$store.state.searchParams
    },
  },
  methods: {
    searchContacts() {
      this.$store.dispatch('getContacts', {
        ...this.searchParams,
        search: this.search,
        offset: 0,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.search {
  padding: 0 10px;
}
.header {
  color: $gray-color;
  font-size: 14px;
  line-height: 21px;
  margin-bottom: 8px;
}
.search-container {
  display: flex;
  align-items: center;
  margin-bottom: 18px;
}
.search-input {
  width: 100%;
  margin-right: 1rem;
}
</style>
