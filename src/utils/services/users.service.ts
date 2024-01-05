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
  })
    // .then((response) => response)
    // .then((data) => {
    //   console.log('server is up');
    // })
    .catch((err) => {
      // console.log('Error:', {error});
      // console.log('server is down!!');
      return err
    });
}

export async function registerService(data: any) {
  let formData = new FormData();

  for (const [key, value] of Object.entries(data)) {
    if (value) {
      if (key === 'preferences') {
        // formData.append(`${key}`, value);
        // for (var i = 0; i < value.length; i++) {
        //   formData.append('preferences', value[i]);
        // }
        //
        formData.append('preferences', JSON.stringify(value));
      } else {
        formData.append(`${key}`, value);
      }
    }
  }

  return await fetch(config.API_HOST + '/clients', {
    method: 'POST',
    headers: {
      // 'Content-Type': 'application/json',
    },
    body: formData,
    // body: JSON.stringify({ ...data }),
  }).catch((err) => {
    // console.log('Error:', {error});
    // console.log('server is down!!');
    return err;
  });
}

export async function updateUserImageService(
  data: any,
  id: string,
  token: string
) {
  let formData = new FormData();

  for (const [key, value] of Object.entries(data)) {
    value && formData.append(`${key}`, value);
  }

  return await fetch(config.API_HOST + '/client/' + id, {
    method: 'PUT',
    headers: {
      Authorization: 'Bearer ' + token,
    },
    body: formData,
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
