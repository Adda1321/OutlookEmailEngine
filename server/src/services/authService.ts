import { getNewAccessToken } from './tokenService';
import { Client } from '@microsoft/microsoft-graph-client';
import User from '../types/user';

export async function updateAccessToken(user: User) {
  if (!user.refreshToken) {
    throw new Error('Refresh token is required');
  }

  const { accessToken, refreshToken } = await getNewAccessToken(user.refreshToken);

  if (!accessToken) {
    throw new Error('Access token is undefined');
  }

  user.accessToken = accessToken;

  if (refreshToken) {
    user.refreshToken = refreshToken;
  }
}

export function initializeClientWithAccessToken(accessToken: string) {
  return Client.init({
    authProvider: (done) => {
      done(null, accessToken);
    }
  });
}
