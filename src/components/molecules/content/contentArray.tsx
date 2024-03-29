import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  ItemsReqeustParams,
  getContentType,
} from "../../../hooks/useFetchContent";
import FlexDiv from "../../atoms/flexDiv";
import CustomButton from "../../atoms/button";
import useFetchContent from "../../../hooks/useFetchContent";
import MediaCard from "../mediaCard";
import ContentDetails from "./contentDetails";

interface ContentArrayProps {
  requestParams: ItemsReqeustParams;
}

const ContentArray: React.FC<ContentArrayProps> = ({ requestParams }) => {
  const { content, setContent, fetchContent } = useFetchContent();
  const [page, setPage] = useState(1);
  let [nextDisabled, setNextDisabled] = useState(false);

  useEffect(() => {
    if (requestParams) {
      setNextDisabled(false);
    }
  }, [requestParams, requestParams.sorting]);

  const appendVideosToState = async () => {
    const newPage = page + 1;
    let newContent =
      (await fetchContent(
        requestParams.sorting,
        requestParams.timeframe,
        newPage,
        requestParams.userContentOnly,
        requestParams.likedItems,
        requestParams.contentType
      )) || [];
    newContent = newContent.filter(
      (newContent) =>
        !content.some(
          (item) =>
            item.id === newContent.id &&
            getContentType(item) === getContentType(newContent)
        )
    );
    if (newContent.length === 0) {
      setNextDisabled(true);
    }
    setContent([...content, ...newContent]);
    setPage(newPage);
  };

  return (
    <>
      <GridContainer>
        {content.map((item) => (
          <GridItem key={item.id + item.name}>
            <MediaCard
              item={item}
              expandedContent={<ContentDetails item={item} />}
            />
          </GridItem>
        ))}
        <FlexDiv width="100%">
          <CustomButton
            onClick={appendVideosToState}
            disabled={nextDisabled}
            margin="5px 5px 30px 5px"
          >
            Load More
          </CustomButton>
        </FlexDiv>
      </GridContainer>
    </>
  );
};

export default ContentArray;

// Styled-components wrapper for the grid container
const GridContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  overflow-x: auto;
  justify-content: center;
`;

// Styled-components wrapper for individual items in the grid
const GridItem = styled.div`
  flex: 0 0 auto;
  padding: 10px;
  box-sizing: border-box;

  // You can customize the responsive breakpoints here
  @media (max-width: 640px) {
    width: 100%;
  }
`;
