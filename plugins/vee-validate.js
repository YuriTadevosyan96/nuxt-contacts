import { extend } from 'vee-validate'
import { required, email } from 'vee-validate/dist/rules'

extend('phone', {
  message: () => 'Телефонный номер не полный',
  validate: (value) => /^(\+7|8)(\d{10})$/.test(value),
})
extend('login', {
  validate: (value) => value === 'foo@example.com',
})
extend('password', {
  validate: (value) => value === 'password',
})
extend('required', {
  ...required,
  message: 'Обязательное поле',
})
extend('email', {
  ...email,
  message: 'Неправильный формат Email-a',
})
