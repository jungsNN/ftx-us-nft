import React, { useEffect } from 'react';
import styled, { useTheme } from "styled-components";
import useMatchBreakpoints from '../../hooks/useMatchBreakpoints';
import { NFTCollectionMetadata } from '../../types/collection';
import { displayVolume, getId } from '../../utils/utils';
import CircleAvatar from '../CircleAvatar';
import { Card, Text, Wrapper } from '../Foundation';

interface NFTCollectionCardProps {
    collection: NFTCollectionMetadata;
    onSelect?: () => void;
}

const NFTCollectionCard: React.FC<NFTCollectionCardProps> = (
    props
 ) => {
    const theme = useTheme();
    const { isMobile, isTablet } = useMatchBreakpoints();
    const { collection, onSelect } = props;
    const collectionDict = collection.collectionDict;

    const cardWidth = () => {
    
        if (isMobile) {
            return theme.sizes.card.mobile;
        }
        else if (isTablet) {
            return theme.sizes.card.tablet;
        }
        return theme.sizes.card.small;
    }

    return (
        <CardWrapper>
            <Card 
                key={getId(collection, {isCollection: true})}
                width={`${cardWidth()}`}
                height={`${cardWidth()}`}
                onClick={onSelect} 
            >   
                <ImgWrapper height={`${cardWidth()}`} width={`${cardWidth()}`}>
                    <img height="100%" width="100%" src={`${collectionDict.cardImageUrl}`} alt={collectionDict.name} style={{objectFit: 'cover'}} />
                </ImgWrapper>
                <AvatarWrapper>
                    <CircleAvatar src={`${collectionDict.avatarImageUrl}`} alt={collectionDict.name + ' avatar'} />
                </AvatarWrapper>
                <TitleOverlay onClick={onSelect}>
                        <ContentWrapper align="start" justify="center" items="center">
                            <TextWrapper>
                                <Text 
                                    className='collection-name' 
                                    bold 
                                    fontSize={isTablet ? '12px' : '14px'}
                                    style={{
                                        textOverflow: 'ellipses', 
                                        whiteSpace: 'normal', 
                                        wordBreak: 'break-word',
                                        maxHeight: isTablet ? '40px' : '80px'
                                        }} >
                                    {collectionDict.name}
                                </Text>
                                <div className="collection-title-box" style={{display: 'block'}}>
                                    <div style={{display: 'inline-flex', alignItems: 'center'}}>
                                        <Text fontSize={isTablet ? '11px' : '12px'} className='collection-volume'>
                                            {`${collection.total} NFTs`}
                                        </Text>
                                        <div className="collection-title-divider"style={{margin: '0 8px', height: '100%', border: '1px solid white'}} />
                                        <Text fontSize={isTablet ? '11px' : '12px' } className='collection-volume'>
                                            {`Volumn ${displayVolume(collection.volume)}`}
                                        </Text>  
                                    </div>
                                </div>
                        </TextWrapper>
                        </ContentWrapper>
                    </TitleOverlay>
                {/* <Link to={`/collections/${getId(collection, {isCollection: true})}`} style={{textDecoration: 'none'}}>
                    
                </Link> */}
            </Card>
        </CardWrapper>
    )
}

const CardWrapper = styled.div`
    position: relative;
    margin: 16px 8px;
`;
const ContentWrapper = styled(Wrapper)`
    grid-gap: ${props => `${props.theme.spacing[2]}px`};
    overflow: hidden;
  
`;

const TextWrapper = styled.div`
    display: grid;
    grid-auto-flow: row;
    align-items: center;
    padding: 0 5px;
    
    .collection-name {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .token-abbr {
      text-align: center;
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
`;

const TitleOverlay = styled.div`
    padding: 8px 0;
    text-align: center;
    background: #222832a3;
    position: absolute;
    top: 59%;
    left: 10%;
    right: 10%;
    z-index: 0;
    cursor: pointer;
    transition: all ease-in-out 0.15s;

    &:hover {
        background: #222832c4;
        transition: all ease-in-out 0.3s;
    }
`;

const AvatarWrapper = styled.div`
    position: absolute;
    top: 42%;
    left: 40%;
    z-index: 1;
`;

export default NFTCollectionCard;