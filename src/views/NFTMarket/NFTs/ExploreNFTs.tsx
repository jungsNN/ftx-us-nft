import React, { useState } from 'react';
import { GridView, NFTCard } from '../../../components';
import PageButtons from '../../../components/PageButtons';
import useStore from '../../../state/store';
import { NFT } from '../../../types/nft';
import { getId } from '../../../utils/utils';

const DEFAULT_MAX_PER_GRID = 60;
const ExploreNFTs = ({data}: {data: NFT[]}) => {
    const collections = useStore.getState().collections;
    const [maxItems, setMaxItems] = useState(DEFAULT_MAX_PER_GRID);
    const [currentPage, setCurrentPage] = useState(1);

    const handleOnPage = (pg: number) => {
        setCurrentPage(pg)
    }

    return (
        <>
            <GridView>
                {data.slice(maxItems * (currentPage - 1), maxItems * (currentPage - 1) + maxItems)
                    .map(nft => (
                        <div key={getId(nft, {})}>
                            <NFTCard nft={nft} collection={collections.filter(c => c?.collectionDict?.name === nft.collection)[0]} onSelect={function (): void {
                                throw new Error('Function not implemented.')
                            } } />
                        </div>
                    ))}
            </GridView>
            <PageButtons count={data.length} maxPerPage={maxItems} currentPage={currentPage} onChange={handleOnPage}/>
        </>
    )
}

export default ExploreNFTs;