import { useAsyncFn } from 'react-use';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export interface FetchOnMountHook<ReturnType> {
  isFetchLoading: boolean;
  error?: unknown;
  fetchedData?: ReturnType;
  setFetchedData: Dispatch<SetStateAction<ReturnType | undefined>>;
}

const useFetchOnMount = <ReturnType>(
  fetchAction: () => Promise<ReturnType>,
): FetchOnMountHook<ReturnType> => {
  const [state, doFetch] = useAsyncFn(() => fetchAction());
  const [fetchedData, setFetchedData] = useState<ReturnType>();

  useEffect(() => {
    doFetch();
  }, [doFetch]);

  useEffect(() => {
    setFetchedData(state.value);
  }, [state.value]);

  return {
    isFetchLoading: state.loading,
    error: state.error,
    fetchedData,
    setFetchedData,
  };
};

export default useFetchOnMount;
