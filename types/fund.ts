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
}
