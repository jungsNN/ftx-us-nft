import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { NFTS_FILTERED_ENDPOINT, NFT_COLLECTIONS_ENDPOINT } from './configs/constants';
import useStore from './state/store';
import { NFTCollectionDict, NFTCollectionMetadata } from './types/collection';
import { NFT } from './types/nft';
import Landing from './views/Landing/Landing';
import NFTMarket from './views/NFTMarket';
import CollectionProfile from './views/NFTMarket/Collections/CollectionProfile';
import NftProfile from './views/NFTMarket/NFTs/NftProfile';

function App() {
  const store = useStore();
  
  const fetchNfts = (): Promise<NFT[] | string> => {
    return new Promise((resolve, reject) => {
      fetch(NFTS_FILTERED_ENDPOINT)
        .then((res) => res.json())
        .then((data) => {
          const nftsData: NFT[] = [];

          Object.values(data.result).forEach((nft: any) => {
            nftsData.push({
              id: nft['id'],
              name: nft['name'],
              description: nft['description'],
              issuer: nft['issuer'],
              collection: nft['collection'],
              series: nft['series'],
              solMintAddress:nft['solMintAddress'],
              ethContractAddress: nft['ethContractAddress'],
              imageUrl:nft['imageUrl'],
              videoUrl: nft['videoUrl'],
              animationUrl: nft['animationUrl'],
              thumbnailUrl: nft['thumbnailUrl'],
              attributes: nft['attributes'],
              redeemable: nft['redeemable'],
              redeemed:nft['redeemed'],
              offerPrice: nft['offerPrice'],
              auction: nft['auction'],
              depositMethods: nft['depositMethods'],
              withdrawalMethods: nft['withdrawalMethods'],
              auctionReservationPrice: nft['auctionReservationPrice'],
              owned:nft['hasOwner'],
              bid: nft['bid'],
              buyFee: nft['buyFee'],
              isBestBid: nft['isBestBid'],
              quoteCurrency: nft['quoteCurrency'],
              featured: nft['featured'] ?? false,
              created_at: nft['created_at'],
              hidden: nft['hidden'] ?? false,
            })
          })
          resolve(nftsData)
        })
        .catch((err) => {
            console.error(err)
            reject("Failed to load nfts")})
    }) 
  }

const fetchCollections = (): Promise<NFTCollectionMetadata[] | string> => {
    return new Promise((resolve, reject) => {
        fetch(NFT_COLLECTIONS_ENDPOINT)
            .then((res) => res.json())
            .then((data) => {
              const collectionsMap: Map<string, NFTCollectionMetadata> = new Map();
            
              data.result.collections.forEach((collection: any) => {
                const collectionDetails: NFTCollectionDict = {
                  ...collection.collectionDict
                }
                if (!collectionsMap.has(`${collectionDetails.id}`)) {
                  collectionsMap.set(`${collectionDetails.id}`, {
                      collectionDict: collectionDetails,
                      firstNft: collection['first_nft'],
                      groupId: collection['group_id'],
                      groupType: collection['group_type'],
                      issuer: collection['issuer'],
                      total: collection['total'],
                      volume: collection['volume']
                    } as NFTCollectionMetadata)
                } 
              })
          
              resolve(Array.from(collectionsMap.values()) as NFTCollectionMetadata[])
            })
            .catch((err) =>{
                console.error(err)
                reject("Failed to load collections")})
    }) 
}

useEffect(() => {
    fetchCollections()
        .then((res: NFTCollectionMetadata[] | string) => {
            if (typeof res === 'string') {
                store.setErrors({
                    ...store.errors,
                    collectionError: res
                })
            } else if (res.length > 0) {
                store.setCollections(res)
            }
        })

    return () => {}
     // eslint-disable-next-line react-hooks/exhaustive-deps
}, [])

useEffect(() => {
    fetchNfts()
        .then((res: NFT[] | string) => {
            if (typeof res === 'string') {
                store.setErrors({
                    ...store.errors,
                    collectionError: res
                })
            } else if (res.length > 0) {
                store.setNfts(res)
            }
        })

    return () => {}
     // eslint-disable-next-line react-hooks/exhaustive-deps
}, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />}/>
        <Route path="/collections" element={<NFTMarket isCollection />} />
        <Route path="/collections/:key" element={<CollectionProfile />} />
        <Route path="/nfts" element={<NFTMarket />} />
        <Route path="/nfts/:Key" element={<NftProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
