<template>
  <div class="filter">
    <select v-model="sortBy">
      <option value="name">Имя</option>
      <option value="role">Должность</option>
    </select>
    <div class="order">
      <span class="asc" :class="activeAsc" @click="sortDir = 'asc'">
        <img src="~/assets/images/icons/angle-up.svg" alt="" />
      </span>
      <span class="desc" :class="activeDesc" @click="sortDir = 'desc'">
        <img src="~/assets/images/icons/angle-down.svg" alt="" />
      </span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sortBy: 'name',
      sortDir: 'asc',
    }
  },
  computed: {
    activeAsc() {
      return this.sortDir === 'asc' ? 'active-order' : ''
    },
    activeDesc() {
      return this.sortDir === 'desc' ? 'active-order' : ''
    },
    searchParams() {
      return this.$store.state.searchParams
    },
  },
  watch: {
    sortBy(sortBy) {
      this.filterContacts({ sortBy })
    },
    sortDir(sortDir) {
      this.filterContacts({ sortDir })
    },
  },
  methods: {
    filterContacts(param) {
      this.$store.dispatch('getContacts', {
        ...this.searchParams,
        ...param,
        offset: 0,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.filter {
  display: flex;
  padding: 0 10px;
  margin-bottom: 0.5rem;
}
select {
  padding: 0.1rem;
  border-radius: 3px;
  border: 1px solid $light-gray-color;
  background-color: $main-color;
  width: 100px;
  color: $gray-color;
  text-align: center;
  cursor: pointer;
  margin-right: 13px;
  transition: $default-transition;
  /* for Firefox */
  -moz-appearance: none;
  /* for Chrome */
  -webkit-appearance: none;
}

select:hover {
  background-color: $white-color;
}

select:focus {
  outline: none;
  box-shadow: 0 0 2px $gray-color;
}
/* For IE10 */
select::-ms-expand {
  display: none;
}
.order {
  display: flex;
  flex-direction: column;
}
.order .asc,
.order .desc {
  padding: 3px;
  font-size: 0.5rem;
  cursor: pointer;
  transition: $default-transition;
  border-radius: 2px;
}
.order .asc:hover,
.order .desc:hover,
.active-order {
  background-color: $white-color;
}
</style>
