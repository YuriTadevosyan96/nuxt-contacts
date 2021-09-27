export default function ({ store, redirect, route }) {
  if (!store.state.isAuth) {
    if (route.name !== 'login') {
      if (process.server) {
        return redirect('/login')
      } else {
        return window.location.replace('/login')
      }
    }
  }
}
