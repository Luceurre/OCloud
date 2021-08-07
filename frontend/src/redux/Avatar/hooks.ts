import { githubApiClient } from 'services/networking/client';
import { useDispatch } from 'react-redux';
import { updateUser } from './slice';
import { useTypedAsyncFn } from 'redux/useTypedAsyncFn';
import { AsyncFnReturn } from 'react-use/lib/useAsyncFn';
import { User } from 'redux/Avatar/types';

export const useFetchUser = (): AsyncFnReturn<(
  ...args: {
    username: string;
  }[]
) => Promise<void>> => {
  const dispatch = useDispatch();

  return useTypedAsyncFn<{ username: string }>(
    async ({ username }) => {
      const { body: user } = await githubApiClient.get<User>(
        `https://api.github.com/users/${username}`,
      );
      dispatch(updateUser(user));
    },
    [dispatch],
  );
};
