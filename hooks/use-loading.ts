import { useState } from 'react';

export const useLoading = (initialState = false) => {
  const [loading, toggleLoading] = useState(initialState);

  const setLoading = (state: boolean) => toggleLoading(state);

  return { loading, setLoading };
};