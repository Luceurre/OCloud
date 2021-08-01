import { useSelector } from 'react-redux';
import { isLoggedIn } from 'redux/Login';
import { useHistory } from 'react-router';
import { useEffect } from 'react';
import { PATHS } from 'routes';

const useLoggedInOrRedirect = (): void => {
  const isSignedIn = useSelector(isLoggedIn);
  const history = useHistory();

  useEffect(() => {
    if (!isSignedIn) history.push(PATHS.LOGIN);
  }, [isSignedIn, history]);
};

export default useLoggedInOrRedirect;
