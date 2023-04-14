import React, { useEffect, useState } from 'react';
import StyledHeading from '../atoms/heading';
import useFetchVideos from '../../hooks/useFetchVideos';
import Dropdown from '../atoms/dropdown';
import styled from 'styled-components';
import FlexDiv from '../atoms/flexDiv';

const SortSelector: React.FC = () => {
    const { fetchVideos } = useFetchVideos();
    const [selectedSortingOption, setSelectedSortingOption] = useState('top');
    const [selectedTimeRange, setSelectedTimeRange] = useState('week');

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
    }

    ]

    useEffect(() => {
        fetchVideos(selectedSortingOption, selectedTimeRange);
    }, [fetchVideos, selectedTimeRange, selectedSortingOption]);
    return (
        <SortSelectorWrapper>
            <StyledHeading level='h3' marginBottom='0' text="Sort:" />
            <Dropdown items={sortingOptions} selectedItem={selectedSortingOption} onSelect={(value) => setSelectedSortingOption(value)} />
            {selectedSortingOption === 'top' && (
                <>
                    <FlexDiv width='10px' />
                    <StyledHeading level='h3' marginBottom='0' text="Timespan:" />
                    <Dropdown items={timeRangeOptions} selectedItem={selectedTimeRange} onSelect={(value) => setSelectedTimeRange(value)} />
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