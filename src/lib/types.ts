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
};

export type Software = {
  id: string;
  name: string;
  imageUrl: string;
  priceINR: number;
  description: string;
};

export type Reward = {
    id: string;
    title: string;
    cost: number;
    icon: React.ComponentType<{ className?: string }>;
};

export type BannerDeal = {
  id: string;
  gameTitle: string;
  imageUrl: string;
  tagline: string;
  link: string;
};
