import config from '../config/config';

export async function loginService({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  return await fetch(config.API_HOST + '/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
}
