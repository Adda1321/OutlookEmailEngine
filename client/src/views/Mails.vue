<template>
  <div>
    <h1>Mails</h1>
    <v-btn color="primary" @click="handleRefresh">Refresh</v-btn>
    <v-table>
      <thead>
        <tr>
          <th>Account Email</th>
          <th>Subject</th>
          <th>Body Preview</th>
          <th>Is Read</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(email, index) in emails" :key="index">
          <td>{{ email.account_email }}</td>
          <td>{{ email.subject }}</td>
          <td>{{ email.body }}</td>
          <td>{{ email.isRead ? 'Yes' : 'No' }}</td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import axios from "axios";
import { FETCH_ACCOUNT_EMAILS } from "@/graphql/mutation"; // Adjust the path accordingly

@Component
export default class Mails extends Vue {
  emails: Array<any> = [];
  isAuthenticated: boolean = false;
  accountId: string = "random-number-for-testing-1";

  async checkAuthentication() {
    try {
      const response = await axios.get(
        "http://localhost:3000/isAuthenticated",
        { withCredentials: true }
      );
      console.log("ISAUTH???", response.data.isAuthenticated);
      this.isAuthenticated = response.data.isAuthenticated;
    } catch (error) {
      console.error("Error checking authentication status:", error);
      this.$router.push("/");
    }
  }

  async fetchEmails() {
    try {
      const response = await this.$apollo.query({
        query: FETCH_ACCOUNT_EMAILS,
        variables: { accountId: this.accountId },
      });
      this.emails = response.data.linked_accounts.flatMap((account: any) => 
        account.mails.map((mail: any) => ({
          account_email: account.account_email,
          ...mail
        }))
      );
    } catch (error) {
      console.error("Error fetching emails:", error);
    }
  }

  handleRefresh() {
    this.fetchEmails();
  }

  mounted() {
    this.checkAuthentication();
  }

  @Watch("isAuthenticated")
  onIsAuthenticatedChanged(newVal: boolean) {
    if (newVal) {
      alert("Authenticated")
      this.fetchEmails();
    }
  }
}
</script>
