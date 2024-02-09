# Dynaform 31/1
const fetchAPI = () => {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    timeout: 60 * 1000,
    paramsSerializer: { serialize: (params) => queryString.stringify(params) },
  })
 
  instance.interceptors.response.use(function (response) {
    // Do something with response data
    return response;
  }, function (error) {
    // Do something with response error
    return Promise.reject(error);
  });
  return instance
}
 
const requestDataAPI = (url, method, params) => {
  switch (method) {
    case "GET":
      return fetchAPI().get(url, params)
    case "POST":
      return fetchAPI().post(url, params)
    case "PUT":
      return fetchAPI().put(url, params)
    case "DELETE":
      return fetchAPI().delete(url, params)
    default:
      break
  }
  return null
}
 
const requestGetAPI = (url, params) => requestDataAPI(url, "GET", params)
 
const requestPostAPI = (url, params) => requestDataAPI(url, "POST", params)
 
const requestPutAPI = (url, params) => requestDataAPI(url, "PUT", params)
 
const requestDeleteAPI = (url, params) => requestDataAPI(url, "DELETE", params)
 
const API = {
  requestGetAPI,
  requestPostAPI,
  requestPutAPI,
  requestDeleteAPI,
}
 
export default API
