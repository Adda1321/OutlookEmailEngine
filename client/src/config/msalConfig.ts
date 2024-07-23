import {
  PublicClientApplication,
  type AccountInfo,
  type RedirectRequest
} from '@azure/msal-browser'
import { reactive } from 'vue'

export const msalConfig = {
  auth: {
    clientId: '396e945c-4076-4dbd-9c86-050de395d5ff',
    authority: 'https://login.microsoftonline.com/bc04fa0b-c47b-4c5e-b920-df671cd323b3',
    redirectUri: 'http://localhost:8080',
    postLogoutUri: 'http://localhost:8080'
  },
  cache: {
    cacheLocation: 'sessionStorage', // This configures where your cache will be stored
    storeAuthStateInCookie: false
  }
}
export const graphScopes: RedirectRequest = {
  scopes: ['user.read', 'openid', 'profile', 'mail.read']
}
export const state = reactive({
  isAuthenticated: false,
  user: null as AccountInfo | null,
  token: ''
})

export const msalInstance = new PublicClientApplication(msalConfig)
