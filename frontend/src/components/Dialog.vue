<template>
  <v-layout row justify-center>
    <v-dialog v-model="isOpen" persistent max-width="500px">
      <!-- <v-btn color="primary" dark slot="activator">Login</v-btn> -->
      <v-card>

        <v-card-text class="text-xs-center">
          <img src="@/assets/loginlogo.png" width="50%" alt="Vuetify.js" class="">
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs2 class="pa-4">
                <v-icon>account_box</v-icon>
              </v-flex>
              <v-flex xs10>
                <v-text-field v-model="email" label="Email" required></v-text-field>
              </v-flex>
              <v-flex xs2 class="pa-4">
                <v-icon>account_box</v-icon>
              </v-flex>
              <v-flex xs10>
                <v-text-field v-model="password" label="Password" required></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="closeDialog(); login()">Login</v-btn>
          <v-btn color="blue darken-1" flat @click.native="closeDialog()">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import * as firebase from 'firebase'
firebase.initializeApp({
  apiKey: 'AIzaSyBA5J-Hn2Cl7GBxOZYBqb11B24ckd2yF1M',
  authDomain: 'gymapp-fd949.firebaseapp.com',
  databaseURL: 'https://gymapp-fd949.firebaseio.com',
  projectId: 'gymapp-fd949',
  storageBucket: 'gymapp-fd949.appspot.com',
  messagingSenderId: '871486720421'
})

export default {
  data () {
    return {
      email: '',
      password: '',
      auth: null
    }
  },
  props: {
    isOpen: {
      type: Boolean,
      required: true
    }
  },
  name: 'Dialog',
  mounted () {
    this.auth = firebase.auth()
    this.auth.onAuthStateChanged(user => {
      console.log(user)
      if (user) {
        alert('login success')
        console.log(user.email)
      }
    })
  },
  methods: {
    login () {
      console.log('login')
      this.auth
          .signInWithEmailAndPassword(this.email, this.password)
          .catch(error => {
            // const errorCode = error.code
            // const errorMessage = error.message
            alert('Error')
            console.log(error)
          })
      // Send to firebase for authentication
    },
    closeDialog () {
      this.$emit('close')
    }
  }
}
</script>