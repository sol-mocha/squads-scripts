import { PublicKey } from "@solana/web3.js";
import { handleJup } from "./jupiterDca";

async function main() {
  const [, , command, ...args] = process.argv;
  console.log(`handling ${command}`);
  switch (command) {
    case "jup":
      await handleJup(args);
      break;
    default:
      throw new Error(`Invalid command: ${command}`);
  }
}

(async () => {
  try {
    await main();
  } catch (e) {
    console.log((e as any).stack);
    console.error(`failed with ${e}`);
  }
})();
