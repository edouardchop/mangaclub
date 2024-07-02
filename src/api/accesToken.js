import axios from 'axios';

export async function getManagementApiToken() {
  const options = {
    method: 'post',
    url: 'https://YOUR_DOMAIN/oauth/token',
    headers: { 'content-type': 'application/json' },
    data: {
      client_id: 'YOUR_CLIENT_ID',
      client_secret: 'YOUR_CLIENT_SECRET',
      audience: 'https://YOUR_DOMAIN/api/v2/',
      grant_type: 'client_credentials'
    }
  };

  const response = await axios.request(options);
  return response.data.access_token;
}
