const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  menus: state => state.user.menus,
  intervalId: state => state.user.intervalId,
  canteenList: state => state.user.canteenList,
  canteenId: state => state.user.canteenId
}
export default getters
