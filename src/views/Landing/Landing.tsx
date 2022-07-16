
import React, { FC, useCallback, useMemo } from 'react';
import styled, { useTheme } from 'styled-components';
import { Page, Spacer, Text, Wrapper } from '../../components/Foundation';
import Button from '../../components/Foundation/Button';
import { useNavigate } from 'react-router-dom';
import useStore from '../../state/store';
import NFTCard from '../../components/NFTCard';
import { NFT } from '../../types/nft';
import { getId } from '../../utils/utils';
import { GridView, NFTCollectionCard } from '../../components';
import Title from '../../components/Foundation/Title';
import FeaturedHero from './FeaturedHero';

const Landing: FC = () => {
    const theme = useTheme();
    const store = useStore();
    const navigate = useNavigate();
    const previewCollections = useMemo(() => store.collections.slice(0, 9), [store.collections])
    const previewNfts = useMemo(() => store.nfts.slice(0, 9), [store.nfts])
    
    const handleNavigate = (pageName: string, id?: string) => { 
        navigate(`/${pageName}${id ? '/' + id : ''}`, {replace: false})
    }

    const filterCollectionByNFT = useCallback((nft: NFT) => {
        if (store.collections.length === 0) return undefined;
           
        return store.collections.filter(c => c?.collectionDict?.name === nft.collection)[0]
    }, [store.collections.length])

    const getFeaturedCollections = () => {
        const featured =  store.collections.filter(c => c.collectionDict.featured === true);
        console.log('featured', featured)
        return featured
    }

    return (
        <Page>
            {store.collections.length > 0 && <FeaturedHero collection={getFeaturedCollections()[0]}/>}
            <Spacer h={theme.spacing[5]} />
            <TitleWrapper>
                <Title>
                    Collections
                </Title>
            </TitleWrapper>
            <Wrapper justify="center" items="center" gap={`${theme.spacing[4]}px`}>
                {previewCollections.length > 0 
                    ?  <CollectionsPreview>
                            {Object.values(previewCollections).map(c => (
                                <NFTCollectionCard 
                                    key={getId(c, {isCollection: true})} 
                                    collection={c} onSelect={() => 
                                        handleNavigate('collections', `${c.collectionDict.id}`)}/>
                            ))}
                    </CollectionsPreview>
                    : store.errors.collectionError
                        ? <Text>{store.errors.collectionError}</Text>
                        : <Text>Loading...</Text>
                }
                <Spacer h={theme.spacing[3]} />
                <Button variant="outlined" onClick={() => handleNavigate('collections')}>
                    <Text color={theme.colors.textHighlight}>
                        View All Collections
                    </Text>
                </Button>
            </Wrapper>
            <Spacer h={theme.spacing[6]} />
            <TitleWrapper>
                <Title>
                    Trending NFTs
                </Title>
            </TitleWrapper>
            <Wrapper justify="center" items="center" gap={`${theme.spacing[4]}px`}>
                {previewNfts.length > 0 
                    ? (
                        <TrendingNfts>
                            {Object.values(previewNfts).map(nft => (
                                <NFTCard 
                                    key={getId(nft, {})} 
                                    collection={filterCollectionByNFT(nft)} 
                                    nft={nft} 
                                    onSelect={() => handleNavigate('nfts', getId(nft, {}))}
                                />
                            ))}
                        </TrendingNfts>
                    )
                    : store.errors.nftError
                        ? <Text>{store.errors.collectionError}</Text>
                        : <Text>Loading...</Text>
                }
                <Spacer h={theme.spacing[3]} />
                <Button variant="outlined"  onClick={() => handleNavigate('nfts')}>
                    <Text color={theme.colors.textHighlight}>
                        View All NFTs
                    </Text>
                </Button>
                <Spacer h={theme.spacing[6]} />
            </Wrapper>
        </Page>
    );
}

const TrendingNfts = styled(GridView)`
`;

const CollectionsPreview = styled(GridView)`
`;

const TitleWrapper = styled.div`
    padding: 32px;
    text-align: left;
    width: 100%;

    @media(min-width: 639px) {
        max-width: 1400px;
    }
`;
export default Landing;