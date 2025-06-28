export type PriceHistoryPoint = {
  date: string;
  priceINR: number;
};

export type OtherStoreDeal = {
  storeName: string;
  storeLogoUrl: string;
  priceINR: number;
  dealLink: string;
  isKeyshop?: boolean;
};

export type Deal = {
  id: string;
  gameTitle: string;
  boxArtUrl: string;
  description: string;
  discount: number;
  priceINR: number;
  storeLogoUrl: string;
  storeName: string;
  isKeyshop: boolean;
  votes: number;
  comments: number;
  isHistoricLow?: boolean;
  category?: string;
  keyshopRiskLevel?: number;
  otherStores?: OtherStoreDeal[];
  priceHistory?: PriceHistoryPoint[];
  popularity?: number;
  releaseDate?: string;
  rank?: number;
};

export type Software = {
  id: string;
  name: string;
  imageUrl: string;
  priceINR: number;
  description: string;
};

export type BannerDeal = {
  id: string;
  gameTitle: string;
  imageUrl: string;
  tagline: string;
  link: string;
};
