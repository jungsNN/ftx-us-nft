import { NFT } from "./nft";

export type NFTIssuer = {
    id: number;
    time: string;
    status: string;
    issuer: string;
    isVerified: boolean;
    mintSource: string;
    createdAt: number;
  };
  
export type NFTCollectionDict = {
    id: number;
    name: string;
    twitterUrl: string | null;
    discordUrl: string | null;
    homepageUrl: string | null;
    description: string | null;
    createdAt: number;
    bannerImageUrl: string | null;
    bannerImageId: number | null;
    avatarImageUrl: string | null;
    avatarImageId: number | null;
    cardImageUrl: string | null;
    cardImageId: number | null;
    featured: boolean;
  };

export type NFTCollectionMetadata = {
    collectionDict: NFTCollectionDict;
    firstNft: NFT;
    groupId: string;
    groupType: string;
    issuer: NFTIssuer;
    total: number;
    volume: number;
}