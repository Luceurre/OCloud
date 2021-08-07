import { PublicKey } from 'pages/PublicKeys/types/PublicKey';
import client from 'services/networking/client';

export const updatePublicKey = (publicKey: PublicKey): Promise<PublicKey> =>
  client.put<PublicKey>(`/public_keys/${publicKey.id}/`, publicKey).then(response => response.body);
