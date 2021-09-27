<template>
  <div class="create-edit-contact">
    <div v-if="isEdit" class="errors-loaders">
      <Loader v-if="loading" />
      <h3 v-else-if="error">{{ error }}</h3>
    </div>
    <template v-if="!error && !loading">
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
      <h2 class="header">
        {{ isEdit ? 'Обновить контакт' : 'Создать новый контакт' }}
      </h2>
      <div class="form-container">
        <div class="required-fields">
          Поля со <span>*</span> обязательны для заполнения
        </div>
        <ValidationObserver v-slot="{ handleSubmit }">
          <form @submit.prevent="handleSubmit(submit)">
            <ValidationProvider v-slot="{ errors }" rules="required">
              <validation-errors :errors="errors" />
              <Input
                v-model.trim="name"
                :value="name"
                :required="true"
                :style="formFieldStyles"
                i-label="Имя"
              />
            </ValidationProvider>
            <ValidationProvider v-slot="{ errors }" rules="required">
              <validation-errors :errors="errors" />
              <Input
                v-model.trim="role"
                :value="role"
                :required="true"
                :style="formFieldStyles"
                i-label="Должность"
              />
            </ValidationProvider>
            <div
              v-for="email in emails"
              :key="email.id"
              class="emails-container"
            >
              <ValidationProvider v-slot="{ errors }" rules="required|email">
                <validation-errors :errors="errors" />
                <Input
                  v-model.trim="email.value"
                  :value="email.value"
                  :required="true"
                  i-label="Email"
                />
              </ValidationProvider>
              <Button
                v-if="emails.length > 1"
                :style="actionButtonStyles"
                type="button"
                :hoverable="false"
                color="secondary"
                @click="removeEmail(email.id)"
              >
                <img src="~/assets/images/icons/close.svg" alt="" />
              </Button>
            </div>
            <Button
              type="button"
              :hoverable="false"
              color="secondary"
              :style="formFieldStyles"
              @click="addEmail"
            >
              Добавить Email
            </Button>
            <div class="phones-syntax">
              Номера телефонов должны начинаться с +7 или 8
            </div>
            <div
              v-for="(phone, index) in phones"
              :key="phone.id"
              class="phones-container"
            >
              <ValidationProvider v-slot="{ errors }" rules="phone|required">
                <validation-errors :errors="errors" />
                <Input
                  v-model.trim="phone.value"
                  :value="phone.value"
                  type="tel"
                  :required="true"
                  i-label="Tелефон"
                />
              </ValidationProvider>
              <Button
                v-if="index !== 0"
                :with-tooltip="true"
                tooltip="Сделать основным номером телефона"
                :style="actionButtonStyles"
                type="button"
                :hoverable="false"
                color="secondary"
                @click="setMainPhone(phone.id)"
              >
                <img
                  src="~/assets/images/icons/go-back.svg"
                  alt=""
                  class="set-main-phone"
                />
              </Button>
              <Button
                v-if="phones.length > 1"
                :style="actionButtonStyles"
                type="button"
                :hoverable="false"
                color="secondary"
                @click="removePhone(phone.id)"
              >
                <img
                  src="~/assets/images/icons/close.svg"
                  alt=""
                  class="main-phone-icon"
                />
              </Button>
            </div>
            <Button
              type="button"
              :hoverable="false"
              color="secondary"
              :style="formFieldStyles"
              @click="addPhone"
            >
              Добавить Телефон
            </Button>
            <Input
              v-model.trim="bio"
              :value="bio"
              :style="formFieldStyles"
              i-type="textarea"
              i-label="Био"
            />
            <Button>{{ isEdit ? 'Обновить' : 'Создать' }}</Button>
          </form>
        </ValidationObserver>
      </div>
    </template>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import ValidationErrors from '../ValidationErrors.vue'
export default {
  components: {
    ValidationObserver,
    ValidationProvider,
    ValidationErrors,
  },
  data() {
    return {
      name: '',
      role: '',
      emails: [{ id: Math.random(), value: '' }],
      phones: [{ id: Math.random(), value: '' }],
      bio: '',
    }
  },
  computed: {
    isMobile() {
      return this.$store.state.isMobile
    },
    contact() {
      return this.$store.state.singleContact.data
    },
    loading() {
      return this.$store.state.singleContact.loading
    },
    error() {
      return this.$store.state.singleContact.error
    },
    isEdit() {
      return this.$route.name === 'contacts-id-edit'
    },
    lastCreatedEditedContactId() {
      return this.$store.state.lastCreatedEditedContactId
    },
    formFieldStyles: () => ({ marginBottom: '1rem' }),
    actionButtonStyles: () => ({ marginLeft: '1rem' }),
  },
  watch: {
    contact() {
      this.getContactData()
    },
  },
  mounted() {
    if (this.isEdit) {
      this.$store.dispatch('getSingleContact', this.$route.params.id)
      if (this.contact._id) {
        this.getContactData()
      }
    }
  },
  methods: {
    getContactData() {
      if (this.isEdit && !this.error) {
        const { name, role, emails, phones, bio } = this.contact
        this.name = name
        this.role = role
        this.emails = emails.map((email) => ({
          id: Math.random(),
          value: email,
        }))
        this.phones = phones.map((phone) => ({
          id: Math.random(),
          value: phone,
        }))
        this.bio = bio
      }
    },
    submit(e) {
      this.$store.commit('createEditContact', {
        _id: this.isEdit && this.$route.params.id,
        name: this.name,
        role: this.role,
        bio: this.bio,
        emails: this.emails.map((email) => email.value),
        phones: this.phones.map((phone) => phone.value),
      })
      this.$router.push(`/contacts/${this.lastCreatedEditedContactId}`)
    },
    addEmail() {
      this.emails.push({ id: Math.random(), value: '' })
    },
    removeEmail(emailId) {
      this.emails = this.emails.filter((email) => email.id !== emailId)
    },
    addPhone() {
      this.phones.push({ id: Math.random(), value: '' })
    },
    removePhone(phoneId) {
      this.phones = this.phones.filter((phone) => phone.id !== phoneId)
    },
    setMainPhone(phoneId) {
      const newMainPhone = this.phones.find((phone) => phone.id === phoneId)
      this.phones = this.phones.filter((phone) => phone.id !== phoneId)
      this.phones.unshift(newMainPhone)
    },
  },
}
</script>

<style lang="scss" scoped>
.go-back-button {
  margin-right: auto;
  margin-bottom: 1rem;
}
.go-back-icon {
  margin-right: 20px;
}
.create-edit-contact {
  background-color: $white-color;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  overflow-y: auto;
  padding: 2rem 1rem;
}
.errors-loaders {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  text-align: center;
}
.header {
  text-align: center;
  color: $black-color;
  margin-bottom: 1rem;
}
form {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.required-fields {
  text-align: center;
  color: $gray-color;
  margin-bottom: 1rem;
  span {
    color: red;
    font-size: 1.2rem;
  }
}
.emails-container,
.phones-container {
  display: flex;
  align-items: flex-end;
  margin-bottom: 1rem;
}
.phones-syntax {
  text-align: center;
  color: $gray-color;
  margin-bottom: 1rem;
}
.set-main-phone {
  transform: rotateZ(180deg);
}
</style>
