<template>
  <v-app>
    <v-toolbar
      app
      class="primary"
      :clipped-left="clipped"
    >
      <v-toolbar-title class="white--text">GYM Helper</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon color="white">menu</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <router-view/>
      <Dialog :isOpen="dialog" @close="() => {dialog = false}"></Dialog>
    </v-content>
    <v-navigation-drawer
      temporary
      :right="right"
      v-model="rightDrawer"
      fixed
      app
    >
      <v-list>
        <v-list-tile @click="dialog = true" >
          <v-list-tile-action>
            <v-icon>account_box</v-icon>
          </v-list-tile-action>
          <v-list-tile-title class="primary--text">LOGIN</v-list-tile-title>
        </v-list-tile>
        <router-link :to="{'name': 'Home'}" style="text-decoration: none;">
          <v-list-tile @click="" >
            <v-list-tile-action>
              <v-icon>home</v-icon>
            </v-list-tile-action>
              <v-list-tile-title class="primary--text">Home</v-list-tile-title>
          </v-list-tile>
        </router-link>
        <router-link :to="{'name': 'Page2'}" style="text-decoration: none;">
          <v-list-tile @click="" >
            <v-list-tile-action>
              <v-icon>account_box</v-icon>
            </v-list-tile-action>
              <v-list-tile-title class="primary--text">Page 2</v-list-tile-title>
          </v-list-tile>
        </router-link>
      </v-list>
    </v-navigation-drawer>
  </v-app>
</template>

<script>
import Dialog from '@/components/Dialog'

export default {
  components: {
    Dialog
  },
  data () {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [{
        icon: 'bubble_chart',
        title: 'Inspire'
      }],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
      dialog: false
    }
  },
  name: 'App',
  methods: {}
}
</script>
