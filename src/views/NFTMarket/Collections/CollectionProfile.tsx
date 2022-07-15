import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { 
    FaDiscord  as DiscordIcon,
    FaTwitter as TwitterIcon,
 } from 'react-icons/fa';
import { GridView, NFTCard } from '../../../components';
import { Card, Page, Text, Wrapper } from '../../../components/Foundation';
import useMatchBreakpoints from '../../../hooks/useMatchBreakpoints';
import useStore from '../../../state/store';
import { typography } from '../../../style/typography';
import { NFTCollectionMetadata } from '../../../types/collection';
import { getId } from '../../../utils/utils';
import CircleAvatar from '../../../components/CircleAvatar';

const CollectionProfile = () => {
    const store = useStore();
    const navigate = useNavigate();
    const { isMobile } = useMatchBreakpoints();
    const [collection, setCollection] = useState<NFTCollectionMetadata>();
    const [nftsLoaded, setLoaded] = useState(false)

    useEffect(() => {
        if (typeof window !== "undefined") {
            const pathname = window.location.pathname;
            console.log('path', pathname)
            const collectionId = pathname.split('/')[pathname.split('/').length - 1]

            console.log('collection id', collectionId)
            const filteredCollection = store.collections.find(c => `${c.collectionDict.id}` === collectionId)
            if (filteredCollection && typeof filteredCollection !== "undefined") {
                setCollection(filteredCollection)
            }
        }   
    }, [store.collections])

    const getCollectionNfts = useCallback(() => {
        if (collection) {
            const filtered = store.nfts.filter(nft => nft.collection.toLowerCase() === collection!.collectionDict.name.toLowerCase());
            console.log('filtered nfts', filtered)
            setLoaded(true)
            return [...filtered]
        }
        return []
    }, [store.nfts, collection])
    
    const nfts = useMemo(() => store.nfts.length > 0 &&  getCollectionNfts(), [store.nfts.length, getCollectionNfts])

    const handleNavigate = ( id?: string) => { 
        navigate(`/nfts/${id ? id : ''}`, {replace: false})
    }

    return collection ? (
        <Page>
            <Wrapper gap="32px" padding="64px 0" items="center">
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr auto', justifyContent: 'space-between', width: '100%'}}>
                    <div />
                    <TitleOverlay>
                        <Wrapper by="col" align="center" justify="start" gap="16px">
                            <CircleAvatar src={`${collection.collectionDict.avatarImageUrl}`} alt={`collection-avatar ${collection.collectionDict.avatarImageId ?? ''}`} />
                            <Text bold 
                                fontSize={typography.h1Regular.fontSize} 
                                style={{height: '100%', marginLeft: '8px', marginTop: '32px', textAlign: 'center'}}
                            >
                                {collection.collectionDict.name}
                            </Text>
                        </Wrapper>
                    </TitleOverlay>
                    <TitleOverlay>
                        <SocialIcons by="col" gap="32px" pr="24px">
                            <IconWrapper>
                                <DiscordIcon />
                            </IconWrapper>
                            <IconWrapper>
                                <TwitterIcon />
                            </IconWrapper>
                        </SocialIcons>
                </TitleOverlay>
                </div>
                <Card height="100%" width="100%" background="transparent" boxShadow="none">
                    <ImgWrapper width="100%" height="100%">
                        <img src={`${collection!.collectionDict.bannerImageUrl}`} alt={`${collection!.collectionDict.bannerImageId}`} />
                    </ImgWrapper>
                </Card>
                <div style={{display: 'flex', width: '100%', justifyContent: 'center'}}>
                    <Card width={isMobile ? "calc(100vw - 32px)" : "calc(100vw / 2)"} >
                        <Wrapper by="col" gap="16px" padding="8px" justify="space-around">
                            <Wrapper items="center">
                                <Text bold fontSize="30px" >{`NFTs`}</Text>
                                <Text fontSize="30px" >{`${collection!.total}`}</Text>
                            </Wrapper>
                            <Wrapper items="center">
                                <Text bold fontSize="30px" >{`Volume`}</Text>
                                <Text fontSize="30px" >{`$${Math.round(collection!.volume)}`}</Text>
                            </Wrapper>
                        </Wrapper>
                    </Card>
                </div>
            
                <GridView>
                    {nftsLoaded && Object.values(nfts).map(nft => (
                                <NFTCard nft={nft} collection={collection} onSelect={() => handleNavigate(getId(nft, {}))} />
                            ))}
                    {!nftsLoaded && <Text>Loading...</Text>}
                </GridView>
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

const TitleOverlay = styled.div`
    padding: 0 32px;
    text-align: center;
    align-items: center;
    display: grid;
    grid-template-rows: 1fr;
    background: #4d586c8c;
    backdrop-filter: blur(4px);
    z-index: 0;
`;

const SocialIcons = styled(Wrapper)`
    svg {
        width: 25px;
        height: 25px;
    }
`;

const IconWrapper = styled.div`
    padding: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background: ${props => props.theme.colors.buttonSurface};
    box-shadow: ${props => props.theme.shadows.default};
    cursor: pointer;
`;

export default CollectionProfile;