import { fetchUserPublicKeys } from 'pages/PublicKeys/services/fetchUserPublicKeys';
import useFetchOnMount, { FetchOnMountHook } from 'common/hooks/useFetchOnMount';
import { PublicKey } from 'pages/PublicKeys/types/PublicKey';

const useFetchPublicKeys = (): FetchOnMountHook<PublicKey[]> => {
  return useFetchOnMount<PublicKey[]>(fetchUserPublicKeys);
};

export default useFetchPublicKeys;
