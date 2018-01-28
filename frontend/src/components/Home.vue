<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <img src="@/assets/swlogo.png" alt="Vuetify.js" class="mb-5 mt-5" width="50%">
        Page 1
        <blockquote>
          &#8220;Innovations towards a Healthy Lifestyle.&#8221;
          <footer>
            <small>
              <em>&mdash;Gym helper team.</em>
            </small>
          </footer>
        </blockquote>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
