import { useContext } from "react";
import MediaContext, { MediaContextType } from "../context/mediaContext";
import { Item } from "./useFetchContent";

export const useMediaState = (): [Item | null, MediaContextType["setItem"]] => {
  const context = useContext(MediaContext);
  return [context.item, context.setItem];
};
