const apiFetch = (api, path, config = {}) => {
  const options = {
    headers: {
      'Accept': 'application/json',
      ...(config.headers || {})
    },
    ...config
  };

  return (
    fetch(api + path, options)
      .then(response => response.json())
  );
};

export default apiFetch;
