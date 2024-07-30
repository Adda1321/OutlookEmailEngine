<template>
  <div class="">
    <div v-if="!$auth.loading" class="auth-container">
      <!-- show login when not authenticated -->
      <button v-if="!$auth.isAuthenticated" @click="login" class="btn-primary">Log in</button>
      <!-- show HomeView when authenticated -->
      <HomeView v-if="$auth.isAuthenticated"/>
    </div>
  </div>
</template> 

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HomeView from "./HomeView.vue";
import axios from "axios";

@Component({
  components: {
    HomeView
  },
})
export default class LoginView extends Vue {
  login() {
    this.$auth.loginWithRedirect({})
  }
}
</script>

<style scoped> 

.auth-container {
  text-align: center;
}

.btn-primary {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
}

.btn-primary:hover {
  background-color: #0056b3;
}

</style>
