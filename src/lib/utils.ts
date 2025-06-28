import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Deal, OtherStoreDeal } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// A helper type for the return value
export type BestPriceDeal = {
    storeName: string;
    storeLogoUrl: string;
    priceINR: number;
    dealLink: string;
    isKeyshop?: boolean;
};

export const getBestPriceDeal = (deal: Deal, keyshopsEnabled: boolean): BestPriceDeal => {
    const primaryDealInfo = { 
        storeName: deal.storeName, 
        storeLogoUrl: deal.storeLogoUrl, 
        priceINR: deal.priceINR, 
        dealLink: `/games/${deal.id}`,
        isKeyshop: deal.isKeyshop,
    };

    const allAvailableDeals: BestPriceDeal[] = [primaryDealInfo, ...(deal.otherStores || [])];

    const filteredDeals = keyshopsEnabled 
        ? allAvailableDeals 
        : allAvailableDeals.filter(d => !d.isKeyshop);

    if (filteredDeals.length === 0) {
        // This case happens if only keyshop deals exist and the toggle is off.
        // We'll return the primary deal as a fallback.
        return primaryDealInfo;
    }

    const bestDeal = filteredDeals.reduce((best, current) => {
        return current.priceINR < best.priceINR ? current : best;
    }, filteredDeals[0]);
    
    return bestDeal;
};
