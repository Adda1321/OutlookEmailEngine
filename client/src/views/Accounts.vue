<template>
    <div>
      <v-btn :disabled="logged" @click="handleLogin">Log in</v-btn>
    </div>
  </template>
  
  <script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import axios from 'axios';
  
  @Component
  export default class Accounts extends Vue {
    logged: boolean = false;
  
    created() {
      this.checkAuthentication();
    }
  
    async checkAuthentication() {
      try {
        const response = await axios.get('http://localhost:3000/isAuthenticated', { withCredentials: true });
        console.log("responseAuth:::", response.data.isAuthenticated)

        this.logged = response.data.isAuthenticated;
      } catch (error) {
        console.error('Error checking authentication status:', error);
      }
    }
  
    handleLogin() {
      window.location.href = 'http://localhost:3000/auth/outlook';
    }
  }
  </script>
  
  <style scoped>
  /* Add your component-specific styles here */
  </style>
  