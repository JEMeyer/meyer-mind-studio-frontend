import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareFromSquare } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { toast } from 'react-toastify';

interface ClipboardCopyProps {
    text: string;
}
const ClipboardCopy: React.FC<ClipboardCopyProps> = ({ text }) => {
    const [isCopied, setIsCopied] = useState(false);

    // This is the function we wrote earlier
    async function copyTextToClipboard(text: string) {
        if ('clipboard' in navigator) {
            return await navigator.clipboard.writeText(text);
        } else {
            return document.execCommand('copy', true, text);
        }
    }

    // onClick handler function for the copy button
    const handleCopyClick = () => {
        // Asynchronously call copyTextToClipboard
        copyTextToClipboard(text)
            .then(() => {
                // If successful, update the isCopied state value
                toast('Link copied to clipboard.');
                setIsCopied(true);
                setTimeout(() => {
                    setIsCopied(false);
                }, 1500);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <CopyWrapper>
            <FontAwesomeIcon style={{ fontSize: '1.5rem' }} icon={faShareFromSquare} onClick={handleCopyClick} color={isCopied ? 'blue' : 'black'} />
        </CopyWrapper>);
}

export default ClipboardCopy;

const CopyWrapper = styled.div`
    padding: 3px;
    margin-bottom: 3px;
    display: inline;
`;