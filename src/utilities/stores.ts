import { createGlobalState } from 'react-use';

const useGlobalToken = createGlobalState<string | undefined>(undefined);
const useGlobalLoading = createGlobalState<boolean>(false);

export { useGlobalToken, useGlobalLoading };
