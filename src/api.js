const apiFetch = (api, path) =>
  fetch(api + path)
    .then(response => response.json());

export default apiFetch;
