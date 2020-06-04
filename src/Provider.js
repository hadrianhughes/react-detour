import React from 'react';
import DetourContext from './Context';

export const DetourProvider = ({ children, api }) => {
  const [data, setData] = useState({});

  const handler = {
    get: function (target, path) {
      if (!target[path]) {
        fetch(api + path)
          .then(response => response.json())
          .then(setData);
      }

      return target[path];
    }
  };

  const proxiedData = new Proxy(data, handler);

  return (
    <DetourContext.Provider value={{ data: proxiedData }}>
      { children }
    </DetourContext.Provider>
  );
};

export default DetourProvider;
