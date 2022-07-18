import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import CircleAvatar from '../../../components/CircleAvatar';
import { Button, Card, Page, Text, Wrapper } from '../../../components/Foundation';
import useMatchBreakpoints from '../../../hooks/useMatchBreakpoints';
import useStore from '../../../state/store';
import { typography } from '../../../style/typography';
import { NFTCollectionMetadata } from '../../../types/collection';
import { NFT } from '../../../types/nft';
import { getId } from '../../../utils/utils';

const DetailColumn = ({nft, collection, isDesktop}: {
    nft: NFT;
    collection?: NFTCollectionMetadata | null;
    isDesktop: boolean
}) => {
    const collectionAvatar = () => collection     
        ? <CircleAvatar 
            src={`${collection.collectionDict.avatarImageUrl}`} 
            alt={nft.collection} 
            size="40px"
            />
        : <div style={{width: '40px', height: '40px'}} />
    const collectionTitle = () => collection
        ?   <Link to={`/collections/${getId(collection, {isCollection: true})}`}>
                <Text fontWeight="600">{nft.collection}</Text>
            </Link>
        : <div>
            <Text fontWeight="600">{nft.collection}</Text>
        </div>
    const buttonStyle = typography.buttonBold;
    return (
        <Card background="transparent" boxShadow="none">
            <Wrapper gap="32px" padding="16px">
                <Wrapper by="col" gap="16px" justify="start" align="center">
                    {collectionAvatar()}
                    <Wrapper>
                        <Text fontSize={typography.label.fontSize}>Collection</Text>
                        {collectionTitle()}
                    </Wrapper>
                </Wrapper>
            {/* PRice and buy now */}
            <Wrapper by="col" align="center" justify="space-between" gap={isDesktop ? "32px" : "8px"}>
                <Wrapper>
                    <Wrapper>
                        <Text fontSize={typography.label.fontSize}>Offer Amount</Text>
                        <Text fontWeight="600" fontSize="28px">
                            {nft.offerPrice + ` ${nft.quoteCurrency}`}
                        </Text>
                    </Wrapper>
                    {nft.auctionReservationPrice && 
                        <Wrapper>
                            <Text fontSize={typography.label.fontSize}>Offer Amount</Text>
                            <Text>
                                {nft.auctionReservationPrice ? nft.auctionReservationPrice : ""}
                            </Text>
                        </Wrapper>
                    }
                </Wrapper>
                <Button variant="outlined">
                    <Text fontSize={buttonStyle.fontSize} fontWeight={buttonStyle.fontWeight}>Buy Now</Text>
                </Button>
            </Wrapper>
        </Wrapper>
    </Card>
    )
}

const NftProfile = () => {
    const store = useStore();
    const { isMobile, isDesktop } = useMatchBreakpoints();
    const [collection, setCollection] = useState<NFTCollectionMetadata | null>()
    const [nft, setNFT] = useState<NFT>();

    useEffect(() => {
        if (typeof window !== "undefined") {
            const pathname = window.location.pathname;
            const nftId = pathname.split('/')[pathname.split('/').length - 1]
            
            const filteredNft = store.nfts.find(n => `${n.id}` === nftId.split('-')[1])
            if (filteredNft && typeof filteredNft !== "undefined") {
                setNFT(filteredNft)

                const filtered = store.collections.find((c) => `${c.firstNft.collection}`.toLowerCase() === filteredNft.collection.toLowerCase());
                setCollection(filtered)
            }
        }   
    }, [store.nfts, store.collections])

    return nft ? (
        <Page>
            <Wrapper gap="16px" >
                <Text bold 
                    fontSize={typography.h1Regular.fontSize} 
                    style={{marginLeft: '16px', marginTop: '32px'}}
                >
                    {nft.name}
                </Text>
                <Wrapper by={isMobile ? "row" : "col"} justify="start">
                    <Card height="100%" width="100%" background="transparent" boxShadow="none">
                        <ImgWrapper width={isMobile ? "100%" : "calc(100vw / 1.5)"} height="100%">
                            <img src={`${nft.imageUrl}`} alt={`${nft.name}`} />
                        </ImgWrapper>
                    </Card>
                    <DetailColumn nft={nft} collection={collection} isDesktop={isDesktop} />
                </Wrapper>
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