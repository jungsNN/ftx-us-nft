import React, { FC, useCallback, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { Page, Spacer, Text, Wrapper } from '../../components/Foundation';
import Title from '../../components/Foundation/Title';
import Select from '../../components/Select';
import useMatchBreakpoints from '../../hooks/useMatchBreakpoints';
import useStore from '../../state/store';
import ExploreCollections from './Collections/ExploreCollections';
import ExploreNFTs from './NFTs/ExploreNFTs';

interface NFTMarketProps {
    isCollection?: boolean
}

const DEFAULT_MAX_PER_GRID = 60;

const NFTMarket: FC<NFTMarketProps> = (props) => {
    const { isCollection } = props;
    const theme = useTheme();
    const store = useStore();
    const { isMobile } = useMatchBreakpoints()
    const [maxItems, setMaxItems] = useState(DEFAULT_MAX_PER_GRID);

    const handleSetMax = (newMax:  number) => {
        setMaxItems(newMax)
    }

    const handleSelectMaxItems = useCallback((e: string) => {
        setMaxItems(parseInt(e))
    }, [])

    return (
        <Page className="nft-explore-page">
            <Spacer h={theme.spacing[6]}/>
            <Wrapper by="col" align="center">
                <TitleWrapper>
                    <div className="collection-explore-title">
                        <Text >
                            {`Explore ${isCollection ? "Collections" : "NFTs"}`}
                        </Text>
                    </div>
                </TitleWrapper>
                <FilterWrapper>
                    <Select 
                        onOption={handleSelectMaxItems} 
                        currentOption={`${maxItems}`} 
                        options={['30', '50', '100']} 
                    />
                </FilterWrapper>
            </Wrapper>
            <Wrapper 
                className="explore-grid-cards" 
                padding={isMobile ? '32px 0' : '64px 0'}
                gap={isMobile ? "32px" : "64px"}
                items="center"
                >
                {isCollection 
                        ? (<ExploreCollections data={store.collections} maxItems={maxItems}/>)
                        : (<ExploreNFTs data={store.nfts}/>)
                    }
            </Wrapper>
        </Page>
    )
}

const TitleWrapper = styled.div`
    padding-left: 32px;
    text-align: left;
    width: 100%;

    .collection-explore-title {
        > * {
            font-weight: 600;
            font-size: 34px;
        }
    }
`;

const FilterWrapper = styled.div``;

const IconWrapper = styled.div`

`;

export default NFTMarket;