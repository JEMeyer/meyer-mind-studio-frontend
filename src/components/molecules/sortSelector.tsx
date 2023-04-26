import React, { Dispatch, SetStateAction } from 'react';
import StyledHeading from '../atoms/heading';
import Dropdown from '../atoms/dropdown';
import styled from 'styled-components';
import FlexDiv from '../atoms/flexDiv';
import ToggleGroup from '../atoms/toggleGroup';
import { VideosRequestParams } from '../organisms/leaderboard';

interface SortSelectorProps {
    requestParams: VideosRequestParams,
    setRequestParams: Dispatch<SetStateAction<VideosRequestParams>>,
}

const SortSelector: React.FC<SortSelectorProps> = ({requestParams, setRequestParams}) => {

    const sortingOptions = [{
        value: 'top',
        label: 'Top'
    }, {
        value: 'new',
        label: 'New'
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

    const updateVideosParamsState = (sorting?: string, timerange?: string) => {
        let tempState = {...requestParams};
        if (sorting)  {
            tempState.sorting = sorting;
        }
        if (timerange) {
            tempState.timeframe = timerange;
        }
        setRequestParams(tempState);
    }

    return (
        <SortSelectorWrapper>
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