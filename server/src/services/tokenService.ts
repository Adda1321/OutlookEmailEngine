import { ConfidentialClientApplication } from '@azure/msal-node';
import { TENANT_ID, OUTLOOK_CLIENT_ID } from '../config/azureConfig';

const configs: any = {
  auth: {
    clientId: OUTLOOK_CLIENT_ID,
    authority: `https://login.microsoftonline.com/${TENANT_ID}`,
    clientSecret: "Qw08Q~6hb5rcDLkfjdjo67R~lZLrNREVy6UsqcFw",
  },
};

const cca1 = new ConfidentialClientApplication(configs);

export async function getNewAccessToken(refreshToken: string): Promise<{ accessToken: string, refreshToken?: string }> {
  const refreshTokenRequest = {
    refreshToken,
    scopes: ['https://graph.microsoft.com/.default'],
  };

  try {
    const authResult: any = await cca1.acquireTokenByRefreshToken(refreshTokenRequest);
    if (!authResult || !authResult.accessToken) {
      throw new Error('Failed to acquire new access token');
    }
    return { accessToken: authResult.accessToken, refreshToken: authResult.refreshToken };
  } catch (error) {
    console.error('Error acquiring new access token:', error);
    throw error;
  }
}
