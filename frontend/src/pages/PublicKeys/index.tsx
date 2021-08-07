import React from 'react';
import useLoggedInOrRedirect from 'common/hooks/useLoggedInOrRedirect';
import useFetchPublicKeys from 'pages/PublicKeys/hooks/useFetchPublicKeys';
import ErrorBox from 'common/components/ErrorBox';
import PublicKeysList from 'pages/PublicKeys/components/PublicKeysList';

const PublicKeys = (): JSX.Element => {
  useLoggedInOrRedirect();
  const { fetchedData, error } = useFetchPublicKeys();
  if (Boolean(error))
    return (
      <ErrorBox errorMessage="Une erreur s'est produite lors de la recuperation des donnees" />
    );
  if (!fetchedData) return <p>Loading</p>;

  return <PublicKeysList publicKeys={fetchedData} />;
};

export default PublicKeys;
