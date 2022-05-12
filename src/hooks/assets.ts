import { useSelector } from "react-redux";
import { selectAssets } from "src/store/asset";

export const useAssets = () => {
  const assets = useSelector(selectAssets);

  return { assets };
};
