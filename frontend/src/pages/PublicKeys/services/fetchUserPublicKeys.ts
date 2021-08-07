import client from 'services/networking/client';
import { PublicKey } from 'pages/PublicKeys/types/PublicKey';

export const fetchUserPublicKeys = async (): Promise<PublicKey[]> => {
  return client.get<PublicKey[]>('/public_keys').then(response => response.body);
};
