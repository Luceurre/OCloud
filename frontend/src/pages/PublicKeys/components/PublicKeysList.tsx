import React from 'react';
import { Container } from './PublicKeysList.style';
import { PublicKey } from 'pages/PublicKeys/types/PublicKey';
import PublicKeyCard from 'pages/PublicKeys/components/PublicKeyCard';

interface PublicKeyListProps {
  publicKeys: PublicKey[];
}

const PublicKeysList = ({ publicKeys }: PublicKeyListProps): JSX.Element => {
  return (
    <Container>
      {publicKeys.map(publicKey => (
        <PublicKeyCard publicKey={publicKey} key={`public-key-${publicKey.id}`} />
      ))}
    </Container>
  );
};

export default PublicKeysList;
