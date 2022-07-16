import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from 'styled-components';
import { GridView, NFTCollectionCard } from '../../../components';
import ScrollToTopButton, { ToTopAnchorDiv } from '../../../components/ScrollToTopButton';
import { Spacer, Text } from '../../../components/Foundation';
import PageButtons from '../../../components/PageButtons';
import { NFTCollectionMetadata } from '../../../types/collection';
import useMatchBreakpoints from '../../../hooks/useMatchBreakpoints';

const ExploreCollections = ({data, maxItems}: {data: NFTCollectionMetadata[], maxItems: number}) => {
    const navigate = useNavigate();
    const { isMobile } = useMatchBreakpoints();
    const theme = useTheme();
    const bottomRef = useRef<HTMLDivElement>(null)
    const [currentPage, setCurrentPage] = useState(1);
    const [visible, setVisible] = useState(false);

    const handleScrollToTop = useCallback((e: any) => {
        if (e?.target?.value === bottomRef.current &&  visible) {
            console.log('clicked to top.')
            bottomRef!.current!.scrollIntoView({ behavior: 'smooth' })
        }

    }, [visible, bottomRef])

    useEffect(() => {
        if (bottomRef.current) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 100) {
                console.log('window.scrollY > 100', window.scrollY)
                setVisible(true)
                } else {
                console.log('to top button off.')
                setVisible(false)
                }});
        window.addEventListener('click', handleScrollToTop)
        }
    }, [bottomRef, setVisible, handleScrollToTop])

   

    const handleOnPage = (pg: number) => {
        setCurrentPage(pg)
    }

    const handleNavigate = (collection: NFTCollectionMetadata) => {
        navigate('/collections/' + `${collection.collectionDict.id}`)
    }

    return (
        <div>
            <Text>{`Showing ${data.length} items`}</Text>
            
            {data.length > 0 && <GridView>
                {data.slice(maxItems * (currentPage - 1), maxItems * (currentPage - 1) + maxItems)
                    .map(collection => (
                        <div key={collection.collectionDict.id}>
                            <NFTCollectionCard collection={collection} onSelect={() => handleNavigate(collection) } />
                        </div>
                    ))}
            </GridView>}
            <ToTopAnchorDiv  ref={bottomRef}/>
            <Spacer h={theme.spacing[4]} />
            {!isMobile && visible && <ScrollToTopButton visible={visible}/>}
            <PageButtons count={data.length} maxPerPage={maxItems} currentPage={currentPage} onChange={handleOnPage}/>
        </div>
    )
}

export default ExploreCollections;