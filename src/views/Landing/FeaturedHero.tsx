import React from 'react';
import styled, { useTheme } from 'styled-components';
import { Card, Hero, Text, Wrapper } from '../../components/Foundation';
import useMatchBreakpoints from '../../hooks/useMatchBreakpoints';
import { typography } from '../../style/typography';
import { NFTCollectionMetadata } from '../../types/collection';
import { commafy } from '../../utils/utils';


const FeaturedHero = ({collection}: {collection?: NFTCollectionMetadata}) => {
    const { isMobile, isTablet } = useMatchBreakpoints();
    const theme = useTheme();
    const boxHeight = isMobile || isTablet ? '100%' : '500px';
    const imgSize = isMobile || isTablet ? '100%' : '450px';
    const titleSize = isMobile ? '36px' : '40px';
    const detailSize = isMobile ? '30px' : '34px';

    const featuredImg = () => {
        return (
            <Card background="transparent" boxShadow="none">
                <ImgWrapper width={imgSize} height={imgSize}>
                    <img src={`${collection!.collectionDict.cardImageUrl}`} alt={`${collection!.collectionDict.name}`} />
                </ImgWrapper>
            </Card>
        )
    }

    const descriptions = () => {
        const collectionDict = collection!.collectionDict;
        return (
           
            <Wrapper gap="16px" padding="8px 16px">
                <Wrapper gap="8px">
                    <Text
                        fontWeight="600" 
                        fontSize={titleSize}
                        style={{textAlign: 'center'}}
                    >
                        {collectionDict.name}
                    </Text>
                    <Text>
                        {collectionDict.description}
                    </Text>
                </Wrapper>
                <DetailBox>
                    <DetailWrapper by="col">
                        <Wrapper items="center">
                            <Text bold fontSize={detailSize} >{`NFTs`}</Text>
                            <Text fontSize={detailSize} >{`${collection!.total}`}</Text>
                        </Wrapper>
                        <Wrapper items="center">
                            <Text bold fontSize={detailSize} >{`Volume`}</Text>
                            <Text fontSize={detailSize} >{`$${commafy(`${collection!.volume}`.split('.')[0])}.${`${collection!.volume}`.split('.')[0].slice(0, 2)}`}</Text>
                        </Wrapper>
                    </DetailWrapper>
                </DetailBox>
            </Wrapper>
        )
    }

    return collection ? (
        <Wrapper gap="32px" justify="center" items="center">
            <Text bold 
                fontSize={typography.h1Regular.fontSize} 
                color={theme.colors.textHighlight}
                style={{marginLeft: '8px', letterSpacing: '0.02em', marginTop: '32px', width: '100%', textAlign: isMobile ? 'center': 'left'}}
            >
                Featured Collections
            </Text>
            <Hero height={boxHeight} width={isMobile ? '100vw' : "100%"} backgroundImgUrl={`${collection.collectionDict.bannerImageUrl}`}>
                {isMobile ||isTablet 
                    ? (
                        <Wrapper justify="center" gap="8px" style={{zIndex: 1}}>
                            {featuredImg()}
                            {descriptions()}
                        </Wrapper>
                    )
                    : (
                        <ContentWrapper by="col" style={{zIndex: 1}}>
                            {descriptions()}
                            {featuredImg()}
                        </ContentWrapper>
                    )}
            </Hero>
        </Wrapper>
    ) : (<></>)
}

const ContentWrapper = styled(Wrapper)`
    grid-template-columns: 1fr auto;
    gap: 32px;
    justify-content: space-between;
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

    img {
        object-fit: contain;
        width: 100%;
        height: 100%;
    }
`;

const DetailBox = styled.div`
    background: #2b2e3b70;
    border-radius: ${props => props.theme.radii.small};
    
    @media(min-width: 638px) {
        padding: 16px 32px;
    }
`

const DetailWrapper = styled(Wrapper)`
    justify-content: space-around;
    align-items: center;
    height: 100%;
    width: 100%;
    grid-gap: 16px;
`;

export default FeaturedHero;