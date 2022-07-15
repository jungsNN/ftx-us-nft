import { NFTCollectionMetadata } from "../types/collection";
import { NFT } from "../types/nft";

export const getId = (data: NFT | NFTCollectionMetadata | undefined, { isCollection = false }: {isCollection?: boolean | null}) => {
    if (!data || typeof data === "undefined") return '';
    if (isCollection === true) {
        const collection = data as NFTCollectionMetadata;
        return `${collection.collectionDict.id}`
    }
    const nft = data as NFT;
    return `${Date.parse(new Date(`${nft.created_at}`).toString())}-${nft.id}`
}