const refreshToken = async () => {
  const baseURL = process.env.NEXT_PUBLIC_API_URL;

  const token = await JSON.parse(localStorage.getItem('token') as string);

  const settings = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      refreshToken: token?.refreshToken,
    }),
  };

  const response = await fetch(`${baseURL}/refreshToken`, settings);

  if (response.status === 401) {
    localStorage.removeItem('token');
    return false;
  }

  const responseData = await response.json();

  localStorage.setItem(
    'token',
    JSON.stringify({
      accessToken: responseData.token,
      refreshToken: responseData.refreshToken,
    }),
  );

  return true;
};

export default refreshToken;
