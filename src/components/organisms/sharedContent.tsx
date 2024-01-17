import React from "react";
import StyledHeading from "../atoms/heading";
import useSharedContent from "../../hooks/useSharedVideo";
import { ContentPlayerWithInfo } from "../molecules/content/contentPlayer";

const SharedContent: React.FC = () => {
  const { sharedItem } = useSharedContent();
  if (sharedItem == null) {
    return <></>;
  }

  const capitalizedType =
    sharedItem.type.charAt(0).toUpperCase() + sharedItem.type.slice(1);

  return (
    <>
      <StyledHeading text={`Shared ${capitalizedType}`} />
      <ContentPlayerWithInfo overrideItem={sharedItem} />
    </>
  );
};

export default SharedContent;
