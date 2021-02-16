export interface FundProps {
  fundKey: string;
  holdings?: string[];
  asset: any;
  fundToken: any;
  isFinalized: boolean;
  vaultId: number;
  isD2Vault: boolean;
}
