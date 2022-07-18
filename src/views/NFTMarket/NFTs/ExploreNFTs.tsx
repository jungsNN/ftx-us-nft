import React, { useState } from 'react';
import { Text } from '../../../components/Foundation';
import { GridView, NFTCard } from '../../../components';
import PageButtons from '../../../components/PageButtons';
import useStore from '../../../state/store';
import { NFT } from '../../../types/nft';
import { getId } from '../../../utils/utils';

const ExploreNFTs = ({data, maxItems}: {data: NFT[], maxItems: number}) => {
    const collections = useStore.getState().collections;
    const [currentPage, setCurrentPage] = useState(1);

    const handleOnPage = (pg: number) => {
        setCurrentPage(pg)
    }

    return (
        <div>
            <Text style={{marginLeft: '16px'}}>{`Showing ${data.length} items`}</Text>
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
        </div>
    )
}

export default ExploreNFTs;