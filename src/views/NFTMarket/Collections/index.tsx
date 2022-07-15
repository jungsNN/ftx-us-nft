import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Text } from '../../../components/Foundation';

const NFTCollectionPage = () => {
    const query = useSearchParams();
    
    return (
        <div>
            <Text>{JSON.stringify(query)}</Text>
        </div>
    )
}

export default NFTCollectionPage;