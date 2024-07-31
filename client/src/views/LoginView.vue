<template>
  <div class="">
    <div v-if="!$auth.loading" class="auth-container">
      <!-- show login when not authenticated -->
       <div v-if="!$auth.isAuthenticated" class="btn-container">
         <button  @click="login" class=" btn-primary">
           Log in
          </button>
        </div>
      <!-- show HomeView when authenticated -->
      <HomeView v-if="$auth.isAuthenticated" />
    </div>
  </div>
</template> 

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import HomeView from "./HomeView.vue";
import axios from "axios";

@Component({
  components: {
    HomeView,
  },
})
export default class LoginView extends Vue {
  login() {
    this.$auth.loginWithRedirect({});
  }

  handlecreateAppUser() {
    try {
      this.$auth.getUser().then((user) => {
        const userData = {
          uuid: user.id,
          name: user.name,
          userName: user.email,
        };
        axios
          .post("http://localhost:3000/createAppUser", userData)
          .then((response) => {
            // console.log("App_User created Successfully", response.data);
          })
          .catch((error) => {
            console.log("Error:", error.response.data);
          });
      });
    } catch (e) {
      console.log("Error:", e.message);
    }
  }

  @Watch("$auth.isAuthenticated")
  onAuthChanged(newVal: boolean) {
    if (newVal) {
      this.handlecreateAppUser();
    }
  }
}
</script>

<style scoped>
.auth-container {
  text-align: center;
}
.btn-container{
  width: 100%;
  height: 100vh;
  margin: auto;
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
