<template>
  <div>
    <button :disabled="logged" class="primary-btn" @click="handleLogin">Log in</button>
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
}

.primary-btn:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.primary-btn:hover:not(:disabled) {
  background-color: #0056b3;
}
</style>
