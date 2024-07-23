<template>
  <div>
    <h1>Mails</h1>
    <v-btn color="primary" @click="handleRefresh">Refresh</v-btn>
    <v-table>
      <thead>
        <tr>
          <th>Subject</th>
          <th>Body Preview</th>
          <th>Is Read</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(email, index) in emails" :key="index">
          <td>{{ email.subject }}</td>
          <td>{{ email.body }}</td>
          <td>{{ email.isRead ? 'Yes' : 'No' }}</td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from 'axios';

@Component
export default class Mails extends Vue {
  emails: Array<any> = [];
  isAuthenticated: boolean = false;

  async checkAuthentication() {
    try {
      const response = await axios.get('http://localhost:3000/isAuthenticated', { withCredentials: true });
      this.isAuthenticated = response.data.isAuthenticated;
    } catch (error) {
      console.error('Error checking authentication status:', error);
      this.$router.push('/');
    }
  }

  async fetchEmails() {
    try {
      const response = await fetch('http://localhost:3000/emails', { credentials: 'include' });
      if (response.redirected) {
        this.$router.push('/');
      } else if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const sortedEmails = data.sort((a: any, b: any) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime());
      this.emails = sortedEmails;
    } catch (error) {
      console.error('Error fetching emails:', error);
    }
  }

  handleRefresh() {
    this.fetchEmails();
  }

  mounted() {
    this.checkAuthentication();
  }

  watch: {
    isAuthenticated(newVal: boolean) {
      if (newVal) {
        this.fetchEmails();
      }
    }
  }
}
</script>

<style scoped>
.ml-4 {
  margin-left: 1rem;
}
.v-table {
  border-collapse: collapse;
  width: 100%;
  margin-top: 50px;
}
.v-table th, .v-table td {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}
.v-table th {
  background-color: #f2f2f2;
}
</style>
