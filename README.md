# Bonk Drop

Bonk Drop is a project built in support of dogs utilizing the Solana meme token $BONK. 50% of $BONK "dropped" is burned and 50% is sent to a specified treasury wallet to be donated.

## Tech Stack

- Rust / Anchor
- Next.js
- Tailwind CSS
- Daisy UI

## Requirements

### Solana Program

- You'll need to anchor build and anchor deploy the solana program on devnet/mainnet to get the program ID
- Make sure you update and redeploy with the new program ID and update anchor.toml
- in Tests bonk-drop.ts

Replace tokenMint with your own spl token, using a devnet token here works if you have your anchor.toml file set to devnet

```
const tokenMint = new PublicKey(
  "Your devnet our mainnet token ID here"
  );
```

Also update the treasury address here to the address you would like 50% of tokens to be sent to

```
  const treasuryAddress = await getAssociatedTokenAddress(
    tokenMint,
    new PublicKey("Your treasury wallet address here")
  );
```

- Next uncomment out initialize treasury and run anchor run test, you only need to run once to initialize everything.
- You can then try running the tests for creating an account (only initialize one per wallet) and for dropping bonk(input amount manually)!

### Frontend

- Rename `.env.example` to `.env` and add all relevant variables including a `free giphy api key`
  `yarn install`
  `yarn run dev`

### Conclusions

- If you are looking at this repo and are trying to learn / need help, feel free to reach out!
