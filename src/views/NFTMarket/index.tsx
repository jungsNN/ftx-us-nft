import React, { FC } from 'react';
import styled from 'styled-components';
import { Page, Wrapper } from '../../components/Foundation';
import Title from '../../components/Foundation/Title';
import useMatchBreakpoints from '../../hooks/useMatchBreakpoints';
import useStore from '../../state/store';
import ExploreCollections from './Collections/ExploreCollections';
import ExploreNFTs from './NFTs/ExploreNFTs';

interface NFTMarketProps {
    isCollection?: boolean
}

const NFTMarket: FC<NFTMarketProps> = (props) => {
    const { isCollection } = props;
    const store = useStore();
    const { isMobile } = useMatchBreakpoints()

    return (
        <Page className="nft-explore-page">
            <TitleWrapper>
                <Title>
                    {`Explore ${isCollection ? "Collections" : "NFTs"}`}
                </Title>
            </TitleWrapper>
            <Wrapper 
                className="explore-grid-cards" 
                padding={isMobile ? '32px 0' : '64px 0'}
                gap={isMobile ? "32px" : "64px"}
                items="center"
                >
                {isCollection 
                        ? (<ExploreCollections data={store.collections} />)
                        : (<ExploreNFTs data={store.nfts}/>)
                    }
            </Wrapper>
        </Page>
    )
}

const TitleWrapper = styled.div`
    padding-top: 64px;
    padding-left: 32px;
    text-align: left;
    width: 100%;

    > * {
        font-weight: 600;
        font-size: 34px;
    }
`;

export default NFTMarket;