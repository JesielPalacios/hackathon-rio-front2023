import config from '../config/config';
// import axios from 'axios';
// import { AxiosError } from 'axios';

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
  }).catch((error) => {
    console.error('Error:', error);
    console.log('server is down!!');
  });
}

export async function getPopularMoviesService() {
  return await fetch(
    `${config.ombdapiApiUrl}/movie/popular?api_key=${config.ombdapiApiKey}&language=en-US&page=1`
  ).catch((error) => {
    console.error('Error:', error);
    console.log('server is down!!');
  });
}

export async function getMoviePosterService() {
  return await fetch(
    `${config.ombdapiApiUrl}/movie/popular?api_key=${config.ombdapiApiKey}&language=en-US&page=1`
  ).catch((error) => {
    console.error('Error:', error);
    console.log('server is down!!');
  });
}
export async function getOneMovieService(IMDbID: string) {
  return await fetch(
    'http://www.omdbapi.com?apikey=' + config.ombdapiApiKey + '&i=' + IMDbID
  ).catch((error) => {
    console.error('Error:', error);
    console.log('server is down!!');
  });
}

// export async function loginService({
//   email,
//   password,
// }: {
//   email: string;
//   password: string;
// }) {
//   try {
//     return await axios
//       .post(config.API_HOST + '/auth/login', { email, password })
//       .then((response) => console.log('response', response))

//       .catch((error) => {
//         console.log('error', error);
//         if (!error?.response) {
//           console.log('No Server Response');
//         } else if (error?.code === AxiosError.ERR_NETWORK) {
//           console.log('Network Error');
//         } else if (error.response?.status === 404) {
//           console.log('404 - Not Found');
//         } else if (error?.code) {
//           console.log('Code: ' + error.code);
//         } else {
//           console.log('Unknown Error');
//         }
//       });
//   } catch (error) {
//     console.log('error', error);
//   }
// }
