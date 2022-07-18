import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from 'styled-components';
import { GridView, NFTCollectionCard } from '../../../components';
import { Spacer, Text } from '../../../components/Foundation';
import PageButtons from '../../../components/PageButtons';
import { NFTCollectionMetadata } from '../../../types/collection';

const ExploreCollections = ({data, maxItems}: {data: NFTCollectionMetadata[], maxItems: number}) => {
    const navigate = useNavigate();
    const theme = useTheme();
    const [currentPage, setCurrentPage] = useState(1);

    const handleOnPage = (pg: number) => {
        setCurrentPage(pg)
    }

    const handleNavigate = (collection: NFTCollectionMetadata) => {
        navigate(`/collections/${collection.collectionDict.id}`)
    }

    return (
        <div>
            <Text  style={{marginLeft: '16px'}}>{`Showing ${data.length} items`}</Text>
            <GridView>
                {data.slice(maxItems * (currentPage - 1), maxItems * (currentPage - 1) + maxItems)
                    .map(collection => (
                        <div key={collection.collectionDict.id}>
                            <NFTCollectionCard collection={collection} onSelect={() => handleNavigate(collection) } />
                        </div>
                    ))}
            </GridView>
            <Spacer h={theme.spacing[4]} />
            <PageButtons count={data.length} maxPerPage={maxItems} currentPage={currentPage} onChange={handleOnPage}/>
        </div>
    )
}

export default ExploreCollections;