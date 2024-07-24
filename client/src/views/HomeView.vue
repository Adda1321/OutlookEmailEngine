<template>
  <div>
    <div>
      <v-btn color="primary" @click="handlePageChange('mails')">Mails</v-btn>
      <v-btn color="primary" class="ml-4" @click="handlePageChange('link-account')">Link Account</v-btn>
    </div>

    <Mails v-if="currentPage === 'mails'" />
    <Accounts v-if="currentPage === 'link-account'" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Mails from './Mails.vue';
import Accounts from './Accounts.vue';

localStorage.setItem('user', JSON.stringify("707fd1d0-3a9a-434e-8599-b6c20c402628"));

@Component({
  components: {
    Mails,
    Accounts,
  },
})
export default class HomeView extends Vue {
  currentPage: string = 'mails';

  handlePageChange(page: string) {
    this.currentPage = page;
  }
}
</script>

<style scoped>
.ml-4 {
  margin-left: 1rem;
}
</style>
