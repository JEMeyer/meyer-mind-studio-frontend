import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import FlexDiv from '../atoms/flexDiv';
import { toast } from 'react-toastify';
import { useApi } from '../../services/backend';
import { Video } from '../../hooks/useFetchVideos';
import { useGetCredentials } from '../../hooks/useCredentials';

interface UpvoteProps {
    video: Video
}

const Upvote: React.FC<UpvoteProps> = ({ video }) => {
    const [updating, setUpdating] = useState(false);
    const api = useApi();
    const credentials = useGetCredentials();
    const [currentVote, setCurrentVote] = useState(video.user_vote || 0);

    function checkAllowed() {
        if (!credentials) {
            toast.error('Must be logged in to vote.');
        }

        return !!credentials;
    }

    const handleVote = async (vote: number) => {
        try {
            setUpdating(true);
            await api.put('/vote', { videoId: video.id, value: vote }, {
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

    const voteCount = Number(video.total_votes)  + currentVote - Number(video.user_vote);

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