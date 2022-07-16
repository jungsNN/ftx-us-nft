import React, { useCallback, useEffect, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import CircleAvatar from '../../../components/CircleAvatar';
import { Card, Page, Text, Wrapper } from '../../../components/Foundation';
import useMatchBreakpoints from '../../../hooks/useMatchBreakpoints';
import useStore from '../../../state/store';
import { typography } from '../../../style/typography';
import { NFTCollectionMetadata } from '../../../types/collection';
import { NFT } from '../../../types/nft';

const DetailColumn = ({nft, collection, isMobile}: {
    nft: NFT;
    collection?: NFTCollectionMetadata | null;
    isMobile: boolean
}) => {
    
    return isMobile ? (
        <Wrapper >
            <Card>
                <Wrapper by="col" justify="space-between" items="center">
                    {collection && 
                        <CircleAvatar 
                            src={`${collection.collectionDict.avatarImageUrl}`} 
                            alt={collection.collectionDict.name} 
                            />}
                    {!collection && <div style={{width: '60px', height: '60px'}} />}
                    <Wrapper>
                        <Text fontSize={typography.label.fontSize}>Collection</Text>
                        <Text fontWeight="600">{collection ? collection.collectionDict.name : ""}</Text>
                    </Wrapper>
                </Wrapper>
            </Card>
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
    const [loaded, setLoaded] = useState(false);
    const [collection, setCollection] = useState<NFTCollectionMetadata | null>()
    const [nft, setNFT] = useState<NFT>();

    useEffect(() => {
        if (typeof window !== "undefined") {
            const pathname = window.location.pathname;
            const nftId = pathname.split('/')[pathname.split('/').length - 1]
    
            const filteredNft = store.nfts.find(n => `${n.id}` === nftId.split('-')[1])
            if (filteredNft && typeof filteredNft !== "undefined") {
                setNFT(filteredNft)
            }
        }   
    }, [store.nfts, ])
    
    const getNftCollection = useCallback(() => {
        if (nft) {
            const filtered = store.collections.find((c) => `${c.collectionDict.name}`.toLowerCase() === nft.name.toLowerCase());
            // setCollection(filtered ?? null)
            // setLoaded(true)
            return filtered
        }
        return null
    }, [store.collections, nft])

    // useEffect(() => {
    //     getNftCollection()
    //     // setCollection(c.length > 0 ? c[0] : null)
            
    // }, [getNftCollection])

    return nft ? (
        <Page>
            <Wrapper gap="32px">
                <Text bold 
                    fontSize={typography.h1Regular.fontSize} 
                    style={{marginLeft: '8px', marginTop: '32px'}}
                >
                    {nft.name}
                </Text>
                <Card height="100%" width="100%" background="transparent" boxShadow="none">
                    <ImgWrapper width={isMobile ? "100%" : "calc(100vw / 1.5)"} height="100%">
                        <img src={`${nft.imageUrl}`} alt={`${nft.name}`} />
                    </ImgWrapper>
                </Card>

                <DetailColumn nft={nft} collection={getNftCollection()} isMobile={isMobile || isTablet} />
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