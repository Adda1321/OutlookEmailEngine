import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueApollo from "vue-apollo";
import apolloClient from "../apollo"
import { Auth0Plugin } from './auth'
import { domain, clientId } from '../auth.config.json'
Vue.use(Auth0Plugin, {
  domain,
  clientId,
  onRedirectCallback: (appState) => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    )
  }
})
Vue.use(VueApollo);

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
  apolloProvider,
}).$mount('#app')
