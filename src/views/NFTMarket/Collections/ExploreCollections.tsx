import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GridView, NFTCollectionCard } from '../../../components';
import PageButtons from '../../../components/PageButtons';
import { NFTCollectionMetadata } from '../../../types/collection';

const DEFAULT_MAX_PER_GRID = 50;
const ExploreCollections = ({data}: {data: NFTCollectionMetadata[]}) => {
    const navigate = useNavigate();
    const [maxItems, setMaxItems] = useState(DEFAULT_MAX_PER_GRID);
    const [currentPage, setCurrentPage] = useState(1);

    const handleOnPage = (pg: number) => {
        setCurrentPage(pg)
    }

    const handleNavigate = (collection: NFTCollectionMetadata) => {
        navigate('/collections/' + `${collection.collectionDict.id}`)
    }

    return (
        <div>
            <GridView>
                {data.slice(maxItems * (currentPage - 1), maxItems * (currentPage - 1) + maxItems)
                    .map(collection => (
                        <div key={collection.collectionDict.name + collection.issuer.id}>
                            <NFTCollectionCard collection={collection} onSelect={() => handleNavigate(collection) } />
                        </div>
                    ))}
            </GridView>

            <PageButtons count={data.length} maxPerPage={maxItems} currentPage={currentPage} onChange={handleOnPage}/>
        </div>
    )
}

export default ExploreCollections;