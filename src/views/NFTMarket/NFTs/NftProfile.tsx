import React, { useEffect, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { Card, Page, Text, Wrapper } from '../../../components/Foundation';
import useMatchBreakpoints from '../../../hooks/useMatchBreakpoints';
import useStore from '../../../state/store';
import { typography } from '../../../style/typography';
import { NFT } from '../../../types/nft';
import { getId } from '../../../utils/utils';

const DetailColumn = ({nft, isMobile}: {
    nft: NFT,
    isMobile: boolean
}) => {
    return isMobile ? (
        <Wrapper >

        </Wrapper>
    ) : (
        <Wrapper by="col" >
            <Wrapper>
                
            </Wrapper>
        </Wrapper>
    )
}

const NftProfile = () => {
    const store = useStore();
    const theme = useTheme();
    const { isMobile, isTablet } = useMatchBreakpoints();
    const [nft, setNFT] = useState<NFT>();

    useEffect(() => {
        if (typeof window !== "undefined") {
            const pathname = window.location.pathname;
            console.log('path', pathname)
            const nftId = pathname.split('/')[pathname.split('/').length - 1]

            console.log('nft id', nftId)
            const filteredNft = store.nfts.find(n => getId(n, {}) === nftId)
            if (filteredNft && typeof filteredNft !== "undefined") {
                setNFT(filteredNft)
            }
        }   
    }, [store.nfts])

    return nft ? (
        <Page>
            <Wrapper gap="32px">
                <Text bold 
                    fontSize={typography.h1Regular.fontSize} 
                    style={{marginLeft: '8px', marginTop: '32px'}}
                >
                    {nft.name}
                </Text>
                <Card height="100%" width="100%" background="transparent">
                    <ImgWrapper width="calc(100vw / 1.5)" height="100%">
                        <img src={`${nft.imageUrl}`} alt={`${nft.name}`} />
                    </ImgWrapper>
                </Card>

                <DetailColumn nft={nft} isMobile={isMobile || isTablet} />
            </Wrapper>
        </Page>
    ) : (<></>)
}

const ImgWrapper = styled.div<{
    width: string;
    height: string;
}>` 
    width: 100%;
    height: 100%;
    min-width: ${({width}) => width};
    max-width:  ${({width}) => width};
    min-height: ${({height}) => height};
    max-height: ${({height}) => height};
    overflow: hidden;
    display: grid;
    border-radius: 4px;
    cursor: pointer;

    img {
        object-fit: contain;
        width: 100%;
        height: 100%;
    }
`;


export default NftProfile;