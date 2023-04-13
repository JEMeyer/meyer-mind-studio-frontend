import React from 'react';
import FlexDiv from '../atoms/flexDiv';
import { FacebookIcon, FacebookShareButton, RedditIcon, RedditShareButton, TelegramIcon, TelegramShareButton, TwitterIcon, TwitterShareButton, WhatsappIcon, WhatsappShareButton, } from 'react-share';
import styled from 'styled-components';
import ClipboardCopy from './clipboardCopy';

interface ShareLinksProps {
    file: string;
    includeSocials?: boolean;
}
const ShareLinks: React.FC<ShareLinksProps> = ({ file, includeSocials = true }) => {
    const iconProps = { size: 32, round: true };
    return (
        <ShareLinksWrapper width='100%' justifyContent='flex-end'>
            <FlexDiv alignItems='center'>
                <ShareInstructions>{'Click the share icon to copy link:'}</ShareInstructions>
                <ClipboardCopy text={file} />
                {includeSocials && <>
                    <TwitterShareButton url={file}>
                        <TwitterIcon  {...iconProps} />
                    </TwitterShareButton>
                    <FacebookShareButton url={file}>
                        <FacebookIcon {...iconProps} />
                    </FacebookShareButton>
                    <WhatsappShareButton url={file}>
                        <WhatsappIcon {...iconProps} />
                    </WhatsappShareButton>
                    <RedditShareButton url={file}>
                        <RedditIcon {...iconProps} />
                    </RedditShareButton >
                    <TelegramShareButton url={file}>
                        <TelegramIcon {...iconProps} />
                    </TelegramShareButton>
                </>}
            </FlexDiv>
        </ShareLinksWrapper>
    )
}

export default ShareLinks;

const ShareLinksWrapper = styled(FlexDiv)`
    margin-bottom: 5px
`

const ShareInstructions = styled.span`
    margin-bottom: 4px;
`;