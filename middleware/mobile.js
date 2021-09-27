export default function (context) {
  const userAgent = process.server
    ? context.req.headers['user-agent']
    : navigator.userAgent
  const isMobile = /mobile/i.test(userAgent)
  context.isMobile = isMobile
  context.store.commit('setMobileView', isMobile)
}
