import React from 'react';
import { GridView, NFTCollectionCard } from '../../components';
import { NFTCollectionMetadata } from '../../types/collection';

const CollectionsPreview = ({
    collections,
    onSelectItem,
}:{
    collections: NFTCollectionMetadata[],
    onSelectItem: (pageName: string, id: string) => void;
}) => {
    
    return (
        <GridView>
            {Object.values(collections).map(collection => (
                <NFTCollectionCard 
                    key={`${collection.groupId}-${collection.collectionDict.cardImageId}`} 
                    collection={collection} onSelect={() => 
                        onSelectItem('collections', collection.groupId)}/>
            ))}
        </GridView>
    )
}

export default CollectionsPreview;