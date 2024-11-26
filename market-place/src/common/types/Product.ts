export interface ProductImageVariant {
  formats: {
    avif?: {
      resolutions: {
        "1x": { url: string };
        "2x": { url: string };
      };
    };
    jpg?: {
      resolutions: {
        "1x": { url: string };
        "2x": { url: string };
      };
    };
    webp?: {
      resolutions: {
        "1x": { url: string };
        "2x": { url: string };
      };
    };
  };
  width: number;
  height: number;
}

export interface ProductImage {
  id: number;
  versionNumber: number;
  meta: {
    tags: string[];
  };
  variants: {
    [key: string]: ProductImageVariant;
  };
}

export interface Category {
  id: string;
  name: string;
}

export interface SaleCondition {
  code: string;
  packagingSize: string;
}

export interface SaleConditions {
  OR: SaleCondition[];
}

export interface PriceDetail {
  value: number;
  formattedValue: string;
}

export interface Prices {
  salesPrice: PriceDetail;
  recommendedRetailPrice: PriceDetail;
  savings: PriceDetail;
  savingsPercentageFormatted: string;
}

export interface Product {
  code: string;
  name: string;
  supplier: string;
  dosageForm: string;
  rating: number;
  reviewCount: number;
  packagingSize: string;
  defaultSaleCondition: string;
  baseprice: string;
  url: string;
  available: boolean;
  stock: number;
  categories: Category[];
  saleConditions: SaleConditions;
  prices: Prices;
  images: ProductImage[];
}
