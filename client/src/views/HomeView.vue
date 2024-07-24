<template>
  <div>
    <nav class="navbar">
      <span class="navbar-brand">Logged in as: John Doe</span>
    </nav>

    <div class="button-container">
      <button class="primary-btn" v-if="!isAuthenticated" @click="handleLogin">Link Outlook Account</button>
      <button class="primary-btn" v-else @click="handlePageChange('mails')">Mails</button>
      <button class="primary-btn ml-4" v-if="!isAuthenticated && currentPage === 'link-account'" @click="handlePageChange('link-account')">Link Account</button>
    </div>

    <Mails v-if="isAuthenticated && currentPage === 'mails'" :accountId="accountId" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
import Mails from "@/views/Mails.vue";
import Accounts from "@/views/Accounts.vue";

@Component({
  components: {
    Mails,
    Accounts
  }
})
export default class App extends Vue {
  isAuthenticated: boolean = false;
  currentPage: string = '';
  accountId: string = '';

  async checkAuthentication() {
    try {
      const response = await axios.get(
        "http://localhost:3000/isAuthenticated",
        { withCredentials: true }
      );
      // alert("isAuthenticated:"+response.data.isAuthenticated)
      this.isAuthenticated = response.data.isAuthenticated;
      this.accountId = response.data.account;
      if (this.isAuthenticated) {
        this.currentPage = 'mails';
      }
    } catch (error) {
      console.error("Error checking authentication status:", error);
    }
  }

  handlePageChange(page: string) {
    this.currentPage = page;
  }

  handleLogin() {
    window.location.href = "http://localhost:3000/auth/outlook";
  }

  mounted() {
    this.checkAuthentication();
  }
}
</script>

<style scoped>
.navbar {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.navbar-brand {
  font-size: 1.25rem;
  font-weight: 500;
}


.button-container {
  margin-top: 20px;
  text-align: center;
}

.primary-btn {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 4px;
}

.ml-4 {
  margin-left: 16px;
}
</style>
