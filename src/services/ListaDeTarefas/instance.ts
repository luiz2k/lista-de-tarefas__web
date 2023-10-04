import refreshToken from './refreshToken';

function interceptRequest(request: Request) {
  const token = JSON.parse(localStorage.getItem('token') as string);

  request.headers.set('Content-Type', 'application/json');
  request.headers.set('Authorization', `Bearer ${token?.accessToken}`);

  return request;
}

async function interceptResponse(response: Response) {
  if (!response.ok) {
    const error = await response.json();

    throw error;
  }

  return response.json();
}

export async function api(url?: RequestInfo | URL, options?: RequestInit) {
  const baseURL = process.env.NEXT_PUBLIC_API_URL;

  const request = new Request(`${baseURL}${url}`, options);

  const modifiedRequest = interceptRequest(request);

  const response = await fetch(modifiedRequest);

  const token = JSON.parse(localStorage.getItem('token') as string);

  if (response.status === 401 && token.refreshToken) {
    const newToken = await refreshToken();

    if (newToken) {
      const request = new Request(`${baseURL}${url}`, options);

      const modifiedRequest = interceptRequest(request);

      const response = await fetch(modifiedRequest);

      return await interceptResponse(response);
    }
  }

  return await interceptResponse(response);
}
