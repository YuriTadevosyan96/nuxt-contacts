<template>
  <div class="container">
    <label v-if="withLabel">
      <span>{{ iLabel }}</span>
      <span v-if="required" class="required">*</span>
    </label>
    <input
      v-if="iType === 'input'"
      :value="value"
      type="text"
      :style="iStyles"
      :placeholder="iPlaceholder"
      @input="handleInput"
      @change="$emit('change')"
    />
    <textarea
      v-else
      :value="value"
      :style="iStyles"
      :placeholder="iPlaceholder"
      @input="handleInput"
    ></textarea>
  </div>
</template>

<script>
export default {
  props: {
    iStyles: { type: Object, default: () => ({}) },
    value: { type: String, default: '' },
    type: {
      type: String,
      default: 'text',
      validator: (value) => ['text', 'tel'].includes(value),
    },
    required: {
      type: Boolean,
      default: false,
    },
    withLabel: {
      type: Boolean,
      default: true,
    },
    iLabel: {
      type: String,
      default: '',
    },
    iPlaceholder: {
      type: String,
      default: '',
    },
    iType: {
      type: String,
      default: 'input',
      validator: (value) => ['input', 'textarea'].includes(value),
    },
  },
  methods: {
    handleInput(e) {
      let value = e.target.value
      if (this.type === 'tel') {
        const result = value.replace(/[^+\d]/g, '').match(/^(\+7|8)(\d{0,10})/)
        if (result) {
          value = result[1] + result[2]
          e.target.value = value
        }
      }
      this.$emit('input', value)
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
}
label {
  color: $gray-color;
  margin-bottom: 0.5rem;
}
.required {
  color: red;
  font-size: 1.3rem;
  margin-left: 0.5rem;
}
input,
textarea {
  border-radius: 0.25rem;
  width: 100%;
  background-color: $main-color;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.6;
  border: 1px solid $light-gray-color;
  border-radius: 0.25rem;
  margin-right: 1rem;
}
input:focus,
textarea:focus {
  outline: none;
  box-shadow: 0 0 2px $gray-color;
}
input::placeholder,
textarea::placeholder {
  font-size: 16px;
  line-height: 19px;
  font-weight: bold;
  color: $black-color;
}
</style>
