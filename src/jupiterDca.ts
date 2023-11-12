import { DCA, Network, type CreateDCAParamsV2 } from "@jup-ag/dca-sdk";
import { Connection, PublicKey } from "@solana/web3.js";
import { Config } from "./config";
import Base58 from "bs58";

// export const SECONDS_IN_MINUTE = 60; // 1 minute
// export const SECONDS_IN_DAY = 86400; // 1 day
// export const MINUTES_IN_A_WEEK = 10080;
// export const MINUTES_IN_A_DAY = 1440;

export const SECONDS_IN_A_HOUR = 3600;
export const HOURS_IN_A_WEEK = 168;

async function jupiterDcaInstructions({
  squadsVault,
  inputMint,
  outputMint,
  inAmount,
}: {
  squadsVault: PublicKey;
  inputMint: PublicKey;
  outputMint: PublicKey;
  inAmount: bigint;
}): Promise<void> {
  // TODO: These should be injected in
  const config = new Config();
  const connection = new Connection(config.connection);
  const dca = new DCA(connection, Network.MAINNET);
  const inAmountPerCycle = BigInt(inAmount) / BigInt(HOURS_IN_A_WEEK);
  const cycleSecondsApart = BigInt(SECONDS_IN_A_HOUR);
  console.log(
    `expected to swap ${inAmountPerCycle.toString()} every ${cycleSecondsApart} seconds until a total of ${inAmount.toString()} is swapped`
  );
  const params: CreateDCAParamsV2 = {
    payer: squadsVault,
    user: squadsVault,
    inAmount,
    inAmountPerCycle,
    cycleSecondsApart,
    inputMint,
    outputMint,
    minOutAmountPerCycle: null,
    maxOutAmountPerCycle: null,
    startAt: BigInt(Math.floor(new Date().getTime() / 1000)),
  };

  const { tx, dcaPubKey } = await dca.createDcaV2(params);
  console.log("dcaPubKey: ", dcaPubKey.toString());
  const instructions = tx.instructions;
  console.log("instructions:");
  instructions.forEach((ix, i) => {
    console.log(`instruction ${i}:`);
    console.log(`\tprogramId: ${ix.programId}`);
    console.log(`\tkeys:`);
    ix.keys.forEach((key) => {
      console.log(`\t\tisSigner: ${key.isSigner}`);
      console.log(`\t\tisWritable: ${key.isWritable}`);
      console.log(`\t\pubkey: ${key.pubkey.toString()}`);
    });
    console.log(`\tdata: ${Base58.encode(ix.data).toString()}`);
  });
}

export async function handleJup(args: string[]) {
  const [command, ...commandArgs] = args;
  console.log(`handling ${command}`);
  switch (command) {
    case "proposeDca":
      const squadsVault = new PublicKey(commandArgs[0]);
      const inputMint = new PublicKey(commandArgs[1]);
      const outputMint = new PublicKey(commandArgs[2]);
      const inAmount = BigInt(commandArgs[3]);
      await jupiterDcaInstructions({
        squadsVault,
        inputMint,
        outputMint,
        inAmount,
      });
      break;
    default:
      throw new Error(`Invalid command: ${command}`);
  }
}
