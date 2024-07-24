// -------------------------------- Note using now   ----------------------------

import axios from "axios";
import { msalInstance, state } from "./msalConfig";
import { AuthCodeMSALBrowserAuthenticationProvider } from "@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser";
import { PublicClientApplication, InteractionType } from '@azure/msal-browser';
import { Client } from "@microsoft/microsoft-graph-client";

export function msalService(onLoginSuccess?: () => void) {
  const initialize = async () => {
    try {
      await msalInstance.initialize(); // Call the initialize function
    } catch (error) {
      console.log("Initialization error", error);
    }
  };

  const login = async () => {
    try {
      // alert("first alert");
      // Check if MSAL is initialized before using it
      if (!msalInstance) {
        throw new Error(
          "MSAL not initialized. Call initializeMsal() before using MSAL API."
        );
      }

      await msalInstance.loginRedirect();

      // alert("second alert");

      state.isAuthenticated = true;
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const logout = () => {
    if (!msalInstance) {
      throw new Error(
        "MSAL not initialized. Call initializeMsal() before using MSAL API."
      );
    }
    msalInstance.logoutRedirect();
    state.isAuthenticated = false;
    state.user = null;
  };

  const handleRedirect = async () => {
    try {
      // alert("in Handle-Redirection")

      await msalInstance.handleRedirectPromise();
      state.isAuthenticated = msalInstance.getAllAccounts().length > 0;
      state.user = msalInstance.getAllAccounts()[0];
      if (state.isAuthenticated) {
        // Call any necessary methods or handle state updates
        // console.log("User LoggedIn/LoggedOut ", msalInstance);
      }
    } catch (error) {
      console.error("Redirect error:", error);
    }
  };
  const getToken = async () => {
    if (!msalInstance) {
      throw new Error(
        "MSAL not initialized. Call initializeMsal() before using MSAL API."
      );
    }
    try {
      const accounts = msalInstance.getAllAccounts();
      if (accounts.length === 0) {
        throw new Error("No accounts found. Please login first.");
      }
      const silentRequest = {
        scopes: ['User.Read', 'Mail.Read','Mail.ReadBasic'],
        account: accounts[0],
      };
      const silentResponse = await msalInstance.acquireTokenSilent(
        silentRequest
      );

      state.token = silentResponse.accessToken;
      return silentResponse.accessToken;
    } catch (error) {
      console.error("Silent token acquisition error:", error);
    }
  };
  const registerAuthorizationHeaderInterceptor = () => {
    // axios.interceptors.request.use(async (config) => {
    //   const accessToken = await getToken();
    //   console.log("accessToken:::::::::", accessToken);
    //   if (accessToken) {
    //     config.headers.Authorization = `Bearer ${accessToken}`;
    //   }
    //   return config;
    // });
  };
  const fetchEmails = async () => {
    try {
      const accessToken = await getToken();
      // const accessToken = "state.token"
      console.log("Access token.", accessToken);

      if (!accessToken) {
        throw new Error("Failed to acquire access token");
      }

      const authProvider = new AuthCodeMSALBrowserAuthenticationProvider(msalInstance, {
        account: msalInstance.getAllAccounts()[0], // Get the first account after authentication
        interactionType: InteractionType.Popup,
        scopes: ['Mail.Read','Mail.ReadBasic']
      });
  
      const client = Client.initWithMiddleware({ authProvider });
      
      let messages = await client.api('/me/messages')
        .select('sender,subject')
        .get();

      console.log("MESAAGEEE", messages);

    //   const response = await fetch('https://graph.microsoft.com/v1.0/me/messages', {
    //     method: 'GET',
    //     headers: {
    //         'Authorization': `Bearer ${accessToken}`,
    //         'Accept': 'application/json'
    //     }
    // });

    

      return "messages";
    } catch (error) {
      console.error("Error fetching emails:", error);
    }
  };

  return {
    initialize,
    login,
    logout,
    handleRedirect,
    getToken,
    fetchEmails,
    registerAuthorizationHeaderInterceptor,
  };
}
