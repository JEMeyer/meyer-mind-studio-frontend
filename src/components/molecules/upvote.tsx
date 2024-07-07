import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import FlexDiv from "../atoms/flexDiv";
import { toast } from "react-toastify";
import { useApi } from "../../services/backend";
import { ContentType, Item } from "../../hooks/useFetchContent";
import { useGetCredentials } from "../../hooks/useAuth";
import { css, keyframes, styled } from "styled-components";

interface UpvoteProps {
  item: Item;
  contentType: ContentType;
}

const Upvote: React.FC<UpvoteProps> = ({ item, contentType }) => {
  const [updating, setUpdating] = useState(false);
  const api = useApi();
  const credentials = useGetCredentials();
  const [currentVote, setCurrentVote] = useState(item.user_vote || 0);

  function checkAllowed() {
    if (!credentials) {
      toast.warn("Must be logged in to vote.");
    }

    return !!credentials;
  }

  const handleVote = async (vote: number) => {
    try {
      setUpdating(true);
      setCurrentVote(vote);
      await api.put(
        "/vote",
        { idValue: item.id, idType: contentType, value: vote },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setUpdating(false);
    } catch (error) {
      // Update the toast to error
      toast.error("Error when casting vote!");
      setUpdating(false);
    }
  };

  const vote = async (e: React.MouseEvent, nextVote: number) => {
    e.stopPropagation();

    if (updating || !checkAllowed()) {
      return;
    }

    if (currentVote === nextVote) {
      // undo current vote
      await handleVote(0);
    } else {
      // add new vote
      if (nextVote === 1) {
        await handleVote(1);
      } else {
        await handleVote(-1);
      }
    }
  };

  const voteCount =
    Number(item.total_votes || 0) + currentVote - Number(item.user_vote || 0);

  return (
    <FlexDiv justifyContent="flex-start">
      <FlexDiv flexDirection="column">
        <UpvoteIcon
          icon={faArrowUp}
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => vote(e, 1)}
          color={currentVote === 1 ? "red" : "black"}
          clicked={currentVote === 1}
        />
        <UpvoteIcon
          icon={faArrowDown}
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => vote(e, -1)}
          color={currentVote === -1 ? "red" : "black"}
          clicked={currentVote === -1}
        />
      </FlexDiv>
      <FlexDiv width="8px" />
      <VoteCount changed={currentVote !== null}>{voteCount}</VoteCount>
    </FlexDiv>
  );
};

export default Upvote;

const clickAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.5); }
  100% { transform: scale(1); }
`;

const UpvoteIcon = styled(FontAwesomeIcon)<{ clicked: boolean }>`
  cursor: pointer;
  transition: color 0.2s, transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }

  ${(props) =>
    props.clicked &&
    css`
      animation: ${clickAnimation} 0.5s;
    `}
`;

const VoteCount = styled.span<{ changed: boolean }>`
  transition: transform 0.2s;

  ${(props) =>
    props.changed &&
    css`
      transform: scale(1.2);
    `}
`;
