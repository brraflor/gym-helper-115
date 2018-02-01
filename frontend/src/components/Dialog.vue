<template>
  <div v-html="login">
  </div>
</template>

<script>
export default {
  data() {
    return {
      // Just like JSX! Oh wait...
      login: `
        <FONT color="#faddad" size="-2">
          <MARQUEE>Please enter your name to continue.</MARQUEE>
          ...
        </FONT>
      `
    }
  }
}
</script>
