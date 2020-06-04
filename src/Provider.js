import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DetourContext from './Context';
import apiFetch from './api';

const compileMiddleware = fns => x => fns.reduce((acc, f) => f(acc), x);

export const DetourProvider = ({
  children,
  api,
  fetchOptions,
  pre,
  post
}) => {
  const [data, setData] = useState({});

  const preMiddleware  = compileMiddleware(pre);
  const postMiddleware = compileMiddleware(post);

  const handler = {
    get: function (target, path) {
      const finalPath = preMiddleware(path);

      if (!target[path]) {
        apiFetch(api, finalPath, fetchOptions)
          .then(result => {
            setData({
              ...data,
              [path]: postMiddleware(result)
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
  fetchOptions: PropTypes.object,
  pre: PropTypes.arrayOf(PropTypes.func),
  post: PropTypes.arrayOf(PropTypes.func)
};

DetourProvider.defaultProps = {
  children: null,
  fetchOptions: {},
  pre: [],
  post: []
};

export default DetourProvider;
