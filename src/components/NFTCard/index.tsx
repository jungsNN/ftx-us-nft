import React from 'react';
import { Link } from 'react-router-dom';
import styled, { useTheme } from "styled-components";
import useMatchBreakpoints from '../../hooks/useMatchBreakpoints';
import { NFTCollectionMetadata } from '../../types/collection';
import { NFT } from '../../types/nft';
import { getId } from '../../utils/utils';
import CircleAvatar from '../CircleAvatar';
import { Text, Card } from '../Foundation';

export interface NFTCardProps {
    nft: NFT;
    collection: NFTCollectionMetadata | undefined,
    onSelect: () => void;
}

const NFTCard: React.FC<NFTCardProps> = ({ nft, collection, onSelect }) => {
    const theme = useTheme();
    const {  isMobile, isTablet } = useMatchBreakpoints()

    const cardWidth = () => {
    
        if (isMobile) {
            return 'calc(100vw - 16px)'// theme.sizes.card.mobile;
        } else if (isTablet) {
            return theme.sizes.card.tablet;
        }
        return theme.sizes.card.default;
    }

    const auctionEndTime = () => {
        if (nft.auction && nft.auction.endTime) {
            const remaining = Date.parse(nft.auction.endTime) - Date.now();
            const  minLeft = remaining / 60 / 1000
            const hrLeft = remaining / 3600 / 1000
            const dayLeft = hrLeft / 24
            return `${dayLeft >= 1 ? `${dayLeft}`.split('.')[0] + "d" : ""}
                    ${dayLeft < 1 && hrLeft >= 1 ? `${hrLeft}`.split('.')[0] + "h" : ""}
                    ${dayLeft < 1 && hrLeft < 1 && minLeft >= 1 ? `${minLeft}`.split('.')[0] + "m" : ""}
                    ${dayLeft < 1 && hrLeft < 1 && minLeft < 1 ? `${remaining / 1000}`.split('.')[0] + "s" : ""} Remaining`
        }
        return "";
    }
    
    return (    
        <CardWrapper>
            <Card 
                key={`${nft.id}-${nft.name}`}
                width={`${cardWidth()}`}
                height={`calc(${cardWidth()} + 60px)`}
                background="transparent"
                boxShadow="none"
                onClick={onSelect} 
            >   <Link to={`/nfts/${getId(nft, {isCollection: false})}`}>
                    <ImgWrapper width={`${cardWidth()}`} height={`${cardWidth()}`}>
                        <img 
                            height="100%" 
                            width="100%" 
                            src={`${nft.imageUrl}`} 
                            alt={nft.name} 
                            style={{objectFit: 'cover'}} 
                        />
                    </ImgWrapper>
                </Link>
                <TitleOverlay>
                    <TextWrapper>
                        <Link to={`/nfts/${getId(nft, {isCollection: false})}`}>
                            <Text className='collection-name' bold style={{maxWidth:`calc(${(cardWidth())} / 1.4)`}}>
                                {nft.name}
                            </Text>
                        </Link>
                        {(collection && typeof collection !== 'undefined') && 
                        <Link to={`/collections/${getId(collection, {isCollection: true})}`}>
                            <CircleAvatar 
                                size={isTablet ? "28px" : "35px" }
                                src={`${collection.collectionDict.avatarImageUrl ?? collection.firstNft.imageUrl}`} 
                                alt={`${collection.collectionDict.name}`} />
                        </Link>}
                    </TextWrapper>
                    <div className="nft-details-box" style={{padding: '0 8px', alignItems: 'center', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', justifyContent: 'space-between'}}>
                        <Text fontSize={isTablet ? "11px" : "12px"} style={{textAlign: 'left',maxWidth: '80px'}}>{nft.offerPrice ? nft.offerPrice + ` ${nft.quoteCurrency}` : ""}</Text>
                        <Text fontSize={isTablet ? "11px" : "12px"} color={theme.colors.textHighlight} fontWeight="600">{auctionEndTime()}</Text>
                        <Text fontSize={isTablet ? "11px" : "12px"} style={{width: '100%', textAlign: 'right'}}>{
                            nft.auction?.bestBid 
                                ? `Last Bid ${nft.auction.bestBid} ${nft.quoteCurrency}` 
                                : nft.auctionReservationPrice
                                    ? `Reserve Price ${nft.auctionReservationPrice} ${nft.quoteCurrency}`
                                    : ''}</Text>
                    </div>
                </TitleOverlay>
            </Card>
        </CardWrapper>
    )}

const CardWrapper = styled.div`
        margin: 16px 0;
       
        @media(min-width: 1200px) {
            margin: 32px 16px;
        }
`;

const TextWrapper = styled.div`
    display: flex;
    grid-template-columns: auto auto auto;
    grid-gap: 16px;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0 8px;
    
    .collection-name {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    > * {
        text-decoration: none;
    }


`;

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
`;

const TitleOverlay = styled.div`
    padding: 8px 0;
    text-align: center;
    background: #111722;
    z-index: 0;
    box-shadow: -2px 2px 4px rgb(25 137 137 / 20%), 2px -2px 4px rgb(155 227 227 / 20%), -2px -2px 4px #00171cad, 2px 2px 5px #00171cad, inset 1px 1px 2px #00171cad, inset -1px -1px 2px rgb(29 30 30 / 47%);

    .nft-details-box {
        > * {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
`;

export default NFTCard;
