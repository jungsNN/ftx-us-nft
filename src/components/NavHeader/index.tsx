import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styled, { useTheme } from 'styled-components';
import { CgMenuRightAlt as MenuIcon } from 'react-icons/cg';
import useMatchBreakpoints from '../../hooks/useMatchBreakpoints';
import { Card, Text } from '../Foundation';
import SearchBar from '../SearchBar';
import { LogoWhite } from '../svgs';
import { NFTCollectionMetadata } from '../../types/collection';
import { NFT } from '../../types/nft';
import useStore from '../../state/store';
import { getId } from '../../utils/utils';
import CircleAvatar from '../CircleAvatar';

type SearchResults = {
    nfts: NFT[];
    collections: NFTCollectionMetadata[];
}
const NavHeader = () => {
    const store = useStore();
    const theme = useTheme();
    const searchbarRef = useRef(null);
    const { isMobile } = useMatchBreakpoints();
    const [searchKey, setSearchKey] = useState('')
    const [searchResults, setSearchResults] = useState<SearchResults>({
        nfts: [],
        collections: []
    })
    const [showResults, setShowResults] = useState(false)
    
    const changeHandler = useCallback((input: string) => {
        setSearchKey(input)
      }, [])

    const filterData = useCallback(() => {
    if (searchKey) {
        const lowercaseQuery = searchKey.toLowerCase();
        const _nfts = store.nfts.filter(nft => {
            const hasCollection = nft.collection.includes(lowercaseQuery)
            const hasName = nft.name.includes(lowercaseQuery)
            const hasAddress = nft.ethContractAddress 
                ? nft.ethContractAddress.includes(lowercaseQuery)
                : nft.solMintAddress
                    ? nft.solMintAddress.includes(lowercaseQuery)
                    : false

            if (hasCollection || hasName || hasAddress) {
                        return nft
                    }
        })

        const _collections: NFTCollectionMetadata[] = store.collections.filter(c => {
            const hasName = c.collectionDict.name?.includes(lowercaseQuery)
            const hasIssuer = c.issuer?.issuer?.includes(lowercaseQuery)

            if (hasName || hasIssuer) {
                        return c
                    }
        })

        setSearchResults({
            nfts: _nfts,
            collections: _collections
        })
        
    } else {
        setSearchResults({
            nfts: [],
            collections: []
        })
    }
    }, [searchKey, store.nfts, store.collections])

    useEffect(() => {
        filterData()
    }, [filterData])

    useEffect(() => {
        setShowResults(searchResults.nfts.length > 0 || searchResults.collections.length > 0)
    }, [searchResults.nfts.length, searchResults.collections.length])

    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event: any) {
            // @ts-ignore
            if (searchbarRef?.current && !searchbarRef.current.contains(event.target)) {
                setShowResults(false)
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside)
        };
    }, [searchbarRef?.current])

      
    return (
        <HeaderWrapper>
            <LogoWrapper to="/" width={isMobile ? '35px' : '50px'}>
                <LogoWhite />
            </LogoWrapper>
            <div ref={searchbarRef} style={{minWidth: '200px', position: 'relative'}}>
                <SearchBar changeHandler={changeHandler}/>
                { 
                    (searchResults.nfts.length > 0 ||
                    searchResults.collections.length > 0 )
                        && showResults
                        ? (<SearchResultWrapper>
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
                        </SearchResultWrapper>)
                        : (<></>)
                }
                
            </div>
            {
                isMobile 
                    ? (
                        <NavButtons>
                            <MenuIcon />
                        </NavButtons>
                    )
                    : (
                        <NavButtons>
                            <Link className="menu-item" to="/collections">
                                <Text fontWeight="600">Collections</Text>
                            </Link>
                            <Link className="menu-item" to="/nfts">
                                <Text fontWeight="600">NFTs</Text>
                            </Link>
                        </NavButtons>
                    )
            }
            
        </HeaderWrapper>
    )
}

const HeaderWrapper = styled.div`
    width: 100vw;
    height: 80px;
    display: grid;
    grid-auto-flow: column;
    align-items: center;

`;

const LogoWrapper = styled(Link)<{width: string}>`
    padding: 16px;
    display: grid;
    grid-auto-flow: column;
    justify-content: start;
    svg {
        height: ${props => props.width};
        width: 100%;
        text-align: left;
    }
`;

const NavButtons = styled.div`
    display: grid;
    grid-auto-flow: column;
    align-items: center;
    justify-content: space-evenly;

    .menu-item {
        text-decoration: none; 
    }

    svg {
        width: 25px;
        height: 25px;
    }
`;

const SearchResultWrapper = styled.div`
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    margin-top: 8px;
    max-height: 500px;
    overflow-y: scroll;
    overflow-x: hidden;
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


export default NavHeader;