import "dotenv/config";

export interface IConfig {
  readonly connection: string;
}

export class Config implements IConfig {
  connection: string;
  constructor(overrides?: Partial<IConfig>) {
    this.connection = process.env.SOLANA_RPC_URL ?? "";
    if (overrides?.connection) {
      this.connection = overrides.connection;
    }
    if (!this.connection) {
      throw new Error(`config not set`);
    }
  }
}
