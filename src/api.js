const apiFetch = (api, path, options = {}) =>
  fetch(api + path, {
    headers: {
      'Accept': 'application/json'
    }
  })
    .then(response => response.json());

export default apiFetch;
