import React, {  useState } from 'react';
import styled from 'styled-components';
import ImageCard from './imageCard';
import FlexDiv from '../../atoms/flexDiv';
import CustomButton from '../../atoms/button';
import useFetchImages, { ImagesRequestParams } from '../../../hooks/useFetchImages';

interface ImageArrayProps {
  requestParams: ImagesRequestParams,
}

const ImageArray: React.FC<ImageArrayProps> = ({requestParams}) => {
  const { images, setImages, fetchImages } = useFetchImages();
  const [page, setPage] = useState(1);
  let [nextDisabled, setNextDisabled] = useState(false);

  const appendImagesToState = async () => {
    const newPage = page + 1;
    let newImages = await fetchImages(requestParams.sorting, requestParams.timeframe, newPage, requestParams.userContentOnly, requestParams.likedItems) || [];
    newImages = newImages.filter((newImage) => !images.some((image) => image.id === newImage.id));
    if (newImages.length === 0) {
      setNextDisabled(true);
    }
    setImages([...images, ...newImages]);
    setPage(newPage);
  };

  return (
    <>
      <GridContainer>
        {images.map((item) => (
          <GridItem key={item.id}>
            <ImageCard image={item} />
          </GridItem>
        ))}
        <FlexDiv width='100%' >
          <CustomButton onClick={appendImagesToState} disabled={nextDisabled} margin='5px 5px 30px 5px'>Load More</CustomButton>
        </FlexDiv>
      </GridContainer>
    </>
  );
};

export default ImageArray;

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
