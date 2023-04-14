import React, { useEffect } from 'react';
import StyledHeading from '../atoms/heading';
import useFetchVideos from '../../hooks/useFetchVideos';
import Dropdown from '../atoms/dropdown';
import styled from 'styled-components';
import FlexDiv from '../atoms/flexDiv';
import { useRecoilState } from 'recoil';
import { videosRequestState } from '../../hooks/useAppState';

const SortSelector: React.FC = () => {
    const { fetchVideosAndSetState } = useFetchVideos();
    const [videosRequestParams, setVideoRequestParams] = useRecoilState(videosRequestState);

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

    const updateVideosParamsState = (sorting?: string, timerange?: string, page?: number) => {
        let tempState = {...videosRequestParams};
        if (sorting)  {
            tempState.sorting = sorting;
        }
        if (timerange) {
            tempState.timeframe = timerange;
        }
        setVideoRequestParams(tempState);
    }

    useEffect(() => {
        fetchVideosAndSetState(videosRequestParams.sorting, videosRequestParams.timeframe, 1);
    }, [fetchVideosAndSetState, videosRequestParams.timeframe, videosRequestParams.sorting]);
    return (
        <SortSelectorWrapper>
            <StyledHeading level='h3' marginBottom='0' text="Sort:" />
            <FlexDiv width='3px' />
            <Dropdown items={sortingOptions} selectedItem={videosRequestParams.sorting} onSelect={(value) => updateVideosParamsState(value)} />
            {videosRequestParams.sorting === 'top' && (
                <>
                    <FlexDiv width='10px' />
                    <StyledHeading level='h3' marginBottom='0' text="Timespan:" />
                    <FlexDiv width='3px' />
                    <Dropdown items={timeRangeOptions} selectedItem={videosRequestParams.timeframe} onSelect={(value) => updateVideosParamsState(undefined, value)} />
                </>)}
        </SortSelectorWrapper>
    );
};

export default SortSelector;

const SortSelectorWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;