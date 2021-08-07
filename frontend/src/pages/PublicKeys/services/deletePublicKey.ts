import { PublicKey } from 'pages/PublicKeys/types/PublicKey';
import client from 'services/networking/client';

export const deletePublicKey = (publicKey: PublicKey): Promise<PublicKey> =>
  client.delete<PublicKey>(`/public_keys/${publicKey.id}/`).then(response => response.body);
