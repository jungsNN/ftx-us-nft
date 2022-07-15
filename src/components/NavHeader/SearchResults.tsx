import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import styled, { useTheme } from 'styled-components';
import { NFTCollectionMetadata } from '../../types/collection';
import { NFT } from '../../types/nft';
import { getId } from '../../utils/utils';
import CircleAvatar from '../CircleAvatar';
import { Card, Text } from '../Foundation';

interface SearchResultsProps {
    searchResults: {
        nfts: NFT[], 
        collections: NFTCollectionMetadata[]
    },
}
const SearchResults: FC<SearchResultsProps> = ({
    searchResults,

}) => {
    const theme = useTheme();
    
    return (
        <SearchResultWrapper>
            <Card>
                {searchResults.nfts.length > 0 &&
                        (
                            <div style={{padding: '16px 0'}}>
                                <Text bold color={theme.colors.textHighlight} style={{marginLeft: '16px'}}>NFTs</Text>
                                <ul>
                                    <SearchResultsList>
                                        {searchResults.nfts.slice(0, 8).map((nft) => (
                                            <li key={getId(nft, {})}>
                                                <Link to={`/nfts/${getId(nft, {})}`}>
                                                    <Text lineHeight="4em" style={{maxWidth: '160px'}}>{nft.name}</Text>
                                                </Link>
                                            </li>
                                        ))}
                                    </SearchResultsList>
                                </ul>
                            </div>
                        )}
                {searchResults.collections.length > 0 &&
                        (
                            <div >
                                <Text bold color={theme.colors.textHighlight} style={{marginLeft: '16px'}}>Collections</Text>
                                <ul>
                                    <SearchResultsList>
                                        {searchResults.collections.slice(0, 8).map((collection) => (
                                            <li key={getId(collection, {isCollection: true})}>
                                                <Link to={`/nfts/${getId(collection, {isCollection: true})}`} style={{display: 'grid', gridTemplateColumns: '1fr auto', justifyContent: 'space-between'}}>
                                                    <Text lineHeight="4em" style={{maxWidth: '160px'}}>{collection.collectionDict.name}</Text>
                                                    <CircleAvatar src={`${collection.collectionDict.avatarImageUrl}`} alt={collection.collectionDict.name} size="40px"/>
                                                </Link>
                                            </li>
                                        ))}
                                    </SearchResultsList>
                                </ul>
                            </div>
                        )}
            </Card>
        </SearchResultWrapper>
    )
}

const SearchResultWrapper = styled.div`
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    margin-top: 8px;
    max-height: 500px;
    overflow-y: scroll;
    overflow-x: hidden;
    border-radius: ${props => props.theme.radii.default};
    z-index: 80;

    > * li {
        list-style: none;
    }

    > * a {
        text-decoration: none;
    }
`;

const SearchResultsList = styled.div`
    padding: 16px;
    display: grid;
    grid-auto-flow: row;
`;

export default SearchResults;