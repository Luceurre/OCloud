import { useAsyncFn } from 'react-use';
import { useEffect } from 'react';

export interface FetchOnMountHook<ReturnType> {
  isFetchLoading: boolean;
  error?: unknown;
  fetchedData?: ReturnType;
}

const useFetchOnMount = <ReturnType>(
  fetchAction: () => Promise<ReturnType>,
): FetchOnMountHook<ReturnType> => {
  const [state, doFetch] = useAsyncFn(() => fetchAction());
  useEffect(() => {
    doFetch();
  }, [doFetch]);

  return {
    isFetchLoading: state.loading,
    error: state.error,
    fetchedData: state.value,
  };
};

export default useFetchOnMount;
