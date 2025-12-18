
export interface Block {
  number: number;
  hash: string;
  parentHash: string;
  timestamp: number;
  transactions: string[];
  miner: string;
  size: string;
  gasUsed: string;
  gasLimit: string;
  reward: string;
}

export interface Transaction {
  hash: string;
  blockNumber: number;
  from: string;
  to: string;
  value: string;
  fee: string;
  status: 'Success' | 'Pending' | 'Failed';
  timestamp: number;
  nonce: number;
  gasPrice: string;
  gasLimit: string;
  method: string;
}

export interface Address {
  address: string;
  balance: string;
  tokenValue: string;
  transactions: Transaction[];
  isContract: boolean;
  contractCreator?: string;
  creatorTxHash?: string;
}

export interface NetworkStats {
  marketCap: string;
  price: string;
  tps: number;
  totalTransactions: string;
  lastBlock: number;
  nodeCount: number;
  avgGasPrice: string;
}
