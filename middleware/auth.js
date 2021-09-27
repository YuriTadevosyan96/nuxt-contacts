export default function ({ store, redirect, route, base }) {
  if (!store.state.isAuth) {
    if (route.name !== 'login') {
      if (process.server) {
        return redirect('/login')
      } else {
        return window.location.replace(base + 'login')
      }
    }
  }
}
