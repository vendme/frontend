import Axios from 'axios'

export default function tokenDateChecker() {
  try {
    const { idToken, expires_at } = JSON.parse(localStorage.getItem('idToken'))
    if (expires_at >= Date.now()) {
      Axios.defaults.headers.common['Authorization'] = idToken
      return true
    } else {
      return false
    }
  } catch (e) {
    console.log(e)
  }
}
