import * as anchor from "@project-serum/anchor";
import { BN, Program } from "@project-serum/anchor";
import { BonkDrop } from "../target/types/bonk_drop";
import { PublicKey, Transaction, Keypair } from "@solana/web3.js";
import {
  getOrCreateAssociatedTokenAccount,
  getAssociatedTokenAddress,
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  createAssociatedTokenAccount,
  burn,
} from "@solana/spl-token";
import { findProgramAddressSync } from "@project-serum/anchor/dist/cjs/utils/pubkey";

describe("bonk-drop", async () => {
  // Configure the client to use the local cluster.

  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace.BonkDrop as Program<BonkDrop>;
  const authority = provider.wallet.publicKey;
  const tokenMint = new PublicKey(
    "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263"
  );
  // const devnetTokenMint = new PublicKey(
  //   "8JR9axZDuZcUHRoLxbrVgju7EJYwKjDfMLDxqrYCmnKL"
  // );

  const [treasury, treasuryBump] = await findProgramAddressSync(
    [Buffer.from("treasury_config")],
    program.programId
  );
  const [dropAccount, dropBump] = await findProgramAddressSync(
    [authority.toBuffer(), Buffer.from("user")],
    program.programId
  );
  const treasuryAddress = await getAssociatedTokenAddress(
    tokenMint,
    new PublicKey("BoNkLayXFhzKh8qDz7ux4BGC7jfUxA8HZ4ieCwtHenSU")
  );
  const userTokenAccount = await getAssociatedTokenAddress(
    tokenMint,
    provider.wallet.publicKey
  );

  it("initalize treasury", async () => {
    // Only Initialize Once
    // const tx = await program.methods
    //   .initTreasury()
    //   .accounts({
    //     treasury: treasury,
    //     authority: authority,
    //     treasuryAddress: treasuryAddress,
    //     systemProgram: anchor.web3.SystemProgram.programId,
    //     tokenProgram: TOKEN_PROGRAM_ID,
    //     associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
    //     rent: anchor.web3.SYSVAR_RENT_PUBKEY,
    //   })
    //   .rpc();
    // console.log("treasury initialized: ", tx);
  });

  it("Create Drop Account", async () => {
    // Only Initialize Once
    // const tx = await program.methods
    //   .createAccount()
    //   .accounts({
    //     treasury: treasury,
    //     dropAccount: dropAccount,
    //     authority: authority,
    //     systemProgram: anchor.web3.SystemProgram.programId,
    //   })
    //   .rpc();
    // console.log("account initialized: ", tx);
  });

  it("drop bonk", async () => {
    // Bonk it
    // try {
    //   const tx = await program.methods
    //     .dropBonk(new BN(1000))
    //     .accounts({
    //       treasury: treasury,
    //       treasuryAddress: treasuryAddress,
    //       authority: authority,
    //       userTokenAccount: userTokenAccount,
    //       dropAccount: dropAccount,
    //       tokenMint: devnetTokenMint,
    //       systemProgram: anchor.web3.SystemProgram.programId,
    //       tokenProgram: TOKEN_PROGRAM_ID,
    //       associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
    //       rent: anchor.web3.SYSVAR_RENT_PUBKEY,
    //     })
    //     .rpc();
    //   console.log("bonk dropped: ", tx);
    // } catch (e) {
    //   console.log("error: ", e);
    // }
  });
});
