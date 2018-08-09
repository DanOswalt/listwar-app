import Firebase from 'firebase'
// Required for side-effects
import 'firebase/firestore'

const config = {
  apiKey: 'AIzaSyDZmpc8Q4adwXQlsc5FdPRAWlDgLHOUleY',
  authDomain: 'listwar-1cc22.firebaseapp.com',
  databaseURL: 'https://listwar-1cc22.firebaseio.com',
  projectId: 'listwar-1cc22',
  storageBucket: '',
  messagingSenderId: '1043322842769'
}

const firebaseApp = Firebase.initializeApp(config)

const settings = {
  timestampsInSnapshots: true
}

firebaseApp.firestore().settings(settings)

export default firebaseApp.firestore()
