<template>
  <div class="login">
    <div class="header">Вход</div>
    <div class="container">
      <ValidationObserver ref="form">
        <form @submit.prevent="submit">
          <ValidationProvider mode="passive" rules="login">
            <ValidationErrors v-show="isSubmited" :errors="invalidMessage" />
            <Input
              v-model.trim="email"
              i-placeholder="foo@example.com"
              i-label="Email"
              :style="inputStyles"
            />
          </ValidationProvider>
          <ValidationProvider mode="passive" rules="password">
            <Input
              v-model.trim="password"
              i-placeholder="password"
              i-label="Пароль"
            />
          </ValidationProvider>
          <Button :hoverable="false" color="secondary" :style="buttonStyles">
            Войти
          </Button>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
// import { strCapitalize } from '~/utils'
export default {
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  layout: 'login',
  data() {
    return {
      email: '',
      password: '',
      invalidMessage: ['Email или пароль не совпадают'],
      isSubmited: false,
    }
  },
  computed: {
    inputStyles: () => ({ paddingBottom: '0.5rem' }),
    buttonStyles: () => ({
      display: 'block',
      margin: '.5rem auto 0',
      width: 'calc(100% - 2rem)',
      borderRadius: '5px',
    }),
  },
  watch: {
    email() {
      this.isSubmited = false
      this.$refs.form.reset()
    },
    password() {
      this.isSubmited = false
      this.$refs.form.reset()
    },
  },
  methods: {
    // async submit(e) {
    //   const credentials = { email: 'foo@example.com', password: 'password' }

    //   const formData = new FormData()

    //   for (const name in credentials) {
    //     formData.append(name, credentials[name])
    //   }

    //   const data = await fetch('http://obscur.space/mkomov-test/sign-in', {
    //     method: 'POST',
    //     body: formData,
    //   }).then((res) => res.json())

    //   localStorage.token = `${strCapitalize(data.token_type)} ${
    //     data.access_token
    //   }`
    //   localStorage.expires = Date.now() + data.expires_in * 60
    // },
    submit() {
      this.$refs.form.validate().then((success) => {
        if (this.email && this.password) {
          if (success) {
            this.$store.commit('authenticate')
            this.$router.replace('/')
          } else {
            this.isSubmited = true
          }
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.header {
  font-size: 1.5rem;
  color: $gray-color;
  margin-bottom: 1rem;
}
.login {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.container {
  padding: 1rem;
  border-radius: 5px;
  background-color: $white-color;
}
</style>
