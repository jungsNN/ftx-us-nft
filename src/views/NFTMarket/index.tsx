import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { Page, Spacer, Text, Wrapper } from '../../components/Foundation';
import ScrollToTopButton, { ToTopAnchorDiv } from '../../components/ScrollToTopButton';
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
    const bottomRef = useRef<HTMLDivElement>(null)
    const [maxItems, setMaxItems] = useState(DEFAULT_MAX_PER_GRID);
    const [visible, setVisible] = useState(false);

    const handleSelectMaxItems = useCallback((e: string) => {
        setMaxItems(parseInt(e))
    }, [])

    const handleScrollToTop = useCallback((e: any) => {
        if (e?.target?.value === bottomRef.current &&  visible) {
            // console.log('clicked to top.')
            bottomRef!.current!.scrollIntoView({ behavior: 'smooth' })
        }

    }, [visible, bottomRef])

    useEffect(() => {
        if (bottomRef.current) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 100) {
                // console.log('window.scrollY > 100', window.scrollY)
                setVisible(true)
                } else {
                // console.log('to top button off.')
                setVisible(false)
                }});
        window.addEventListener('click', handleScrollToTop)
        }
    }, [bottomRef, setVisible, handleScrollToTop])

   

    return (
        <Page className="nft-explore-page">
            <Spacer h={theme.spacing[6]}/>
            <Wrapper by="col" align="center" padding={isMobile ? '0 16px' : '0 32px'}>
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
                        label="View by"
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
                        : (<ExploreNFTs data={store.nfts} maxItems={maxItems}/>)
                    }
                    <ToTopAnchorDiv  ref={bottomRef}/>
            {visible && <ScrollToTopButton visible={visible}/>}
            </Wrapper>
        </Page>
    )
}

const TitleWrapper = styled.div`
    
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

export default NFTMarket;