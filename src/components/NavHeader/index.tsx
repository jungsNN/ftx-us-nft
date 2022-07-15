import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styled, { useTheme } from 'styled-components';
import { CgMenuRightAlt as MenuIcon } from 'react-icons/cg';
import useMatchBreakpoints from '../../hooks/useMatchBreakpoints';
import { Text } from '../Foundation';
import SearchBar from '../SearchBar';
import { LogoWhite } from '../svgs';
import { NFTCollectionMetadata } from '../../types/collection';
import { NFT } from '../../types/nft';
import useStore from '../../state/store';
import SearchResults from './SearchResults';

type SearchResults = {
    nfts: NFT[];
    collections: NFTCollectionMetadata[];
}
const NavHeader = () => {
    const store = useStore();
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
                        ? (<SearchResults searchResults={searchResults}/>)
                        : (<></>)
                }
                
            </div>
            <div>
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
            </div>
            
        </HeaderWrapper>
    )
}

const HeaderWrapper = styled.div`
    width: 100vw;
    height: 80px;
    display: grid;
    grid-template-columns: auto auto auto;
    align-items: center;
    grid-gap: 16px;
    justify-content: space-between;
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
    justify-content: space-between;
    grid-gap: 64px;
    margin-right: 48px;

    .menu-item {
        text-decoration: none; 
    }

    svg {
        width: 25px;
        height: 25px;
    }

    @media(max-width: 638px) {
        background: transparent;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        margin-right: 16px;
        transition: background ease-in-out 0.2s;

        &:hover {
            background: ${props => props.theme.colors.buttonSurface};
            transition: background ease-in-out 0.2s;
        }

        &:active {
            background: ${props => props.theme.colors.buttonSurface};
            transition: background ease-in-out 0.2s;
        }
    }
`;

export default NavHeader;