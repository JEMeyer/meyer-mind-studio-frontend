import React, { useState } from 'react';
import CustomButton from '../atoms/button';

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
        <div>
            <CustomButton onClick={handleCopyClick} small margin="5px 5px 9px 5px">
                <span>{isCopied ? 'Copied!' : 'Copy'}</span>
            </CustomButton>
        </div>
    );
}

export default ClipboardCopy;