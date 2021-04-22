import { ref, onUnmounted } from "vue"
import firebase from "firebase/app"
import { useAuth } from "@vueuse/firebase"
import "firebase/auth"
import "firebase/firestore"

import { firebaseConfig } from "~/config/firebase"
import { useIdle } from "@vueuse/core"

firebase.initializeApp(firebaseConfig)

const { auth, firestore } = firebase
const { GoogleAuthProvider } = auth
const db = firestore()

const { isAuthenticated, user } = useAuth()

export const authentication = () => {
  const googlePopup = () => auth().signInWithPopup(new GoogleAuthProvider())
  const signOut = () => auth().signOut()
  return { googlePopup, signOut, isAuthenticated, user }
}

export const database = () => {
  const messages = ref([])

  const messageCollection = db.collection("messages")
  const messageQuery = messageCollection.orderBy("createdAt", "desc").limit(100)

  const unsubscribe = messageQuery.onSnapshot((s) => {
    messages.value = s.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .reverse()
  })

  onUnmounted(unsubscribe)

  const sendMessage = (text) => {
    if (!isAuthenticated.value) return
    const { photoURL, uid, displayName } = user.value
    messageCollection.add({
      userName: displayName,
      userId: uid,
      userPhotoURL: photoURL,
      text,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    })
  }

  return { messages, sendMessage }
}
