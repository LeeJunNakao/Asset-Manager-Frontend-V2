import { useDispatch, useSelector } from "react-redux";
import {
  selectGlobalConfig,
  setIsLoading,
  setInitialFetch,
} from "src/store/global";

export const useGlobalConfig = () => {
  const dispatch = useDispatch();
  const globalConfig = useSelector(selectGlobalConfig);

  const isLoading = globalConfig.isLoading;
  const initialFetched = globalConfig.initalDataFetched;

  const startLoading = () => dispatch(setIsLoading(true));
  const endLoading = () => dispatch(setIsLoading(false));

  const notifyFetchEnd = () => dispatch(setInitialFetch(true));

  return {
    globalConfig,
    isLoading,
    initialFetched,
    startLoading,
    endLoading,
    notifyFetchEnd,
  };
};
