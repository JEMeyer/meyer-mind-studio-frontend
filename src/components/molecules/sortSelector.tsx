import React, { Dispatch, SetStateAction } from 'react';
import StyledHeading from '../atoms/heading';
import Dropdown from '../atoms/dropdown';
import styled from 'styled-components';
import FlexDiv from '../atoms/flexDiv';
import ToggleGroup from '../atoms/toggleGroup';
import { ItemsReqeustParams, contentTypeToString, stringToContentType } from '../../hooks/useFetchContent';

interface SortSelectorProps {
    requestParams: ItemsReqeustParams,
    setRequestParams: Dispatch<SetStateAction<ItemsReqeustParams>>,
}

const SortSelector: React.FC<SortSelectorProps> = ({requestParams, setRequestParams}) => {

    const sortingOptions = [{
        value: 'top',
        label: 'Top'
    }, {
        value: 'new',
        label: 'New'
    }];

    const contentOptions = [{
        value: 'all',
        label: 'All'
    }, {
        value: 'videos',
        label: 'Videos'
    }, {
        value: 'images',
        label: 'Images'
    }];

    const timeRangeOptions = [{
        value: 'day',
        label: 'day'
    }, {
        value: 'week',
        label: 'week'
    }, {
        value: 'month',
        label: 'month'
    }, {
        value: 'all-time',
        label: 'all time'
    }];

    const updateVideosParamsState = (sorting?: string, timerange?: string, contentType?: string) => {
        let tempState = {...requestParams};
        if (sorting)  {
            tempState.sorting = sorting;
        }
        if (timerange) {
            tempState.timeframe = timerange;
        }
        if (contentType !== undefined) {
            tempState.contentType = stringToContentType(contentType) ?? null;
        }
        setRequestParams(tempState);
    }

    return (
        <SortSelectorWrapper>
            <StyledHeading level='h3' marginBottom='0' text='Filter:' />
            <FlexDiv width='3px' />
            <ToggleGroup items={contentOptions} selectedItem={contentTypeToString(requestParams.contentType)} onSelect={(value) => updateVideosParamsState(undefined, undefined, value)} />
            <StyledHeading level='h3' marginBottom='0' text="Sort:" />
            <FlexDiv width='3px' />
            <ToggleGroup items={sortingOptions} selectedItem={requestParams.sorting} onSelect={(value) => updateVideosParamsState(value)} />
            {requestParams.sorting === 'top' && (
                <>
                    <FlexDiv width='10px' />
                    <StyledHeading level='h3' marginBottom='0' text="Timespan:" />
                    <FlexDiv width='3px' />
                    <Dropdown items={timeRangeOptions} selectedItem={requestParams.timeframe} onSelect={(value) => updateVideosParamsState(undefined, value)} />
                </>)}
        </SortSelectorWrapper>
    );
};

export default SortSelector;

const SortSelectorWrapper = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 10px;
`;
