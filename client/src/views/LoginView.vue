<template>
  <div class="home">
    <div v-if="!$auth.loading">
      <!-- show login when not authenticated -->
      <button v-if="!$auth.isAuthenticated" @click="login">Log in</button>
      <!-- show logout when authenticated -->
      <!-- <button v-if="$auth.isAuthenticated" @click="logout">Log out</button> -->
      <HomeView v-if="$auth.isAuthenticated"/>
    </div>
  </div>
</template> 
  
  <script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import HomeView from "./HomeView.vue";
@Component({
  components: {
    HomeView
  },
})
export default class LoginView extends Vue {
  login () {
    this.$auth.loginWithRedirect({})
  }

}
</script>
  
  <style scoped>
</style>
  