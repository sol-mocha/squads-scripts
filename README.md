# squads-scripts

Collection of scripts to propose custom squad transactions.

Example commands:

## Jupiter

```bash
# Propose a JUP DCA (check script to configure granularity and frequency of swaps)
# yarn run ts-node ./src/index.ts "jup" "proposeDca" <squads vault> <input mint> <output mint> <deposit amount>
yarn run ts-node ./src/index.ts "jup" "proposeDca" "8re8KP9hzm2DQ2qze3a4GedsM44ewkxD8rSxmC1bC9pb" "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v" "bSo13r4TkiE4KumL71LsHTPpL2euBYLFx6h9HP3piy1" "100000000"
```
