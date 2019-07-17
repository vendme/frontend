import admin from './admin'

export async function verifyToken(token) {
  try {
    const decodedToken = await admin.auth().verifyIdToken(token)
    if (decodedToken) {
      console.log(decodedToken)
    } else {
      console.log('Invalid token')
    }
  } catch (e) {
    console.log(e)
  }
}
