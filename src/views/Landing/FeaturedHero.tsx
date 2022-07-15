import React from 'react';
import styled, { useTheme } from 'styled-components';
import { Card, Hero, Row, Text, Wrapper } from '../../components/Foundation';
import Title from '../../components/Foundation/Title';
import useMatchBreakpoints from '../../hooks/useMatchBreakpoints';
import { typography } from '../../style/typography';
import { NFTCollectionMetadata } from '../../types/collection';


const FeaturedHero = ({collection}: {collection?: NFTCollectionMetadata}) => {
    const { isMobile, isTablet } = useMatchBreakpoints();
    const theme = useTheme();
    const boxHeight = '500px';

    const featuredImg = () => {
        return (
            <Card>
                <ImgWrapper width="450px" height="450px">
                    <img src={`${collection!.collectionDict.cardImageUrl}`} alt={`${collection!.collectionDict.name}`} />
                </ImgWrapper>
            </Card>
        )
    }

    const descriptions = () => {
        const collectionDict = collection!.collectionDict;
        return (
            <Wrapper gap="16px" padding="8px 16px">
                <Text
                    fontWeight="600" 
                    fontSize="34px"
                >
                    {collectionDict.name}
                </Text>
                <Wrapper by="col" gap="16px" justify="space-between">
                    <Wrapper items="center">
                        <Text bold fontSize="34px" >{`NFTs`}</Text>
                        <Text fontSize="34px" >{`${collection!.total}`}</Text>
                    </Wrapper>
                    <Wrapper items="center">
                        <Text bold fontSize="34px" >{`Volume`}</Text>
                        <Text fontSize="34px" >{`$${Math.round(collection!.volume)}`}</Text>
                    </Wrapper>
                </Wrapper>
            </Wrapper>
        )
    }

    return collection ? (
        <Wrapper gap="32px">
            <Text bold 
                fontSize={typography.h1Regular.fontSize} 
                color={theme.colors.textHighlight}
                style={{marginLeft: '8px', marginTop: '32px'}}
            >
                Featured Collections
            </Text>
            <Hero height={boxHeight}>
                {isMobile ||isTablet 
                    ? (
                        <Wrapper justify="center" gap="8px">
                            {featuredImg()}
                            {descriptions()}
                        </Wrapper>
                    )
                    : (
                        <Wrapper by="col" justify="space-between" >
                            {descriptions()}
                            {featuredImg()}
                        </Wrapper>
                    )}
            </Hero>
        </Wrapper>
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

export default FeaturedHero;