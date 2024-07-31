<template>
  <div>
    <h3>Outlook is loggedIn as: {{ this.account.email }}</h3>
    <table>
      <thead>
        <tr>
          <th>Account Email</th>
          <th>From</th>
          <th>To</th>
          <th>Subject</th>
          <th>Body Preview</th>
          <th>Is Read</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(email, index) in emails" :key="index">
          <td>{{ email.account_email }}</td>
          <td>{{ email.from_name }}</td>
          <td>{{ email.to_name }}</td>
          <td>{{ email.subject }}</td>
          <td>{{ email.body }}</td>
          <td>{{ email.isRead ? 'Yes' : 'No' }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { FETCH_ACCOUNT_EMAILS } from "@/graphql/mutation"; // Adjust the path accordingly

interface Account {
  refreshToken: string;
  email: string;
  id: string;
  accessToken: string;
}

@Component({
  apollo:{
    $subscribe: {
      fetchAccountEmails: {
        query: FETCH_ACCOUNT_EMAILS,
        variables() {
          return {
            accountId: this.account.id,
          };
        },
        result({ data }: { data: any }) {
          console.log("mail data fetched sucessfull", data)
          if (data && data.linked_accounts) {
            // Flatten the data and update the emails array
            this.emails = data.linked_accounts.flatMap((account: any) =>
              account.mails.map((mail: any) => ({
                account_email: account.account_email,
                ...mail,
              }))
            );
          }
        },
      },
    },
  }
}
)
export default class Mails extends Vue {
  @Prop({ required: true }) account!: Account;
  emails: Array<any> = [];
}
</script>

<style scoped>
table {
  border-collapse: collapse;
  width: 100%;
  margin-top: 20px;
}

th, td {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

th {
  background-color: #f2f2f2;
}

button {
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

button:hover {
  background-color: #0056b3;
}
</style>
