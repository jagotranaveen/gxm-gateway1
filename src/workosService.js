import { WorkOS } from '@workos-inc/node';

const workos = new WorkOS('YOUR_WORKOS_API_KEY');

export const getAuthorizationURL = async () => {
  const authURL = workos.sso.getAuthorizationURL({
    clientID: 'client_01J78WVVWQFYPFB3P60X0QEWRA',
    redirectURI: 'https://black-ocean-06e9e7b03.5.azurestaticapps.net/callback',
    domain: 'innovinitySolutions.com', // Replace with the domain of the org
  });
  return authURL;
};

export const authenticateUser = async (code) => {
  const profile = await workos.sso.getProfileAndToken({ code });
  return profile;
};
