import React from 'react';
import useLoggedInOrRedirect from 'common/hooks/useLoggedInOrRedirect';
import useFetchPublicKeys from 'pages/PublicKeys/hooks/useFetchPublicKeys';
import ErrorBox from 'common/components/ErrorBox';
import PublicKeysList from 'pages/PublicKeys/components/PublicKeysList';
import { PublicKey } from 'pages/PublicKeys/types/PublicKey';

const PublicKeys = (): JSX.Element => {
  useLoggedInOrRedirect();
  const { fetchedData, error, setFetchedData } = useFetchPublicKeys();

  const onDeletePublicKey = (publicKey: PublicKey) => {
    setFetchedData(() => fetchedData?.filter(iterPublicKey => iterPublicKey.id !== publicKey.id));
  };

  if (Boolean(error))
    return (
      <ErrorBox errorMessage="Une erreur s'est produite lors de la recuperation des donnees" />
    );
  if (!fetchedData) return <p>Loading</p>;

  return <PublicKeysList publicKeys={fetchedData} onDeletePublicKey={onDeletePublicKey} />;
};

export default PublicKeys;
