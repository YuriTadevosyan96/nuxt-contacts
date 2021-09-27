<template>
  <div class="not-found">
    <div class="container">
      <h2 class="page-not-found">Страница не найдено</h2>
      <nuxt-link to="/" class="back-home">
        Перейти на главную страницу
      </nuxt-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.not-found {
  background-color: $main-color;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.page-not-found {
  text-align: center;
  color: $black-color;
  margin-bottom: 1rem;
}
.back-home {
  text-align: center;
  color: $black-color;
  text-decoration: none;
}
</style>
