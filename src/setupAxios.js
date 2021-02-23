import axios from "axios";

const setupAxios = store => {
  axios.interceptors.request.use(
    async config => {
      config.baseURL = process.env.REACT_APP_API_END_POINT;

      // config.withCredentials = true;

      return config;
    },
    err => Promise.reject(err)
  );

  axios.interceptors.response.use(
    response => {
      alert("after getting res");
      return response;
    },
    err => {
      alert("error occurred! ");
      const unauthorisedErrorCodes = [401];
      return Promise.reject(err);
    }
  );
};

const request = async (url, method, params = {}, headers = {}) =>
  await new Promise(async (resolve, reject) => {
    const options = {
      url,
      method
    };
    if (method === "GET") {
      options.params = params;
    } else {
      options.data = params;
    }

    await axios(options)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });

export { setupAxios, request };
