import Vue from 'vue'

import App from './App.vue'
import router from './router'

import VueApollo from "vue-apollo";
import apolloClient from "../apollo";
import vuetify from './plugins/vuetify'

// Setup Apollo Provider
Vue.use(VueApollo);

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});

new Vue({
  router,
  render: (h) => h(App),
  vuetify,
  apolloProvider
}).$mount('#app')
