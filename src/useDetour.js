import React, { useContext } from 'react';
import DetourContext from './Context';

function useDetour (path) {
  const detour = useContext(DetourContext);
  return detour[path];
}

export default useDetour;
