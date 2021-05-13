export interface Fund {
  holdings?: string[];
  asset: {
    address: string;
    name: string;
    symbol: string;
  };
  fundToken: {
    address: string;
    name: string;
    symbol: string;
    totalSupply: string;
  };
  vaultId: number;
  isFinalized: boolean;
  isD2Vault: boolean;
  isClosed: boolean;
  manager: string;
  meta?: {
    vaultId?: number;
    name?: string;
    imageIcon?: string;
    imageFeature?: string;
    description?: string;
    buyUrl?: string;
    buyOpenseaUrl?: string;
    mintRedeemUrl?: string;
  };
  price: number;
  priceEth: number;
}
