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

export const displayVolume = (volume: number) => {
    if (volume / 10**6 >=1) {
        return `$${Math.round(volume / 10**6)}m`
    } else if (volume / 10**3 >=1) {
        return `$${Math.round(volume / 10**3)}k`
    } 
    return `$${Math.round(volume)}`
}

export const commafy = (num: number | string) => {
    const amount = `${num}`.split('.')
    if (amount[0].length >= 5) {
        amount[0] = amount[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,')
    }
    if (amount[1] && amount[1].length >= 5) {
        amount[1] = amount[1].replace(/(\d{3})/g, '$1 ')
    }
    return amount.join('.');
}