import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DetourContext from './Context';
import apiFetch from './api';

export const DetourProvider = ({ children, api, fetchOptions }) => {
  const [data, setData] = useState({});

  const handler = {
    get: function (target, path) {
      if (!target[path]) {
        apiFetch(api, path, fetchOptions)
          .then(result => {
            setData({
              ...data,
              [path]: result
            })
          });
      }

      return target[path];
    }
  };

  const proxiedData = new Proxy(data, handler);

  return (
    <DetourContext.Provider value={proxiedData}>
      { children }
    </DetourContext.Provider>
  );
};

DetourProvider.propTypes = {
  children: PropTypes.node,
  api: PropTypes.string.isRequired,
  fetchOptions: PropTypes.object
};

export default DetourProvider;
