<template>
  <div v-if="!$auth.loading">
    <nav   class="navbar">
    <div class="navbar-left">
      <img :src="userPicture" class="user-picture" alt="User Picture">

      <div class="user-info">
        <h2>{{ $auth.user.name }}</h2>
        <p>{{ $auth.user.email }}</p>
      </div>
    </div>
    <div class="navbar-right">
      <button class="primary-btn2" v-if="$auth.isAuthenticated" @click="logout">Log out</button>
    </div>
  </nav>

    <div class="button-container">
      <button class="primary-btn" v-if="!isAuthenticated" @click="handleLogin">
        Link Outlook Account
      </button>
      <button class="primary-btn" v-else @click="handlePageChange('mails')">
        Mails
      </button>
      <button 
        class="primary-btn ml-4"
        v-if="!isAuthenticated && currentPage === 'link-account'"
        @click="handlePageChange('link-account')"
      >
        Link Account
      </button>
    </div>

    <Mails
      v-if="isAuthenticated && currentPage === 'mails'"
      :account="account"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
import Mails from "@/views/Mails.vue";

import { Auth0Plugin } from '../auth'

interface Account {
  refreshToken: string;
  email: string;
  id: string;
  accessToken: string;
}
@Component({
  components: {
    Mails
  }
})

export default class HomeView extends Vue {
  isAuthenticated: boolean = false;
  currentPage: string = '';
  account: Account ;
  $auth!: Auth0Plugin; // Adjust 'Auth' to the type used in your plugin

 
  get userPicture(): string {
    return this.$auth.user ? this.$auth.user.picture : '';
  }

  async checkAuthentication() {
    try {
      const response = await axios.get(
        "http://localhost:3000/isAuthenticated",
        { withCredentials: true }
      );
      this.isAuthenticated = response.data.isAuthenticated;
      this.account = response.data.account;
      if (this.isAuthenticated) {
        this.currentPage = 'mails';
      }
    } catch (error) {
      console.error("Error checking authentication status:", error);
    }
  }

  logout () {
    this.$auth.logout({
      returnTo: window.location.origin
    })
  }
  handlePageChange(page: string) {
    this.currentPage = page;
  }

  handleLogin() {
    window.location.href = "http://localhost:3000/auth/outlook";
  }

  mounted() {
  console.log('Auth plugin value:', this.$auth);

    this.checkAuthentication();
    // console.log('Value of $auth:', this.$auth.user);

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
.navbar {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.navbar-left {
  display: flex;
  align-items: center;
}

.user-picture {
  border-radius: 50%;
  width: 40px;
  height: 40px;
  margin-right: 15px;
}

.user-info {
  display: flex;
  flex-direction: column;
}

.user-info h2 {
  margin: 0;
  font-size: 18px;
}

.user-info p {
  margin: 0;
  font-size: 14px;
  opacity: 0.8;
}

.navbar-right {
  display: flex;
  align-items: center;
}

.primary-btn2 {
  background-color: white;
  color: #007bff;
  border: none;
  padding: 10px 20px;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}
</style>
