import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import FlexDiv from '../atoms/flexDiv';
import { toast } from 'react-toastify';
import { useApi } from '../../services/backend';
import { ContentType, Video } from '../../hooks/useFetchContent';
import { Image } from '../../hooks/useFetchContent';
import { useGetCredentials } from '../../hooks/useCredentials';

interface UpvoteProps {
    item: Video | Image,
    contentType: ContentType
}

const Upvote: React.FC<UpvoteProps> = ({ item, contentType }) => {
    const [updating, setUpdating] = useState(false);
    const api = useApi();
    const credentials = useGetCredentials();
    const [currentVote, setCurrentVote] = useState(item.user_vote || 0);

    function checkAllowed() {
        if (!credentials) {
            toast.warn('Must be logged in to vote.');
        }

        return !!credentials;
    }

    const handleVote = async (vote: number) => {
        try {
            setUpdating(true);
            await api.put('/vote', { idValue: item.id, idType: contentType, value: vote }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setCurrentVote(vote);
            setUpdating(false);
        } catch (error) {
            // Update the toast to error
            toast.error('Error when casting vote!');
            setUpdating(false);
        }
    };

    const vote = async (nextVote: number) => {

        if (updating || !checkAllowed()) {
            return;
        }

        if (currentVote === nextVote) {
            // undo current vote
            await handleVote(0)
        } else {
            // add new vote
            if (nextVote === 1) {
                await handleVote(1);
            } else {
                await handleVote(-1)
            }
        }
    }

    const voteCount = Number(item.total_votes || 0) + currentVote - Number(item.user_vote || 0);

    return (
        <FlexDiv justifyContent='flex-start'>
            <FlexDiv flexDirection='column'>
                <FontAwesomeIcon icon={faArrowUp} onClick={() => vote(1)} color={currentVote === 1 ? 'red' : 'black'}/>
                <FontAwesomeIcon icon={faArrowDown} onClick={() =>vote(-1)} color={currentVote === -1 ? 'red' : 'black'}/>
            </FlexDiv>
            <FlexDiv width='8px' />
            <span>{voteCount}</span>

        </FlexDiv>
    );
}

export default Upvote;
