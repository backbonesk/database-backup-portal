import { createGlobalState } from 'react-use';

const useGlobalToken = createGlobalState<string | undefined>(undefined);

export { useGlobalToken };
